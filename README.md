# Sushant Kumar | Modern Portfolio

A premium, cinematic, and modern developer portfolio website built for **Sushant Kumar**, a Computer Science Engineering student specializing in Data Science, AI Engineering, Full Stack Development, and DevOps. This portfolio features advanced 3D web graphics, scroll-linked animations, and a rich, interactive user interface.

## ✨ Features

- **Cinematic Loading Animation**: A mathematically accurate 6-phase loader with SVG signature path-drawing, particle explosions, simulated neural networks, and pixel-sampled text formation.
- **3D Robot Companion**: An interactive 3D robot rendered on the canvas that floats gracefully over the hero section.
- **Neon Glassmorphism UI**: Beautiful frosted-glass cards, neon glow borders, and gradients explicitly designed for a futuristic aesthetic.
- **Scroll-Linked Animations**: Complex parallax and entrance effects as you scroll through the 14 integrated sections.
- **Fully Responsive**: Fluid typography and spacing systems that adapt from 4K monitors down to mobile devices.
- **Centralized Data**: Easily manageable via a single `portfolioData.js` file for rapid updates.

## 🚀 Tech Stack & Libraries

This project uses bleeding-edge frontend technologies to push the limits of modern browsers:

**Core Frameworks**
- [React 19](https://react.dev/) – Component-based architecture
- [Vite 7](https://vitejs.dev/) – Ultra-fast build tool and development server

**Styling & UI**
- [Tailwind CSS v4](https://tailwindcss.com/) – Utility-first minimal CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) – Popular icon packs

**Animation & 3D WebGL**
- [Three.js](https://threejs.org/) – Cross-browser 3D WebGL library
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [@react-three/drei](https://github.com/pmndrs/drei) – React ecosystem bindings for Three.js
- [GSAP (GreenSock)](https://gsap.com/) – Professional-grade JavaScript animation for the cinematic loader sequence
- [Framer Motion](https://www.framer.com/motion/) – Declarative physics-based animations for UI interactions
- [Lenis](https://studiofreight.github.io/lenis/) – Smooth scrolling library for seamless page navigation

## ⚙️ Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sushantkumar143/Modern-Portfolio.git
   cd Modern-Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
├── public/                 # Static assets (robot.glb, file.svg)
├── src/
│   ├── components/         # 15+ React Components (LoadingScreen, Hero, Projects, etc.)
│   ├── data/               # Centralized data source (portfolioData.js)
│   ├── App.jsx             # Main Application layout and routing
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global theme variables, animations, and Tailwind directives
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
└── eslint.config.js        # Linting rules
```

## 📝 License

Designed and developed by Sushant Kumar.
