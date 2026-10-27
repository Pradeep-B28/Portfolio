<div align="center">

# 🎭 Master 3D WebGL Portfolio Theme Suite

### *An Immersive Multi-Theme 3D Developer Showcase Ecosystem Built with React, Three.js & Tailwind CSS*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160%2B-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0%2B%20%2F%206.0%2B-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Softech Enterprise](https://img.shields.io/badge/🚀_Softech_Platform-Live_Site-178F7F?style=for-the-badge&logoColor=white)](https://reachsoftech.onrender.com/home)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <a href="https://reachsoftech.onrender.com/home">🚀 Official Softech Website</a> •
  <a href="https://pradeep-b28.github.io/Pradeep-B28/">🌐 Live WebGL Demo App</a> •
  <a href="#-theme-showcase-matrix">Theme Showcase Matrix</a> •
  <a href="#-core-architecture--shared-schema">Architecture</a> •
  <a href="#-launching-themes-locally">Quick Start</a> •
  <a href="#-license--copyright">License & Copyright</a>
</p>

</div>

---

## 🚀 Featured Enterprise Platform: Softech (Founder: Pradeep)

> [!IMPORTANT]
> ### 🌐 Official Softech Platform: **[https://reachsoftech.onrender.com/home](https://reachsoftech.onrender.com/home)**
>
> **Pradeep is the Founder of Softech.**
>
> **Softech** is an enterprise career portal and placement training platform connecting aspiring software engineers with **job opportunities, placement drives, and rigorous industry-aligned training programs** in Java, Data Structures & Algorithms, Full Stack Development, MERN Stack, AWS Cloud Architecture, and Distributed System Design.
>
> Visit **[https://reachsoftech.onrender.com/home](https://reachsoftech.onrender.com/home)** to explore job listings, enterprise course curricula, and 1-on-1 placement mentorship.

---

## 🎨 Theme Showcase Matrix

The **Master 3D WebGL Portfolio Suite** encompasses **6 distinct interactive developer portfolio environments**, each engineered with specialized 3D geometries, custom shaders, and Web Audio soundscapes:

| Folder | Theme Name | Visual Concept & 3D Environment | Key Interactive Components | Tech Stack |
| :--- | :--- | :--- | :--- | :--- |
| **[`Idea 1`](Idea%201/)** | 🎬 **Director's Cut** | Hollywood Cinema Editing Suite with 3D clapper slate, camera rig, and reel film strip | `FilmSlate3D`, `TimelineScrubber`, `DirectorsCutModal`, `AudioTrackPill` | React 18, Three.js, Vite, TypeScript |
| **[`Idea 2`](Idea%202/)** | 🔭 **Deep Space Observatory** | Deep-space observatory telescope scanning planetary constellations and stellar nebulae | `ObservatoryCanvas`, `ConstellationOverlay`, `SignalSweepBar`, `DetailDrawer` | React 18, Three.js, Vite, Tailwind CSS |
| **[`Idea 3`](Idea%203/)** | 🏺 **Relic Archaeologist** | Subterranean excavation dig shaft with geological stratigraphy and illuminated relics | `DigShaft3D`, `RelicInspectorModal`, `Audio8DControlBar`, `DepthGauge` | React 18, Three.js, Vite, TypeScript |
| **[`Idea 4`](Idea%204/)** | 🌌 **Celestial StarMap** | Cosmic orbital network with glowing interactive skill nodes and gravitational light beams | `StarMap3D`, `SkillsConstellationGraph`, `CosmicRadarScanner`, `OrbitHud` | React 18, Three.js, Vite, TypeScript |
| **[`Idea 5`](Idea%205/)** | 🕹️ **Cyberpunk Arcade** | Retro 1980s neon arcade cabinet with CRT scanline shaders, cartridges, and 8-bit sound effects | `ArcadeCabinet`, `CartridgeSelectorBar`, `SkillPowerUpBar`, `CRTOverlay` | React 18, Three.js, Vite, JavaScript |
| **[`Idea 6`](Idea%206/)** | 🏦 **High-Security Vault** | Multi-chamber financial bullion vault with laser tripwires, biometric scanners, and steel door | `VaultRoom3D`, `LaserGrid3D`, `GoldBullionStacks3D`, `CSOProfileCard` | React 18, Three.js, Vite, JavaScript |

---

## 🛠️ Core Architecture & Shared Schema

All themes share a single, standardized data source interface defined in `shared/portfolioData.ts`:

```typescript
export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "ai" | "fullstack" | "systems" | "dsa";
  technologies: string[];
  metrics: { [key: string]: string | number };
  liveUrl?: string;
  githubUrl?: string;
}
```

This decoupled architectural separation ensures that project data, mentorship statistics, and achievements can be modified once and propagated across any of the 6 portfolio themes.

---

## 🚀 Launching Themes Locally

To launch and run any of the portfolio themes on your local development machine:

```powershell
# 1. Clone the repository
git clone https://github.com/Pradeep-B28/Portfolio.git
cd Portfolio

# 2. Navigate to your desired theme (e.g., Idea 1 - Cinema Director's Cut)
cd "Idea 1"

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build for production deployment
npm run build
```

Open `http://localhost:5173` to interact with the selected 3D theme.

---

## 📄 License & Copyright

```
Copyright (c) 2026 Pradeep (Pradeep-B28). All Rights Reserved.

Licensed under the MIT License. You may freely use, modify, and distribute
this project under the terms of the MIT license. See the LICENSE file for details.
```

Designed with ✨ by **[Pradeep](https://github.com/Pradeep-B28)** (Founder of **[Softech](https://reachsoftech.onrender.com/home)**).

---

## 👨‍💻 Author & Contact

**Pradeep B**  
*Java & DSA Master Trainer | Full-Stack Architect | Web Platform Engineer*

- 🌐 **Softech Career & Placement Portal:** [reachsoftech.onrender.com](https://reachsoftech.onrender.com/home)
- 🌌 **3D Interactive Developer Portfolio:** [pradeep-b28.github.io/GIT_3D_Portfolio](https://pradeep-b28.github.io/GIT_3D_Portfolio/)
- 💻 **GitHub Profile:** [@Pradeep-B28](https://github.com/Pradeep-B28)
- 💼 **LinkedIn:** [linkedin.com/in/pradeepb-2k](https://www.linkedin.com/in/pradeepb-2k)
- 📧 **Email:** [pradeepbashaa@gmail.com](mailto:pradeepbashaa@gmail.com)

### 🚀 Live Web Applications & Platforms
- 🌐 **Softech Career Portal:** [reachsoftech.onrender.com](https://reachsoftech.onrender.com/home)
- 🗺️ **Namma Route (Tamil Nadu Transit Graph):** [nammaroute-sigma.vercel.app](https://nammaroute-sigma.vercel.app/)
- 🎆 **Diwali Sky (Fireworks Simulator):** [diwalisky.vercel.app](https://diwalisky.vercel.app)
- ⚪ **Life in Dots (Lifespan in Weeks):** [lifeindots.vercel.app](https://lifeindots.vercel.app)
- 🤖 **Catch the AI (Code Review & Debug Game):** [catch-the-ai.vercel.app](https://catch-the-ai.vercel.app/)
