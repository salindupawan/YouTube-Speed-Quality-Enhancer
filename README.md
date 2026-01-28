# 🎙️ YouTube Speed & Quality Enhancer
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/salindupawan/YouTube-Speed-Quality-Enhancer/releases)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)

![Open Source](https://img.shields.io/badge/Open%20Source-MIT-success)

A **lightweight, high-performance Chrome Extension** designed for **podcast listeners and long-form content consumers**.  

It brings **instant playback speed controls** and **quick-access quality toggles** directly into the YouTube UI --- no more digging through menus.

---

## 🚀 Why This Extension?

If you regularly listen to podcasts or long interviews on YouTube, you already know the frustration of navigating settings just to change playback speed or lower video quality.  

This extension puts those controls **front and center**, optimized for audio-first consumption.

---

## ✨ Key Features

- 🎧 **Podcast Optimized**  

  Instantly jump to **2x** or **2.5x** playback speed

- 📉 **Data Saver**  

  Switch to **144p** with two clicks when you only need audio

- ⚡ **Ultra-Fast Playback**  

  Unlock **2.5x speed**, beyond YouTube's native **2.0x** limit

- 🎨 **Modern Native UI**  

  Designed to blend seamlessly with YouTube's **2026 Roboto design system**

---

## 📂 Project Structure

Organize your local files as follows for the extension to function correctly:

```text
YouTube-Speed-Quality-Enhancer/
├── manifest.json       # Extension configuration & permissions
├── content.js          # Core logic for UI injection & manipulation
├── README.md           # Project documentation
└── icons/              # Branding assets
    ├── icon16.png      # Favicon size
    ├── icon48.png      # Extension management size
    └── icon128.png     # Chrome Web Store size
```
---
## 🛠️ Installation (Developer Mode)

This is an open-source project and can be installed manually in under a minute.

### 1️⃣ Clone the Repository

```
git clone https://github.com/salindupawan/YouTube-Speed-Quality-Enhancer.git
```
Or download the ZIP file and extract it.

### 2️⃣ Add to Chrome
1. Open Google Chrome and navigate to ``` chrome://extensions/ ```

2. Enable "Developer mode" (toggle in the top-right corner).

3. Click the "Load unpacked" button.

4. Select the folder where you cloned/extracted the project files.

---
## 📖 How to Use
- ⚡ Speed Buttons: Click ```1x```, ```2x```, or ```2.5x``` located next to the Subscribe button. The active speed is highlighted with a ``` ⚡ ``` icon.

- ```⋮``` Quality Menu: Click the vertical dots to open the quick-menu

  - Select ```144p``` for background/audio-only listening.

  - Select ```720p``` for standard high definition.

- 🖱️ Smart Dismiss: Simply click anywhere else on the page to close the custom menu automatically.

---
## 🔧 Technical Details

- DOM Injection: Uses a persistent polling method to handle YouTube's Single Page App (SPA) navigation transitions.

- Quality Automation: Employs an async click-simulation path with UI suppression (opacity control) to change resolutions without disrupting the viewer.

- Playback API: Direct manipulation of the ```HTML5``` video.playbackRate API to bypass UI-restricted speed caps.

---
## 🤝 Contributing

Contributions are welcome!

### If you have ideas such as:

- Custom speed presets

- UX improvements

- Performance optimizations

### Feel free to:

1. Fork the repository

2. Create a new branch

3. Submit a pull request 🚀
---

## 📝 License
This project is open-source and available under the MIT License.

---

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://i.ibb.co/qYRDG5TF/thumb.png)

---
Designed for focus. Built for speed.  
Developed by **Salindu Pawan**
