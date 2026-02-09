# SHEATH Marketing Automation Dashboard

Internal marketing dashboard for SHEATH, connecting real data from Shopify, Klaviyo, and social media platforms into a unified view.

## Current State

The dashboard has 6 pages with a backend service layer and API routes. Pages currently display mock data but gracefully switch to live data once API keys are configured.

| Page | Route | What It Shows | Data Source |
|------|-------|---------------|-------------|
| ROI Summary | `/` | Cart recovery, email revenue, repeat rate, time saved | Shopify + Klaviyo |
| Content Studio | `/content` | Content generation UI with platform selector and previews | (AI — future) |
| Analytics | `/analytics` | Email performance, social growth, revenue attribution, top posts | Klaviyo + Social APIs |
| Email Flows | `/flows` | Interactive flowchart of automated email sequences | Klaviyo |
| Calendar | `/calendar` | Monthly content calendar with platform filters and event popovers | Database (future) |
| Segments | `/segments` | Customer segments with automation rules | Klaviyo |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: NextAuth.js v4 (credentials provider)
- **Hosting**: Vercel

## Integrations

| Service | API | Status |
|---------|-----|--------|
| Shopify | Admin API | Service layer built, needs API key |
| Klaviyo | API v2024-10-15 | Service layer built, needs API key |
| Instagram | Meta Graph API | Service layer built, needs API key |
| YouTube | Data API v3 | Service layer built, needs API key |
| LinkedIn | Marketing API | Service layer built, needs API key |
| X | API v2 | Service layer built, needs API key |

## Getting Started

```bash
npm install
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials (at minimum, set auth credentials):

```bash
# Generate a secret
openssl rand -base64 32
```

```env
NEXTAUTH_SECRET=<paste-secret-here>
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=you@sheath.store
ADMIN_PASSWORD=your-password
ADMIN_NAME=Your Name
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll see a login page — sign in with your configured credentials.

## Project Structure

```
app/
  api/
    auth/[...nextauth]/   # NextAuth.js API route
    metrics/              # ROI metrics (Shopify)
    analytics/            # Aggregated analytics
    email/campaigns/      # Email campaign stats (Klaviyo)
    email/flows/          # Email flow data (Klaviyo)
    social/               # Social media metrics (all platforms)
    segments/             # Customer segments (Klaviyo)
    calendar/             # Calendar events (CRUD)
  login/                  # Login page
  (pages)/                # Dashboard pages (/, /analytics, /content, /flows, /calendar, /segments)

components/
  analytics/              # Chart components (email, social, revenue, top posts)
  calendar/               # Calendar grid, event pills, content wrapper
  content/                # Content studio UI and preview cards
  flows/                  # Email flow visualization components
  home/                   # Home page content
  layout/                 # Sidebar, page transitions, AppShell
  providers/              # SessionProvider
  segments/               # Segment cards and charts
  shared/                 # Reusable components (MetricCard, Badge, ChartCard, PageHeader)

lib/
  auth.ts                 # NextAuth.js configuration
  constants.ts            # Brand colors, platform types, nav items
  mock-data.ts            # Mock data (fallback when APIs not configured)
  services/
    shopify.ts            # Shopify Admin API client
    klaviyo.ts            # Klaviyo API client
    instagram.ts          # Instagram Graph API client
    youtube.ts            # YouTube Data API client
    linkedin.ts           # LinkedIn API client
    x.ts                  # X API client

middleware.ts             # Route protection (redirects to /login if unauthenticated)
.env.local.example        # Environment variables template with setup guide
```

## API Key Setup

See `.env.local.example` for detailed instructions on obtaining API keys for each service. Each integration is optional — the dashboard falls back to mock data when a service isn't configured.

## Platforms

The dashboard tracks these platforms: **Instagram**, **YouTube**, **Email**, **LinkedIn**, **X**

## Build & Quality

```bash
npm run build            # Production build
npm run lint             # ESLint
./node_modules/.bin/tsc --noEmit  # TypeScript check
```
