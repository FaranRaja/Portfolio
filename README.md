# Faran Raheel Raja — Portfolio

Built with React + Vite + TypeScript + Tailwind CSS + Three.js + Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

## Setup Checklist

### 1. Ready Player Me Avatar (Hero 3D Model)
- Go to https://readyplayer.me
- Create your avatar using your photo
- Download the `.glb` file
- Place it at `public/avatar.glb`
- In `src/components/Hero.tsx`, replace `<AvatarOrb />` with:
  ```tsx
  import { useGLTF } from '@react-three/drei';
  function AvatarModel({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={2} position={[0, -1.5, 0]} />;
  }
  // Then use: <AvatarModel url="/avatar.glb" />
  ```

### 2. Contact Form (Formspree)
- Sign up at https://formspree.io (free tier = 50 submissions/month)
- Create a new form, copy the form ID
- In `src/components/Contact.tsx`, replace `YOUR_FORM_ID` with your actual ID

### 3. Resume PDF
- Place your resume at `public/resume.pdf`
- The "Download CV" button in the navbar and hero will serve it automatically

### 4. Deploy to Vercel
```bash
npm run build
# Push to GitHub, then import repo on vercel.com
# Zero config needed — Vite is auto-detected
```

## Project Structure

```
src/
├── components/
│   ├── Cursor.tsx       # Custom cursor
│   ├── Navbar.tsx       # Sticky nav + mobile menu
│   ├── Hero.tsx         # 3D hero section + typewriter
│   ├── About.tsx        # About + highlight cards
│   ├── Projects.tsx     # Bento grid projects
│   ├── Skills.tsx       # Skills + marquee
│   ├── Experience.tsx   # Education timeline
│   ├── Contact.tsx      # Contact form
│   ├── Footer.tsx       # Footer
│   └── Chatbot.tsx      # AI floating chatbot (Claude API)
├── data/
│   └── portfolio.ts     # All your content — edit this file!
└── index.css            # Global styles + Tailwind
```

## Customisation
All content lives in `src/data/portfolio.ts`. Edit that file to update:
- Personal info, links, email
- Projects list
- Skills
- Education history
- Chatbot knowledge base

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v3
- Three.js + @react-three/fiber + @react-three/drei
- Framer Motion
- Lucide React (icons)
- Google Gemini API (chatbot)

## Gemini Chatbot Setup
1. Go to https://aistudio.google.com/app/apikey (free, no credit card)
2. Create a new API key
3. Rename `.env.example` to `.env` and paste your key:
   ```
   VITE_GEMINI_API_KEY=AIza...your_key_here
   ```
4. For Vercel deployment, add `VITE_GEMINI_API_KEY` as an environment variable in your project settings
