# 🚀 3D Interactive Portfolio Suite

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

A state-of-the-art suite of **6 unique 3D interactive web portfolio applications**, engineered with **React, Vite, Three.js, React Three Fiber (R3F), WebGL shaders, Web Audio API, and Tailwind CSS**.

Every template connects to a **single common data file** (`portfolio-data.ts` / `shared/portfolioData.ts`). When you edit your details in that single file, **all 6 portfolio templates update simultaneously** on page refresh with zero build steps required!

---

## ⚡ Quick Start: Customize All 6 Portfolios in 1 Minute

```bash
# 1. Clone the repository
git clone https://github.com/Pradeep-B28/Portfolio.git
cd Portfolio

# 2. Edit your details in ONE central file:
# Open `shared/portfolioData.ts` (or `portfolio-data.ts`) in VS Code

# 3. Launch any portfolio locally
cd "Idea 1"
npm install
npm run dev
```

> 💡 **Single Data Source Magic:**  
> Editing `shared/portfolioData.ts` updates **Idea 1, Idea 2, Idea 3, Idea 4, Idea 5, and Idea 6** instantly!

---

## 🎨 The 6 Interactive 3D Portfolio Templates

| Idea # | Template Name | Visual Concept & 3D Interactive Theme | Tech Stack & Features |
|---|---|---|---|
| 🎬 **Idea 1** | **The Editing Room** | **3D Film Studio & Viewfinder HUD**<br>Interactive film reel filmstrips, 3D projector camera stage, film slate crosshairs, timecode counter, end-credits crawl. | React, Three.js, R3F, Lucide React, Glassmorphism |
| 🌌 **Idea 2** | **The Solar System** | **3D Interstellar Galaxy Observatory**<br>Interactive planet orbits, 3D canvas stage, planet index mode, Observatory control deck, guided planet tour. | React, Three.js, R3F, Canvas Shaders, Web Audio |
| 🏛️ **Idea 3** | **The Excavation Machine** | **3D Subterranean Archaeological Dig Shaft**<br>Subterranean depth gauge (0m to 100m), hydraulic drill controls, 3D specimen inspection model, 8D audio soundscape. | React, Three.js, Web Audio 8D, Lucide React |
| ⭐ **Idea 4** | **The Constellation** | **3D Cosmic Star Map & Telescope Radar**<br>3D star graph nodes, anchor constellation warping, 8D cosmic radar scanner, skill focus telemetry. | React, Three.js, R3F, Web Audio, Tailwind CSS |
| 🕹️ **Idea 5** | **The Arcade Cabinet** | **3D Retro Cyberpunk Arcade Machine**<br>Cartridge insertion sound effects, CRT scanlines, 3D arcade cabinet stage, live ticker, Leaderboard modal. | React, Three.js, R3F, GSAP, Web Audio Synth |
| 🏦 **Idea 6** | **The Bank Vault** | **3D High-Tech Security Vault & Laser HUD**<br>Interactive 3D vault door tumblers, security laser grid, deposit box inspection, live ticker, PDF report export. | React, Three.js, html2canvas, jsPDF, Web Audio |

---

## 🛠️ Data Structure (`shared/portfolioData.ts`)

The central file `shared/portfolioData.ts` contains all customizable fields:

```typescript
export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Your Name",
    title: "Your Title / Role",
    tagline: "Your Mission Statement",
    summary: "Your Professional Bio...",
    location: "City, Country",
    yearsExperience: "4+ Years",
    clearanceLevel: "Level 5 Executive Access",
    developerRating: "S-Tier Architect",
  },
  socialLinks: {
    email: "your.email@example.com",
    phone: "+1 234 567 8900",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    portfolioUrl: "https://yourportfolio.com",
  },
  education: [
    { degree: "Master of Science", institution: "University Name", period: "2023 - Present" },
    { degree: "Bachelor of Technology", institution: "College Name", period: "2019 - 2023" },
  ],
  certifications: [
    "AWS Certified Solutions Architect",
    "Google Professional Cloud Engineer",
  ],
  skills: [
    { id: "java", name: "Java & JVM", category: "Languages & Core", level: 95, expertiseLevel: "Expert" },
    { id: "react", name: "React.js", category: "Frontend & 3D", level: 92, expertiseLevel: "Expert" },
  ],
  projects: [
    {
      id: "project-1",
      title: "Project Title",
      subtitle: "Project Tagline",
      category: "Full-Stack & 3D",
      role: "Lead Developer",
      timeframe: "2025 - 2026",
      releaseYear: 2026,
      description: "Detailed description of what you built...",
      highlights: ["Highlight 1", "Highlight 2"],
      metrics: [{ label: "Metric", value: "100%" }],
      techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/yourusername/project-1",
      liveUrl: "https://project-1.example.com",
      color: "#22D3EE",
      reelColor: "#22D3EE",
      complexity: 5,
      valuation: 350000,
      boxNumber: "VAULT-001",
      codeName: "ORBIT-01",
      cartridgeCode: "CART-01",
      takeType: "GOOD TAKE",
    },
  ],
};
```

---

## 💻 Running Portfolios Locally

Navigate to any of the 6 portfolio directories and start the Vite dev server:

```bash
# To run Idea 1 (Film Studio):
cd "Idea 1"
npm run dev

# To run Idea 2 (Solar System):
cd "../Idea 2"
npm run dev

# To run Idea 3 (Archaeological Dig):
cd "../Idea 3"
npm run dev

# To run Idea 4 (Constellation Star Map):
cd "../Idea 4"
npm run dev

# To run Idea 5 (Retro Arcade):
cd "../Idea 5"
npm run dev

# To run Idea 6 (High-Tech Bank Vault):
cd "../Idea 6"
npm run dev
```

Vite will start a local dev server (usually at `http://localhost:5173`).

---

## 📦 Building & Deployment

To build any portfolio for production:

```bash
cd "Idea 1"
npm run build
```

This generates a static output folder `dist/` ready to deploy on:
- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Cloudflare Pages**

---

## 📄 License & Attribution

Designed and engineered with ❤️ by **Pradeep B** (Learning & Development Lead & Full-Stack Architect).  
Free to customize for personal developer portfolios!
