# Mrinel Jogy – Portfolio

A fast, responsive personal site for projects, experience, and contact info. Built from a React + TypeScript + Tailwind template.

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix

## Getting started
```bash
npm install
npm run dev
```
Then open the local URL shown in the terminal (usually http://localhost:5173).

## Layout
- `src/components` – UI sections and shared components (shadcn/ui under `ui/`)
- `src/content` – All your editable copy: `hero.ts`, `about.ts`, `contact.ts`, `experience.ts`, `skills.ts`, `projects.ts`, `siteMeta.ts`, `navigation.ts`
- `src/pages` – Routes (`Index.tsx`, `NotFound.tsx`)
- `public/` – Static assets (resume PDF, favicon, project thumbnails)

## Before you deploy — TODO checklist
1. **Social links**: update `github` and `linkedin` URLs in `src/content/hero.ts` and `src/content/contact.ts`.
2. **Project images**: swap the placeholder gradient SVGs in `public/` (`project-*.svg`) for real screenshots/GIFs of Hydrosave+, ASL Sports League, MediMetrics, CyberSentinel, and AI Personal Assistant. Update the `thumbnail`/`images` paths in `src/content/projects.ts` to match.
3. **Project links**: add GitHub/live-demo links to each project's `externalLinks` in `projects.ts` if you have them.
4. **Resume**: `public/Mrinel-Jogy-Resume.pdf` is your current resume — replace the file (keep the same name, or update `resumeUrl` in `hero.ts`) whenever you update it.
5. **Site URL**: once deployed, update `siteUrl` in `src/content/siteMeta.ts` and the OG/Twitter URLs in `index.html`.
6. **AI chatbot (optional)**: `api/chat.js` + `api/portfolio-content.js` power an optional AI chatbot widget that answers questions about you using Google Gemini. To enable it, deploy on Vercel and add a `GEMINI_API_KEY` environment variable. If you don't want it, you can remove `src/components/ChatBot.tsx` from the page and delete the `api/` folder.

## Deploying
The easiest option is [Vercel](https://vercel.com):
1. Push this project to a GitHub repo.
2. Import the repo in Vercel.
3. (Optional) Add a `GEMINI_API_KEY` env variable if you want the chatbot working.
4. Deploy — Vercel auto-detects the Vite build.

Netlify works too: build command `npm run build`, publish directory `dist`.
