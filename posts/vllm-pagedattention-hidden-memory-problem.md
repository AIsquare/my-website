# vLLM and PagedAttention: The Hidden Memory Problem Behind LLM Inference

![vLLM Inference - PagedAttention and Continuous Batching](./vLLM_Inference__PagedAttention_and_Continuous_Batching-2.png)

At first glance, serving an LLM looks simple:

```
Request
   ↓
Model
   ↓
Response
```

Load the model onto a GPU, give it a prompt, generate tokens, and return the answer.

That mental model works perfectly well for one request.

Then the real world arrives.

One user asks for a short answer. Another sends a 10,000-token document. A third is still generating a long response. New requests keep arriving while old ones are running.

Now the problem is no longer simply:

> **How do we run the model?**
> 

It becomes:

> **How do we manage a finite GPU while hundreds or thousands of unpredictable sequences are growing, finishing, and arriving at different times?**
> 

This is where **vLLM** becomes interesting.

Its core story is easier to understand as two problems:

- **Where should each request's growing KV cache live?**
- **Which requests should the GPU work on right now?**

The first leads us to **PagedAttention**. The second leads us to **continuous batching**.

# 1. The model has a memory

During autoregressive generation, a transformer keeps previously computed **Key (K)** and **Value (V)** tensors in the **KV cache**.

Why?

Because when the next token arrives, we do not want to recompute the entire history from scratch.

Conceptually:

```
Prompt
  ↓
Prefill
  ↓
KV cache
  ↓
Token 1
  ↓
Token 2
  ↓
Token 3
  ↓
...
```

A useful approximation for one sequence is:

$$
\mathrm{KV\ bytes}
=
2 \times L \times H_{KV} \times d_{\mathrm{head}} \times S \times B
$$

where:

- (L) = transformer layers
- (H_{KV}) = KV heads
- (d_{head}) = head dimension
- (S) = sequence length
- (B) = bytes per value
- the first (2) represents K and V

For example:

```
L       = 32
H_KV    = 8
d_head  = 128
S       = 8192
B       = 2
```

Then:

$$

2 \times 32 \times 8 \times 128 \times 8192 \times 2
\approx 1.07\ \mathrm{GB}

$$

So an 8K-token sequence can need roughly **1 GB of KV cache** under this configuration.

Now imagine:

```
A → 8K tokens
B → 2K
C → 16K
D → 4K
E → 8K
...
```

The GPU is storing not only model weights, but also the growing memory of many active conversations.

That is the first major inference-serving problem.

# 2. The naïve solution: reserve the maximum

Suppose:

```
maximum sequence length = 512 tokens
block size = 16 tokens
```

Then a maximum-length request needs:

$$
512 / 16 = 32
$$

blocks.

A naïve allocator might say:

> **"I don't know how long this request will become, so reserve 32 blocks now."**
> 

But suppose the request only generates 50 tokens.

It actually needs:

$$

\left\lceil \frac{50}{16} \right\rceil = 4

$$

blocks.

We reserved 32.

Only 4 contain useful KV entries.

That is a huge amount of memory tied up for a request that never used it.

If 1,000 blocks are available:

$$

\frac{1000}{32} \approx 31

$$

Only about 31 maximum-sized reservations fit.

The problem is not that every request actually needs 32 blocks.

The problem is that we reserved memory for a future that may never happen.

# 3. Fine. Allocate dynamically.

The obvious improvement is:

> **"Don't reserve everything. Give a request memory as it grows."**
> 

Better.

But now we face **fragmentation**.

Imagine the GPU memory pool looks like:

```
[A][A][ ][B][ ][C][C][ ][D][ ][ ][E]
```

There may be enough free memory in total, but it is scattered.

If a request needs a contiguous region, finding one becomes harder.

So we ask:

> **Why does a request's KV cache need to be physically contiguous at all?**
> 

It doesn't.

# 4. The key idea: fixed-size KV blocks

Instead of treating the KV cache as one giant allocation:

```
Request A
████████████████████████
```

we divide it into fixed-size blocks:

```
Request A
[A0][A1][A2][A3]
```

For a 16-token block:

```
16 tokens  → 1 block
17 tokens  → 2 blocks
32 tokens  → 2 blocks
33 tokens  → 3 blocks
```

The important part is that those blocks **do not need to be physically adjacent**.

Logically:

```
A → [A0][A1][A2][A3]
```

Physically:

```
GPU memory

[B7][C0][A2][B1][A0][D3][A3][C1][A1]
```

So we need a translation table:

```python
block_table = {
    "A": [4, 8, 2, 6]
}
```

Meaning:

```
logical block 0 → physical block 4
logical block 1 → physical block 8
logical block 2 → physical block 2
logical block 3 → physical block 6
```

This is the basic mental model behind **PagedAttention**.

The analogy to operating-system virtual memory is useful:

```
Virtual memory:
logical page → physical frame

LLM serving:
logical KV block → physical GPU block
```

It is an analogy, not a literal implementation of Linux paging.

# 5. Allocate on demand

This is the part that usually makes PagedAttention click.

Suppose a request starts with 20 tokens.

With 16-token blocks:

$$

\left\lceil \frac{20}{16} \right\rceil = 2

$$

So we allocate:

```
A → [block 7][block 3]
```

Not 32 blocks.

As the sequence grows:

```
16 tokens  → 1 block
17 tokens  → 2 blocks
32 tokens  → 2 blocks
33 tokens  → 3 blocks
49 tokens  → 4 blocks
```

The KV cache grows **block by block**.

A tiny teaching implementation looks like:

```python
class BlockManager:
    def __init__(self, total_blocks=1000, block_size=16):
        self.block_size = block_size
        self.free_blocks = set(range(total_blocks))
        self.block_tables = {}

    def allocate(self, request_id, num_tokens):
        blocks_needed = (
            num_tokens + self.block_size - 1
        ) // self.block_size

        blocks = [
            self.free_blocks.pop()
            for _ in range(blocks_needed)
        ]

        self.block_tables[request_id] = blocks

    def free(self, request_id):
        blocks = self.block_tables.pop(request_id)

        for block in blocks:
            self.free_blocks.add(block)
```

This is not a complete PagedAttention implementation.

It simply exposes the core idea:

```
Request
   ↓
How many blocks are needed?
   ↓
Take free physical blocks
   ↓
Remember the mapping
   ↓
Release them when finished
```

# 6. Now we hit the second problem

Memory is no longer the only challenge.

Imagine eight requests are generating:

```
A
B
C
D
E
F
G
H
```

Their output lengths could be:

```
A → 80
B → 20
C → 8
D → 70
...
```

A static batch might keep all eight together until the longest request finishes:

```
A  ████████████████████████
B  ██████
C  ██
D  █████████████████████
```

C is finished, but the system may still carry its slot until the batch ends.

That is wasted capacity.

# 7. Continuous batching

LLM decoding is iterative.

In the simplest decode model, each active request advances by one token per decode step.

So we can change the batch after every step.

For example:

```
Step 1

A B C D
```

```
Step 2

A B C D
```

C finishes:

```
Step 3

A B D E
```

B finishes:

```
Step 4

A F D E
```

The batch is continuously changing.

That is **continuous batching**.

A good mental model is:

> **The batch is a moving window over the request stream, not a fixed group of requests.**
> 

The real engine is more flexible than the toy model: an engine step can involve prefill as well as decode, and speculative decoding can allow a request to advance by multiple tokens.

# 8. Now the two ideas connect

We can now describe the system with two questions.

### Continuous batching asks:

> **Who should the GPU work on right now?**
> 

### Paged KV management asks:

> **Where does that request's growing KV cache live?**
> 

So the architecture becomes:

```
    Requests
       │
       ▼
  ┌─────────┐
  │Scheduler│
  └────┬────┘
       │
continuous batch
       │
       ▼
 Model Runner
       │
       ▼
Paged KV Cache
       │
       ▼
      GPU
```

The scheduler manages **work**.

The KV-cache manager manages **memory**.

The model executor runs that work on the GPU.

That separation is the heart of the system.

# 9. The engine step

A simplified vLLM loop looks like:

```
request arrives
      ↓
waiting queue
      ↓
scheduler
      ↓
allocate KV blocks
      ↓
forward pass
      ↓
sample
      ↓
postprocess
      ↓
finished?
   ↙       ↘
 yes        no
 ↓           ↓
free blocks  continue
 ↓
new request can enter
```

This gives us an important idea:

> **The scheduler is continuously making resource-allocation decisions.**
> 

It decides what can fit into the next engine step while respecting token budgets and available KV-cache capacity.

# 10. Prefill and decode are different

This distinction is critical in inference engineering.

### Prefill

A new request might contain thousands of prompt tokens.

The model processes the prompt and builds the KV cache.

That is generally **compute-heavy**.

### Decode

After the KV cache exists:

```
existing KV cache
        +
latest token
        ↓
next token
```

The model repeatedly produces new tokens.

Decode is generally much more **memory-bandwidth-sensitive**.

So:

```
PREFILL
lots of prompt tokens
        ↓
large computation

DECODE
few new tokens
        ↓
repeated memory movement
```

This difference later motivates optimizations such as chunked prefill and separate prefill/decode workers.

# 11. Why chunked prefill exists

A very long prompt can monopolize an engine step.

Instead of processing it as one giant operation:

```
████████████████████████████████
```

we can split it:

```
Chunk 1
████████

Chunk 2
████████

Chunk 3
████
```

Now other work gets opportunities to run between chunks.

The principle is the same:

> **Don't let one workload monopolize a shared GPU resource.**
> 

# 12. PagedAttention also enables prefix caching

Suppose two requests share the same long prefix:

```
"You are an expert Python programmer..."
```

Without prefix caching:

```
Request A
  ↓
compute prefix

Request B
  ↓
compute same prefix again
```

With prefix caching:

```
             Shared Prefix
                  │
          ┌───────┴───────┐
          ▼               ▼
       KV blocks       KV blocks
      [P0][P1][P2]    [P0][P1][P2]
          │               │
          ▼               ▼
      Request A        Request B
      [A3][A4]         [B3][B4]
```

The shared KV blocks can be reused.

The important detail is that reuse works at the block level. Complete matching blocks can be reused; an incomplete final block cannot simply be treated as a reusable complete cached prefix.

This shows that the block abstraction is useful for more than fragmentation.

It also makes **memory reuse** natural.

# 13. But how does attention read scattered blocks?

This is the subtle part.

Suppose:

```
Logical:

A0 → A1 → A2 → A3
```

but physically:

```
A0 → block 17
A1 → block 92
A2 → block 31
A3 → block 45
```

Attention still needs to behave as if:

```
[A0][A1][A2][A3]
```

were one continuous KV history.

The block table and attention metadata provide the indexing information needed to locate the physical blocks.

This is why two concepts should be separated:

```
Block manager
    ↓
Where is the KV cache?

PagedAttention kernel
    ↓
How do I efficiently attend over those blocks?
```

PagedAttention is therefore not just a memory allocator.

It is the combination of a **paged KV representation** and attention execution that knows how to consume it.

# 14. Continuous batching without giant padding

Suppose:

```
A: [a1 a2 a3]
B: [b1 b2]
C: [c1 c2 c3 c4]
```

A naïve batch could pad them:

```
A A A PAD
B B PAD PAD
C C C C
```

Those padding positions do no useful work.

Instead, the engine can conceptually flatten the active sequences:

```
[a1 a2 a3 b1 b2 c1 c2 c3 c4]
```

and carry metadata describing positions and sequence boundaries.

The attention machinery then makes sure A attends to A, B to B, and C to C.

This is one of the important systems tricks that makes continuous batching efficient.

# 15. Follow one request through vLLM

Suppose a request arrives:

```
"Explain KV cache."
```

### Request arrives

It is validated and tokenized and placed into the scheduler's waiting queue.

### Scheduler

The scheduler decides when it can run.

### KV allocation

The KV-cache manager determines how many blocks are needed and obtains them from the free block pool.

### Prefill

The prompt is processed and its KV entries are written into the allocated blocks.

### First token

The model samples the first output token.

Now the request enters decode.

### Continuous batching

It joins other active decode requests:

```
A B C D
↓
A B C D E
```

### Decode

The engine repeatedly schedules the work and generates more output tokens.

### KV growth

If the sequence crosses another block boundary, another physical block is allocated.

### Finish

EOS, a length limit, a stop token, or another stop condition ends the request.

### Free

Its KV blocks are returned to the free pool.

Those blocks can now be reused by another request.

That lifecycle is the core of an LLM inference engine.

# 16. From one GPU to a real serving system

Once the engine works, the architecture can scale:

```
Single GPU
    ↓
Multi-GPU
    ↓
Tensor / pipeline parallelism
    ↓
Data-parallel replicas
    ↓
Multi-node serving
    ↓
API servers
    ↓
Load balancing
```

But the central question remains the same:

> **Which work should run now, and where does its state live?**
> 

The surrounding machinery gets more complicated, but the underlying resource-management problem does not change.

# 17. The bigger lesson

Before learning inference systems, it is tempting to think:

```
Model + GPU = generation
```

After understanding vLLM, the picture becomes:

```
                  LLM inference
                       │
          ┌────────────┴────────────┐
          │                         │
      Scheduling                 Memory
          │                         │
          ▼                         ▼
Continuous batching          Paged KV cache
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
                  GPU execution
                       │
                       ▼
                 Tokens / sec
```

And around that core we can add:

```
Prefill
Decode
Prefix caching
Chunked prefill
Speculative decoding
Multi-GPU
Multi-node
Serving
Load balancing
Benchmarking
```

These are not random optimizations.

They are different answers to the same systems problem:

> **A GPU is a finite resource. LLM requests are unpredictable, stateful, and continuously changing. An efficient inference engine has to dynamically manage both the work and the memory.**
> 

# The mental model to keep

Don't memorize the entire vLLM codebase.

Remember:

> **The scheduler manages work.**
> 

> **The KV-cache manager manages memory.**
> 

> **PagedAttention lets attention operate on paged KV memory.**
> 

> **Continuous batching keeps the work queue dynamic.**
> 

And the engine repeatedly performs:

```
Requests
   ↓
WAITING
   ↓
Scheduler
   ↓
Allocate KV blocks
   ↓
Forward pass
   ↓
Sample
   ↓
Postprocess
   ↓
Finished?
  ↙   ↘
Yes    No
 ↓      ↓
Free   Continue
blocks
 ↓
New request can reuse them
```

That is the story.

What initially looks like a collection of complicated inference techniques is really one problem viewed from different angles:

> **How do we turn a finite GPU into a machine that can efficiently serve a constantly changing stream of autoregressive workloads?**
> 

That's what makes **vLLM and PagedAttention** so interesting.

And once that mental model is solid, reading the actual vLLM source code becomes a completely different experience: instead of seeing thousands of unfamiliar classes, you can start asking, **“Is this managing work, managing memory, executing the model, or moving information between those layers?”**