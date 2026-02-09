# Jason DeBerardinis — Personal Site

## Project Overview

Minimal single-page personal site. Dark mode, bold serif name, headshot, bio, project cards, and social links.

## Tech Stack

- **Framework**: Next.js 16 (App Router) on Vercel
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4 (inline config via `@theme inline` in `globals.css` — no `tailwind.config`)
- **Animation**: Framer Motion 12
- **Fonts**: Playfair Display 700 (name only), Inter (everything else)

## Architecture

```
app/
├── page.tsx              # Single-page personal site (client component)
├── layout.tsx            # Root layout — fonts, inline theme script, metadata
├── globals.css           # CSS variables (light + dark), @theme inline
└── favicon.ico
components/
└── ThemeToggle.tsx        # Sun/moon dark mode toggle (fixed top-right)
public/
├── headshot-placeholder.svg  # 80px circle with "JD" initials
├── responses-logo.svg        # 32px "R" letter-mark placeholder
└── headshot.jpg              # (swap in real photo later)
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
