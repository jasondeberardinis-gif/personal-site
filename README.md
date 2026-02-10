# Jason DeBerardinis — Personal Site

Minimal single-page portfolio site with dark mode, an animated pixel globe, project cards, and social links.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4 (inline config via `@theme inline` in `globals.css` — no `tailwind.config`)
- **Animation**: Framer Motion 12
- **Fonts**: Playfair Display 700 (name), Inter (everything else)
- **Hosting**: Vercel

## Project Structure

```
app/
├── page.tsx           # Single-page portfolio (client component)
├── layout.tsx         # Root layout — fonts, inline theme script, metadata
├── globals.css        # CSS variables (light + dark), @theme inline
└── icon.svg           # Favicon
components/
├── PixelWaves.tsx     # Animated rotating pixel globe (canvas-based 3D sphere)
└── ThemeToggle.tsx     # Sun/moon dark mode toggle (fixed top-right)
```

## Design Tokens

### Light Mode (`:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#FAFAF8` | Page background |
| `--foreground` | `#1C1917` | Primary text |
| `--muted` | `#78716C` | Secondary text |
| `--accent` | `#64748B` | Links, highlights (slate-500) |
| `--border` | `#E7E5E4` | Card borders |
| `--card-bg` | `#FFFFFF` | Card backgrounds |

### Dark Mode (`.dark`)

| Token | Value |
|-------|-------|
| `--background` | `#1C1917` |
| `--foreground` | `#FAFAF8` |
| `--muted` | `#A8A29E` |
| `--accent` | `#94A3B8` |
| `--border` | `#44403C` |
| `--card-bg` | `#292524` |

## Dark Mode

- Class-based dark mode using `@variant dark (&:where(.dark, .dark *))` in `globals.css` so Tailwind `dark:` utilities respond to the `.dark` class instead of the OS media query
- Toggle in `components/ThemeToggle.tsx` adds/removes `.dark` on `<html>`
- Persisted to `localStorage` under key `theme`
- Inline `<script>` in `layout.tsx` reads localStorage before paint (no flash)
- `suppressHydrationWarning` on `<html>` to avoid React mismatch

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
```
