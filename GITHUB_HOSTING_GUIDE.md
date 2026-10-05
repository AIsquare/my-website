# GitHub Hosting & Blogging Guide

This guide explains how to host your Next.js portfolio on GitHub and how to manage your technical blog posts.

## 1. Customizing your URL on Vercel

Vercel allows you to change your project's URL to something more personal (e.g., `aamiriqbal.vercel.app`).

### How to change it:
1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click on your project.
3.  Go to **Settings** > **Domains**.
4.  Click **Edit** on the existing `.vercel.app` domain.
5.  Enter your desired name (e.g., `aamiriqbal`) and click **Save**.
6.  *Optional*: If you own a custom domain (like `aamiriqbal.com`), you can add it here as well.

## 2. GitHub Pages vs. Vercel

**Can you use GitHub Pages?** Yes, but it is **not recommended** for Next.js for several reasons:
*   **Vercel** is built specifically for Next.js. It handles image optimization, fast builds, and server-side features automatically.
*   **GitHub Pages** requires you to change your code to "Static Export" mode, which disables many useful Next.js features and requires complex "GitHub Actions" to set up.
*   **Recommendation**: Stick with Vercel. It is free for personal use and much more powerful.

## 3. How to Write Articles

### Where to create the `posts` folder:
Create the `posts` folder in the **root directory** of your project (the same level as `app/` and `components/`).

### How to post:
1.  **Create the folder**: `mkdir posts`
2.  **Add a file**: Create `posts/my-article.md`.
3.  **Update the UI**: Currently, the website displays articles from a list in `components/Writing.tsx`. 
    *   Open `components/Writing.tsx`.
    *   Add your new article's title, date, and excerpt to the `posts` array at the top of the file.
    *   In a future update, we can automate this so it reads the files directly from the `posts/` folder.

---

## 4. Managing Your Profile Image

1.  **Save your image**: Save your photo as `public/profile.jpg`.
2.  **The Code**: The website is currently using a placeholder. To use your photo:
    *   Open `components/Hero.tsx`.
    *   Change `src="https://picsum.photos/..."` to `src="/profile.jpg"`.
