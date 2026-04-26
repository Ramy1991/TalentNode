# 💼🔍 TalentNode - Modern Job Search Engine

![UI](https://img.shields.io/badge/UI-CLEAN_DESIGN-0284c7?style=for-the-badge)
![Cloudflare](https://img.shields.io/badge/Deployed_on-CLOUDFLARE-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-OPTIMIZED-84cc16?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-APP_ROUTER-black?style=for-the-badge&logo=next.js&logoColor=white)

---

A lightning-fast, highly-optimized job search engine built with **Next.js 15**, **Tailwind CSS**, and **Cloudflare Pages**. It effortlessly aggregates top-tier job postings from multiple free API sources into a sleek, user-friendly interface.

## ✨ Features

- 🚀 **Server-Side Rendering (SSR)**: Perfect SEO metadata generated dynamically for every single job posting.
- 🔗 **Multiple API Aggregation**: Automatically merges data from **Arbeitnow** and **Remotive** into one unified data flow.
- 🎨 **Modern UI**: Clean, responsive layout with high usability, inspired by top industry standards.
- ☁️ **Cloudflare Ready**: Perfectly configured to deploy instantly to the Edge via the Cloudflare Pages dashboard.

## 🛠️ Getting Started Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **View the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Environment Variables

This project uses an `.env.example` file to show what variables can be integrated. 

> **Important:** Your `.gitignore` is already configured to ignore all `.env` files (via the `.env*` rule). This means if you create a file named `.env` or `.env.local` to store your private keys locally, it will **not** be uploaded to GitHub.

## 🚀 Deployment to Cloudflare Pages

1. Push this repository to GitHub.
2. Log into your Cloudflare Dashboard and navigate to **Workers & Pages**.
3. Click **Create application** -> **Pages** -> **Connect to Git**.
4. Select your GitHub repository.
5. In the build settings, select **Next.js** as the framework.
6. (Optional) Add your Environment Variables securely in the Cloudflare dashboard.
7. Click **Save and Deploy**.
