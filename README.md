# Shelja Pugaliya — Portfolio

Personal portfolio built as a scroll-through **journey**: Guwahati → Bangalore → Ireland,
with optional voice-over narration per chapter, followed by selected work, experience and a toolbox.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · deploy on Vercel.
Fully static — no backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Edit content (no code needed)

| What | File |
| --- | --- |
| Name, tagline, links, CV path | `src/content/profile.ts` |
| Journey chapters (text, transcript, map pin, audio) | `src/content/journey.ts` |
| Projects, experience, skills | `src/content/projects.ts` |
| Caricature illustrations | `src/components/CaricatureScene.tsx` |
| Colours, fonts, texture | `src/app/globals.css` (`@theme` block) |

Add a stop or a project = one new entry in the relevant file.

## Assets to drop in

- `public/cv.pdf` — the downloadable CV (currently a copy of the latest CV; replace when updated).
- `public/audio/chapter-1-guwahati.mp3`
- `public/audio/chapter-2-bangalore.mp3`
- `public/audio/chapter-3-ireland.mp3`

  Filenames must match `audioSrc` in `src/content/journey.ts`. Until a file exists the player
  shows "Narration coming soon" and the transcript is always available.

## Deploy (Vercel)

1. Push this repo to GitHub (`Shelja-Pugaliya/portfolio`).
2. Import it at vercel.com → New Project. Framework preset: Next.js. No env vars.
3. Set the project's production domain to `sheljapugaliya.vercel.app` (Project → Settings → Domains).
4. Update `SITE_URL` in `src/app/layout.tsx` if the final URL differs.

## Accessibility notes

- No audio autoplays; each chapter has an explicit play control and a full transcript.
- The scroll reveal is a CSS `animation-timeline: view()` effect; content is fully visible
  without it and when `prefers-reduced-motion` is set.
- The journey map route-draw and active-pin highlight are progressive enhancement; the map is
  legible (full route + labels) without JavaScript.
