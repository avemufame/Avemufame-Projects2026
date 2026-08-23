# 📁 Creator & Developer Tooling Ecosystem

Welcome to my portfolio workspace! This repository serves as a monorepo showcasing three distinct projects, ranging from production-ready portfolio architectures to advanced creative tools in active development.

---

## 🚀 Repository Directory

### 📂 [1. Advanced Media Portfolio](./01-media-portfolio)
* **What it is:** A feature-rich, high-performance portfolio application built with React and Vite.
* **Key Features:** Fully integrated **React Router** for seamless page navigation, a responsive **Carousel slider**, and an immersive **Lightbox view** for full-screen media inspection.
* **How it works:** Uses `import.meta.glob` to dynamically scan code directories and load static assets instantly at runtime.
* **Best for:** Developers who want a premium, highly interactive media gallery with zero manual data management.

### 📂 [2. Songwriter's Workbench (In Progress)](./02-songwriters-workbench) 🎧
* **What it is:** A specialized layout and utility application designed to help songwriters capture raw creative inspiration before it slips away.
* **Current Status:** Actively polishing the UI components, layout design, and core state management using temporary mock data.
* **The Vision:** A comprehensive digital scratchpad for musicians to:
  * Gather fragments of thoughts and lyric blocks in real-time.
  * Record and attach temporary voice memos and scratch audio.
  * Trim and edit recorded audio snippets natively.
  * Record raw smartphone/webcam videos of embryonic performances to preserve chord fingerings, rhythms, and early-stage melodies.

### 📂 [3. Decoupled JSON Portfolio (Coming Soon)](./03-decoupled-portfolio) 🌟
* **What it is:** A heavily modified architectural variant of Project 1, optimized specifically as a white-label product for non-technical clients.
* **The Strategy:** Rewriting the frontend to drop directory compilation in favour of runtime fetching from a static file. 
* **How it will work:** A local **Node.js automation script** scans the image directory on command and generates a `portfolio.json` file inside the `public/` folder. The live React app simply fetches this JSON file at runtime.
* **The Benefit:** Complete elimination of production build requirements. Clients can update, delete, or swap out their portfolio media via a simple FTP upload or a GitHub Pages push without ever needing to recompile the React code.

---


## 🛠️ Local Development & Setup

Since the Advanced Media Portfolio deployment pipeline is currently being finalized for production on GitHub Pages, you can easily spin up and explore all workspace environments locally.

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (installed automatically with Node)

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd YOUR_REPO_NAME
   ```

2. **Launch the Media Portfolio:**
   ```bash
   cd 01-media-portfolio
   npm install
   npm run dev
   ```

3. **Launch the Songbook Project & LyricFlow Workspace:**
   ```bash
   cd 02-songbook-app  # Replace with your actual folder name
   npm install
   npm run dev
   ```
