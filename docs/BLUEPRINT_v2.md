# InΦnity: Blueprint v2

Updated 13 October 2026 after your answers. Builds on the architecture in `mentor_marketplace_full_chat.txt`, which still holds for everything not changed here.

## 1. Your answers, and how I applied them

| # | Your answer | What I did |
|---|---|---|
| 1 | Mentor charges are decided by values set by us | Rates come from a company rate card. Mentors carry a tier (A, B, C). **No prices appear anywhere in the UI.** |
| 2 | Mentors are professionals, not everyone qualifies, verification to be designed | Four-check pipeline in the UI: identity, credentials, domain review, background and conflict check. Profiles stay hidden until all four pass. |
| 3 | Minimum age: yes, for mentors | Built as **18 or over for everyone** (mentors and students). See question 2 below. |
| 4 | Keep all three charging formats | Hourly session, monthly package, fixed-price milestone. Each mentor lists which they offer. |
| 5 | Commission decided later | Not shown or modelled in the UI. The ledger design leaves a fee line open. |
| 6 | Students own the project, special mentor privileges decided later | Ownership statement on the request form and mentor profile. Privilege terms are a placeholder in the engagement agreement. |
| 7 | Yes to video calls | Session room built: video area, controls, notes, shared data, chat. A video provider plugs in later. |
| 8 | Built by you and me, V1 is the UI, due in 2 days | Whole UI delivered as a runnable app. V1 PDC: 15 October 2026. |
| 9 | Brand is InΦnity with the Φ in the middle | Wordmark with a drawn Φ, favicon and SVG brand files. The Φ is also the planet in the hero drawing. |

From your notebook photo I read two more requirements: **PDC 15/10/26** and **Status (current and PDC)**. Every mission now shows its current status and its planned date of completion.

## 2. Focus: IoT, UAV, satellites, CanSats, rockets, defence

- **Ten domains** replace the generic fields: UAV and autopilot, CubeSats, CanSat, rockets and propulsion, avionics and embedded, RF and telemetry, GNC, payloads and sensors, ground segment, defence and dual-use.
- **Technology Readiness Levels 1 to 9** are the stage model for projects and for mentor coverage. This is the standard language aerospace and defence reviewers already use, and it makes matching far sharper than "beginner or advanced".
- **Technical drawings** in the interface: orbit diagram, 1U CubeSat (10 cm cube), CanSat envelope (Ø66 mm by 115 mm), quadrotor, sounding-rocket altitude profile, telemetry traces.
- **Session room data tab** for sharing sensor logs and plots with a mentor.

## 3. My additions

1. **Compliance gate for defence and dual-use work.** A project in that domain is held for review, and only mentors with a defence clearance on their profile can see it. Everyone declares that no classified or export-controlled material will be uploaded. This protects students, mentors and you.
2. **Defence clearance as a separate mentor attribute**, not a side effect of being verified.
3. **Mission IDs** (MSN-0142 style) on every project, so sessions, notes, files and tickets reference one identifier.
4. **Planned date of completion tracking** with at-risk and overdue states, useful for admin reporting on stalled missions.
5. **Role-based admin console** with a "viewing as" switch, so you can see the least-privilege model before it is built.
6. **Academic integrity statement** in the request and application flows: mentors guide and review, they do not do assessed work.
7. **Free 15-minute intro call** on mentor profiles.

## 4. Open questions, each with the default I assumed

| # | Question | Default used |
|---|---|---|
| 1 | Does PDC mean "planned date of completion"? | Yes |
| 2 | Is 18+ required for students as well as mentors? | Yes, both |
| 3 | Your notebook page cuts off below item 2. Is there an item 3 or more? | Assumed no |
| 4 | Will defence-related projects be accepted at launch, or held back until legal review is done? | UI supports them behind the compliance gate. Launch policy is yours to decide with counsel. |
| 5 | Video: integrate an external provider, or build in-house later? | External provider |
| 6 | How are rate card tiers decided? | A, B, C by verified experience and domain review level |
| 7 | Where is data hosted? | India region first (Mumbai or Hyderabad) |
| 8 | Which languages besides English? | Hindi, Telugu, Marathi, Kannada, Malayalam shown as sample options |
| 9 | What should come right after the UI? | Threat model and permission matrix, then database schema and sign-in |

## 5. Plan after V1 (UI)

1. Threat model and permission matrix.
2. Database schema, sign-in with passkeys, role-based access.
3. Mission requests, matching, mentor applications, verification workflow.
4. Engagement agreement, messaging, scheduling, video provider.
5. Payments once the rate card and commission are decided.
6. Security testing and audit preparation.

## 6. Things to check with professionals before launch

- **Defence and export-control rules.** The compliance gate is a product design. What it must contain legally (India's export-control lists for dual-use items, any foreign rules that apply to your mentors or students, handling of controlled technical data) needs advice from a lawyer who knows this field.
- **Drone and space regulations** that affect advice mentors may give (for example drone operation rules and space-activity authorisation in India).
- **GST and marketplace tax treatment** once payments are added.
- **Certification wording.** The site says the architecture is aligned to ISO/IEC 27001 and SOC 2. It must not say "certified" until an independent audit is complete.

## 7. Known limits of this build

- Sample data only. No database, sign-in, payments or file storage.
- I could not open the pages in a browser inside my workspace, so layout has been checked through the build, type-checking and a request to every page, not by eye. Look through each screen at desktop and phone width and tell me what to adjust.
- Next.js 16 and React 19 are used so the project starts with no known security advisories. It needs Node.js 20.9 or newer.
