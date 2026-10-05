'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Plus, Activity } from 'lucide-react';

export default function GaltonBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [totalBalls, setTotalBalls] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const isStreamingRef = useRef(true);

  // Keep ref synced
  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  // Simulation state refs
  const stateRef = useRef<{
    bins: number[];
    balls: Array<{
      x: number;
      y: number;
      row: number;
      col: number;
      vx: number;
      vy: number;
      settled: boolean;
    }>;
    totalSettled: number;
    rows: number;
    spacing: number;
    startX: number;
    startY: number;
  }>({
    bins: new Array(11).fill(0),
    balls: [],
    totalSettled: 0,
    rows: 10,
    spacing: 20,
    startX: 140,
    startY: 28,
  });

  const dropBalls = useCallback((count: number) => {
    const { startX, balls } = stateRef.current;
    for (let i = 0; i < count; i++) {
      balls.push({
        x: startX + (Math.random() - 0.5) * 4,
        y: -10 - i * 6,
        row: -1,
        col: 0,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 2.2 + Math.random() * 0.4,
        settled: false,
      });
    }
  }, []);

  const resetBoard = useCallback(() => {
    stateRef.current.bins = new Array(stateRef.current.rows + 1).fill(0);
    stateRef.current.balls = [];
    stateRef.current.totalSettled = 0;
    setTotalBalls(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = 280;
    const height = 210;

    // Retina support
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const rows = 10;
    const spacing = 19;
    const startX = width / 2;
    const startY = 24;
    const pegRadius = 1.8;
    const ballRadius = 2.2;

    stateRef.current.rows = rows;
    stateRef.current.spacing = spacing;
    stateRef.current.startX = startX;
    stateRef.current.startY = startY;

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Funnel / Guide lines at top
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX - 24, 4);
      ctx.lineTo(startX - 8, startY - 8);
      ctx.lineTo(startX - 8, startY);
      ctx.moveTo(startX + 24, 4);
      ctx.lineTo(startX + 8, startY - 8);
      ctx.lineTo(startX + 8, startY);
      ctx.stroke();

      // 2. Draw Pegs
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c <= r; c++) {
          const px = startX + (c - r / 2) * spacing;
          const py = startY + r * spacing;
          ctx.fillStyle = '#94a3b8';
          ctx.beginPath();
          ctx.arc(px, py, pegRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw Bins (Histogram at bottom)
      const binWidth = spacing;
      const binMaxHeight = 58;
      const bottomY = height - 2;
      const currentBins = stateRef.current.bins;
      const maxCount = Math.max(...currentBins, 12);

      currentBins.forEach((count, i) => {
        const bx = startX + (i - rows / 2) * spacing - binWidth / 2;
        const barH = Math.min((count / maxCount) * binMaxHeight, binMaxHeight);

        // Bar fill (indigo gradient)
        ctx.fillStyle = 'rgba(99, 102, 241, 0.45)';
        ctx.fillRect(bx + 1, bottomY - barH, binWidth - 2, barH);

        // Bar border
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(bx + 1, bottomY - barH, binWidth - 2, barH);

        // Bin divider
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(bx, bottomY);
        ctx.lineTo(bx, bottomY - binMaxHeight);
        ctx.stroke();
      });

      // 4. Theoretical Bell Curve overlay
      if (stateRef.current.totalSettled > 15) {
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        for (let i = 0; i <= rows; i++) {
          const bx = startX + (i - rows / 2) * spacing;
          // Binomial probability P(X=i) where n=rows, p=0.5
          const n = rows;
          const k = i;
          // n choose k * 0.5^n
          let coeff = 1;
          for (let x = 1; x <= k; x++) {
            coeff = (coeff * (n - x + 1)) / x;
          }
          const prob = coeff * Math.pow(0.5, n);
          const theoreticalH = prob * binMaxHeight * 3.5;
          const py = bottomY - theoreticalH;
          if (i === 0) ctx.moveTo(bx, py);
          else ctx.lineTo(bx, py);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 5. Automatic Ball Spawner
      tick++;
      if (isStreamingRef.current && tick % 14 === 0 && stateRef.current.balls.length < 80) {
        stateRef.current.balls.push({
          x: startX + (Math.random() - 0.5) * 3,
          y: 0,
          row: -1,
          col: 0,
          vx: 0,
          vy: 2.1,
          settled: false,
        });
      }

      // 6. Update and Draw Active Balls
      ctx.fillStyle = '#4338ca';
      const activeBalls = stateRef.current.balls;

      for (let i = activeBalls.length - 1; i >= 0; i--) {
        const b = activeBalls[i];
        if (b.settled) continue;

        b.y += b.vy;
        b.x += b.vx;

        // Peg row interaction
        const currentRow = Math.floor((b.y - startY + spacing * 0.45) / spacing);
        if (currentRow > b.row && currentRow < rows) {
          b.row = currentRow;
          // Stochastic 50/50 deflection
          const dir = Math.random() >= 0.5 ? 1 : -1;
          b.vx = dir * 1.05;
          b.col += dir * 0.5;

          // Pull slightly toward grid node
          const targetX = startX + b.col * spacing;
          b.x = targetX;
        }

        // Settling into bins
        if (b.row >= rows - 1 || b.y >= bottomY - 10) {
          b.settled = true;
          const rawBin = Math.round(b.col + rows / 2);
          const binIndex = Math.max(0, Math.min(rows, rawBin));
          if (stateRef.current.bins[binIndex] !== undefined) {
            stateRef.current.bins[binIndex]++;
          }
          stateRef.current.totalSettled++;
          setTotalBalls(stateRef.current.totalSettled);
          activeBalls.splice(i, 1);
          continue;
        }

        // Render falling ball
        ctx.beginPath();
        ctx.arc(b.x, b.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full max-w-[310px] bg-white border border-slate-200/90 rounded-lg p-3 shadow-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
          <Activity size={12} className="text-indigo-600 animate-pulse" />
          <span>GALTON QUINCUNX</span>
        </div>
        <span className="text-[10px] text-slate-400">CLT: Binomial(10, 0.5)</span>
      </div>

      {/* Canvas */}
      <div className="flex justify-center bg-slate-50/70 border border-slate-100 rounded py-1">
        <canvas ref={canvasRef} className="block select-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-slate-100 text-[10px] font-mono text-center">
        <div className="bg-slate-50 py-1 px-1.5 rounded border border-slate-100">
          <span className="text-slate-400 block text-[9px]">SAMPLE N</span>
          <span className="font-bold text-slate-800">{totalBalls}</span>
        </div>
        <div className="bg-slate-50 py-1 px-1.5 rounded border border-slate-100">
          <span className="text-slate-400 block text-[9px]">MEAN μ</span>
          <span className="font-bold text-slate-800">0.00</span>
        </div>
        <div className="bg-slate-50 py-1 px-1.5 rounded border border-slate-100">
          <span className="text-slate-400 block text-[9px]">VAR σ²</span>
          <span className="font-bold text-slate-800">2.50</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex items-center justify-between gap-1.5 mt-2 text-[10px] font-mono">
        <button
          onClick={() => dropBalls(15)}
          className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded transition-colors"
          title="Drop 15 stochastic particles"
        >
          <Plus size={11} />
          <span>Drop 15</span>
        </button>

        <button
          onClick={() => setIsStreaming((prev) => !prev)}
          className={`py-1 px-2.5 rounded transition-colors flex items-center gap-1 ${
            isStreaming
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title={isStreaming ? 'Pause stream' : 'Resume stream'}
        >
          {isStreaming ? <Pause size={11} /> : <Play size={11} />}
          <span>{isStreaming ? 'Pause' : 'Stream'}</span>
        </button>

        <button
          onClick={resetBoard}
          className="py-1 px-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded transition-colors"
          title="Reset bins"
        >
          <RotateCcw size={11} />
        </button>
      </div>
    </div>
  );
}
