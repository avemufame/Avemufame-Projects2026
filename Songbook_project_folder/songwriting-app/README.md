# 🎵 Songbook Project

A comprehensive, interactive digital songbook designed for musicians, songwriters, and producers to capture, organize, and record musical ideas in one unified workspace. 

Built with **Vite** and powered by **Mantine UI**, this application utilizes Mantine's `AppShell` component to provide a clean, tidy, and highly responsive multi-panel layout.

---

## 🚀 Tech Stack Highlights

- **Frontend Framework:** Vite + React
- **UI Library:** Mantine UI (v7)
- **Layout Engine:** Mantine `AppShell` for seamless sidebar, header, and multi-panel navigation.

---

## 🛠️ Installation & Mantine Setup

Follow these steps to set up the project locally and configure the Mantine UI ecosystem.

### 1. Clone the repository and install core dependencies
```bash
git clone https://github.com
cd YOUR_REPO_NAME
npm install
```

### 2. Install Mantine packages
Install the core Mantine components, hooks, and style dependencies:
```bash
npm i @mantine/core @mantine/hooks @emotion/react
```

### 3. Add global styles & provider
Ensure your `src/main.jsx` (or `src/main.tsx`) imports the required CSS and wraps your application:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@mantine/core/styles.css'; // Global Mantine styles
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
```

### 4. Run the development server
```bash
npm run dev
```

---

## 📋 Features & Roadmap

### 📝 Core Metadata & Song Settings
- **Song Title:** Custom editable text field for naming tracks.
- **BPM Counter:** Tap tempo button and numeric input to set beats per minute.
- **Time Signature:** Dropdown selector for musical meters (4/4, 3/4, 6/8, etc.).
- **Key Selector:** Dropdown to define the musical key (e.g., G Major, A Minor).

### 📂 File Management & Storage Hierarchy
- **JSON File Structure:** Unified JSON template schema to save text, chords, and metadata together.
- **Folder & Album System:** Virtual folders to group tracks together into Albums or EPs.
- **iCloud / Device Storage Sync:** Native File System APIs to save and load files directly from user folders.
- **Song Export / Import:** Simple download/upload buttons for sharing raw project JSON files.

### 🎵 Audio Recording & Editing Engine
- **Audio Import:** Drag-and-drop zone to load existing guide tracks or backing instrumentals.
- **Voice Recorder:** Built-in microphone recorder to log quick vocal melodies or acoustic ideas.
- **Audio Waveform Display:** Visualized audio files rendered as responsive timelines.
- **Section Markers:** Interactive timeline flags to stamp and name song parts (e.g., Intro, Verse 1, Chorus).

### 📹 Video Recording Tool
- **Video Notes Pad:** Device webcam toggle to film video memos of hand placements and chord shapes.
- **Video Playback Frame:** Embedded player to watch back recorded performance takes right next to the lyrics pad.

### 🎸 Interactive Guitar Tab Builder *(Future Milestone)*
- **Custom Tab Input Grid:** Monospace numeric line editor for typing frets directly onto guitar strings.
- **Interactive Fretboard Clicker:** Visual click-to-add button matrix for plotting chords instantly onto the tab template.

---

📁 Folder Hierarchy Blueprint


📁 LyricFlow_Workspace/          (The Master Workspace Folder)
├── 📄 workspace_manifest.json  (A master index tracking ALL songs, BPMs, and titles)
│
├── 📁 Song_Acoustic_Ballad/    (Isolated Folder for Song #1)
│   ├── 📄 project_data.json    (The JSON file with lyrics, chords, and timestamps)
│   ├── 🎵 voice_memo_1.webm     (Microphone audio recorded for this song)
│   └── 📹 fret_guide.webm       (Video notes filmed for this song)
│
└── 📁 Song_Rock_Anthem/         (Isolated Folder for Song #2)
    ├── 📄 project_data.json    (The JSON file for track #2)
    └── 🎵 drum_loop.mp3         (An imported audio backing track)



## 🏗️ Project Implementation Phases

Development is structured into three distinct priority tracks:

*   **Phase 1 (Current):** Finalize the flexible Layout & Multi-Panel Toggle System using Mantine `AppShell`.
*   **Phase 2 (Data):** Implement Song Title, BPM, Text Saving, and the Local JSON file generator.
*   **Phase 3 (Media):** Integrate audio recording, timeline markers, and video capturing capabilities.
