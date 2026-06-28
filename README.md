# Materia — Artisanal Marketplace

> *Connecting heritage makers with conscious collectors. An elegant, high-end editorial gallery celebrating premium handmade ceramics, organic textiles, and hand-carved woodwork.*

---

## 🎨 Visual Philosophy

**Materia** is designed with a premium, Behance-style editorial aesthetic. By departing from standard SaaS design systems, it introduces a warm, tactile canvas centered around:
* **Organic Background Depth**: A subtle, low-opacity CSS noise overlay that simulates raw handmade paper or artisanal plaster texture.
* **Ambient Lighting Glow**: Large, blurred radial gradient background blooms in soft sand (`#F4EBE1`) and warm terracotta hues that sit behind typography to provide dimension.
* **Refined Typography & Accents**: A curated pairing of display headings and monospace details, enclosed in a responsive high-contrast layout.
* **Micro-interactions**: Custom-crafted, animated minimalist SVG icons and smooth, responsive hover states designed to maximize sensory immersion.

---

## ✨ Key Features

* **Curated Heritage Catalog**  
  An exquisite gallery of handmade masterworks, including hand-thrown Terracotta Olla Vases, organic hand-woven Zapotec rugs, and live-edge maple burl bowls.
* **Atmospheric Hero & Header Canvas**  
  A stunning Behance-inspired introductory section styled with spacious negative space, responsive call-to-action buttons, and interactive category transitions.
* **Lathe/Stripe Powered Checkout Drawer**  
  A comprehensive, slide-out cart management dashboard with dynamic local tax, shipping, and active promo-code calculations (e.g., test coupon `HERITAGE10`).
* **Robust Stripe Payment Router**  
  A production-ready Express API gateway that coordinates secure Stripe checkout sessions. If api keys are absent, it gracefully falls back to an elegant simulated gateway to preserve premium user experience.
* **Pristine Single-Instance Toast Engine**  
  A custom, non-duplicating toast system that manages active notifications dynamically for cart mutations, preventing duplicate alert issues.

---

## 🛠️ Tech Stack

* **Frontend Engine**: React 19 (Functional Hooks & Context)
* **Styling Framework**: Tailwind CSS (Tactile color tokens and layouts)
* **Animations**: Motion (framer-motion) for fluid route and UI transitions
* **Server Framework**: Node.js & Express (Robust API controllers & static assets host)
* **Compilation & Bundling**: Vite (Fast HMR development environment) & Esbuild (Fast production build packaging)
* **Type System**: Strict TypeScript (Pure compile-time safety and interfaces)
* **Assisted Development**: Built with Google AI Studio

---

## 🚀 Getting Started

Follow these steps to spin up the full-stack workspace locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/materia-artisanal-marketplace.git
cd materia-artisanal-marketplace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy the template configuration file:
```bash
cp .env.example .env
```
Open the `.env` file and insert any optional credentials, such as:
```env
# Optional Stripe secret API key
STRIPE_SECRET_KEY=sk_test_...
```

### 4. Run the Development Server
```bash
npm run dev
```
Your full-stack application will boot on `http://localhost:3000` with the Vite frontend proxied automatically through the Express API server.

### 5. Build for Production
To bundle the frontend assets and compile the server code into a self-contained production bundle:
```bash
npm run build
npm start
```

---

## 📜 Credits & Attributions

* **Artisanal Guilds**: This project honors and respects the timeless skills, oral traditions, and cultural heritage of rural craft guilds around the world.
* **Lead Designer & Developer**: Developed with exceptional attention to typography, layout, and software architecture by **YHOAN QUISPE**.
