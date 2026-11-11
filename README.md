# InΦnity: UI prototype v0.1

Expert mentorship marketplace for student and startup teams building UAVs, CubeSats, CanSats, rockets and defence systems. This is the V1 interface: every screen is built and clickable, with sample data and no backend yet.

Planned completion date (PDC) for V1: 15 October 2026.

## Run it

You need **Node.js 20.9 or newer** (the LTS version from https://nodejs.org) and an internet connection the first time.

| System | What to do |
|---|---|
| Windows | Double-click `start.bat` |
| macOS or Linux | Run `./start.sh` in a terminal (first time: `chmod +x start.sh`) |
| Any system | `npm install`, then `npm run dev` |

Then open http://localhost:3000. `start.bat` and `start.sh` install what the app needs on the first run, start it, and open your browser.

For a production-style run: `npm run build` then `npm start`.

## Screens

| Address | Screen |
|---|---|
| `/` | Landing page |
| `/sign-in` | Sign in (student, mentor or staff) |
| `/student` | Student workspace: missions with status, readiness and PDC |
| `/student/new` | Four-step mission request with compliance declarations |
| `/mentors` | Mentor directory with working filters (`?domain=rocketry` pre-selects a domain) |
| `/mentors/[id]` | Mentor profile, for example `/mentors/rhea-kulkarni` |
| `/mentor` | Mentor workspace: requests, engagements, verification |
| `/mentor/apply` | Mentor application and verification steps (18+ check included) |
| `/session/demo` | Video session room with notes, shared data and chat |
| `/admin` | Admin console with role-based views |

## What is in it

- **Technology Readiness Levels (1 to 9)** describe every project and every mentor's coverage.
- **Status and PDC** (planned date of completion) on every mission.
- **Ten domains**: UAV, CubeSat, CanSat, rockets and propulsion, avionics, RF and telemetry, GNC, payloads, ground segment, defence and dual-use.
- **Compliance gate** for defence-related projects and cleared mentors.
- **Three engagement formats**: hourly session, monthly package, fixed-price milestone.
- **No prices anywhere.** Rates come from a rate card the company publishes later. Tier A, B and C appear as placeholders.
- Technical line drawings are drawn in code, so there are no image downloads.

## Change things

| To change | Edit |
|---|---|
| Mentors, projects, domains, admin tables | `lib/data.ts` |
| Colours, fonts, spacing, components | `app/globals.css` (tokens at the top) |
| Logo | `components/Logo.tsx`; files in `public/brand/` |
| Illustrations | `components/Art.tsx` |
| Page content | `app/<route>/page.tsx` |

## What this version is not

- All people, projects and figures are **sample data**.
- Sign-in, forms and uploads do not save anything. There is no database or payment provider.
- The session room shows where video connects. A video provider is added in the full build.
- Security wording on the landing page says the architecture is *aligned to* ISO/IEC 27001 and SOC 2. It does not claim certification.

## Tech

Next.js 16, React 19, TypeScript 5, plain CSS. Fonts (IBM Plex Sans, IBM Plex Mono, Source Serif 4) are installed as packages, so the app works offline after the first install.
