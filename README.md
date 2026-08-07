# 📁 Advanced React Portfolio Ecosystem

Welcome to my portfolio project! This repository showcases two distinct architectures for building and managing a dynamic React portfolio application depending on your hosting and client needs.

## 🚀 Repository Directory

### [1. Vite Glob Version](./01-vite-glob-version)
* **What it is:** A standard modern React + Vite application.
* **How it works:** Uses `import.meta.glob` to dynamically scan code directories and load assets at runtime.
* **Best for:** Personal developers who want zero manual JSON management and don't mind a quick rebuild when updating their work.

### [2. JSON & Static FTP Version](./02-json-ftp-version) 🌟 (Client-Ready)
* **What it is:** A zero-rebuild production-ready template designed to be sold to private clients.
* **How it works:** React reads a decoupled static `portfolio.json` file inside the `public/` directory. Includes a local Node.js automation script (`generate-portfolio.js`) to parse asset directories instantly.
* **Best for:** Non-technical clients. Allows them to drag-and-drop new images via FTP or GitHub Pages without touching application code or databases.

---

## 🛠️ How to run locally

To test either version, open your terminal, navigate to the specific folder, and spin up the development server:

```bash
cd 02-json-ftp-version
npm install
npm run dev
```
