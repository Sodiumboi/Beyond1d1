# 🎲 Beyond1d1 — Project Roadmap

> A free, open-source, map-free virtual tabletop that combines the customizability of Google Sheets character building, the convenience of D&D Beyond, and the live-play experience of Roll20 — powered by 5e-tools data.

**Status:** Alpha — Milestone 0 complete ✅, Milestone 0.5 (Design System) in progress  
**License:** MIT  
**Stack:** Next.js · TypeScript · PostgreSQL · Redis · Socket.io · Tailwind CSS

---

## Release Timeline

```
2026
May  ████████████████  v0.1  Limbo              ✅ Complete   — Foundation (the formless beginning)
May  ████████████████  v0.2  Mechanus            🔄 In progress — Design System (pure order, every value defined)
TBA  ░░░░░░░░░░░░░░░░  v0.6  Sigil               🔜 Planned   — UI/UX Design (the city of doors, everything connects)
TBA  ░░░░░░░░░░░░░░░░  v1.0  Waterdeep           🔜 Planned   — Sheet Engine (the grand city, center of everything)
TBA  ░░░░░░░░░░░░░░░░  v1.5  Candlekeep          🔜 Planned   — Compendium + GSheet Import (the fortress library)
TBA  ░░░░░░░░░░░░░░░░  v2.0  Baldur's Gate       🔮 Planned   — Session Table (gritty, alive, the port of entry)
TBA  ░░░░░░░░░░░░░░░░  v2.5  Ravenloft           🔮 Planned   — DM Tools (haunted, dense, maximalist)
TBA  ░░░░░░░░░░░░░░░░  v3.0  Avernus             🔮 Planned   — Homebrew & Plugins (first layer, dangerous power)
TBA  ░░░░░░░░░░░░░░░░  v3.5  Elysium             🔮 Planned   — Polish & Self-Hosting (serene, complete)
TBA  ░░░░░░░░░░░░░░░░  v4.0  Sigil (The Outlands) 🔮 Planned  — Community & Ecosystem (all planes connect here)
```

> Version names TBD — placeholder cadence only. Timeline is aspirational; milestone scope drives actual release dates.

---

---

## Table of Contents

- [Vision](#vision)
- [Guiding Principles](#guiding-principles)
- [System Overview](#system-overview)
- [v0.1 Limbo — Foundation](#milestone-0--foundation) ✅
- [v0.2 Mechanus — Design System & Tokens](#milestone-05--design-system--tokens) 🔄
- [v0.6 Sigil — UI/UX Design](#milestone-06--uiux-design)
- [v1.0 Waterdeep — Sheet Engine](#milestone-1--sheet-engine-alpha)
  - [1.4B — Character Appearance Settings](#14b--character-appearance-settings)
  - [1.5 — Dice Roll System](#15--dice-roll-system-client-side)
  - [1.5B — Quick Dice Widget](#15b--quick-dice-widget)
  - [1.6 — Character Roster Dashboard](#16--character-roster-dashboard)
  - [1.7 — Public Character Profiles](#17--public-character-profiles)
- [v1.5 Candlekeep — Compendium & Data Layer](#milestone-2--compendium--data-layer-alpha)
- [v1.5 Candlekeep — GSheet Import](#milestone-25--google-sheets-import)
- [v2.0 Baldur's Gate — Session Table](#milestone-3--session-table-alpha)
  - [3.7 — Sandbox / Mock Table Mode](#37--sandbox--mock-table-mode)
  - [3.8 — Cross-Page Session Notifications](#38--cross-page-session-notifications)
  - [3.9 — Spectator Mode](#39--spectator-mode)
- [v2.5 Ravenloft — DM Tools](#milestone-4--dm-tools-beta)
- [v3.0 Avernus — Homebrew & Plugins](#milestone-5--homebrew--plugin-system-beta)
- [v3.5 Elysium — Polish & Self-Hosting](#milestone-6--polish--self-hosting-v10)
- [v4.0 Sigil (The Outlands) — Community & Ecosystem](#milestone-7--community--ecosystem-post-v10)
- [Technical Decisions](#technical-decisions)
- [Out of Scope](#out-of-scope)
- [Contributing](#contributing)

````

And for each milestone header in the body of the roadmap, replace the plain `## Milestone X` headers with these:

```markdown
## Milestone 0 — Limbo · Foundation ✅

## Milestone 0.5 — Mechanus · Design System & Tokens 🔄

## Milestone 0.6 — Sigil · UI/UX Design

## Milestone 1 — Waterdeep · Sheet Engine (Alpha)

## Milestone 2 — Candlekeep · Compendium & Data Layer (Alpha)

## Milestone 2.5 — Candlekeep · Google Sheets Import

## Milestone 3 — Baldur's Gate · Session Table (Alpha)

## Milestone 4 — Ravenloft · DM Tools (Beta)

## Milestone 5 — Avernus · Homebrew & Plugin System (Beta)

## Milestone 6 — Elysium · Polish & Self-Hosting (v1.0)

## Milestone 7 — Sigil (The Outlands) · Community & Ecosystem (Post-v1.0)
````

---

The rationale behind each Milestone name pick from Location in DnD as a reference:

**Limbo** — formless chaos that hasn't solidified yet. A foundation that exists but isn't ordered. Perfect for "it runs, but nothing is built on it yet."

**Mechanus** — the plane of absolute law and clockwork. Every gear defined, every value in its place. A design system is literally Mechanus made into CSS.

**Sigil (v0.6)** — the City of Doors. It's where all planes connect — and the UI/UX milestone is where all screens get defined before anything is built. Every door placed before anyone walks through it.

**Waterdeep** — the grand city, center of the Forgotten Realms, where adventurers are made. The sheet engine is the core of the whole app. Everything else orbits it.

**Candlekeep** — a fortress built entirely around a library. You cannot enter without donating a book. The compendium and import milestone is literally about getting knowledge into the system.

**Baldur's Gate** — the port city, gritty and alive, full of people doing things at once. The session table is exactly that: multiple players, real-time, alive.

**Ravenloft** — haunted, dense, maximalist, the DM is always the dark lord pulling strings behind a curtain. The DM tools milestone gives them that power.

**Avernus** — the first layer of the Nine Hells, where the Blood War is fought and everything is customized and dangerous. Homebrew and plugins are the player-facing chaos layer.

**Elysium** — the plane of perfect peace and rest. A v1.0 polish milestone should feel like you've finally arrived somewhere.

**Sigil (The Outlands) v4.0** — Sigil appears twice deliberately. At v0.6 it's the city of doors being _designed_. At v4.0 it's the city fully realized — the community hub where everything from every plane converges. The callbacks are intentional.

---

## Table of Contents

- [Vision](#vision)
- [Guiding Principles](#guiding-principles)
- [System Overview](#system-overview)
- [v0.1 Limbo — Foundation](#milestone-0--foundation) ✅
- [v0.2 Mechanus — Design System & Tokens](#milestone-05--design-system--tokens) 🔄
- [v0.6 Sigil — UI/UX Design](#milestone-06--uiux-design)
- [v1.0 Waterdeep — Sheet Engine](#milestone-1--sheet-engine-alpha)
  - [1.4B — Character Appearance Settings](#14b--character-appearance-settings)
  - [1.5 — Dice Roll System](#15--dice-roll-system-client-side)
  - [1.5B — Quick Dice Widget](#15b--quick-dice-widget)
  - [1.6 — Character Roster Dashboard](#16--character-roster-dashboard)
  - [1.7 — Public Character Profiles](#17--public-character-profiles)
- [v1.5 Candlekeep — Compendium & Data Layer](#milestone-2--compendium--data-layer-alpha)
- [v1.5 Candlekeep — GSheet Import](#milestone-25--google-sheets-import)
- [v2.0 Baldur's Gate — Session Table](#milestone-3--session-table-alpha)
  - [3.7 — Sandbox / Mock Table Mode](#37--sandbox--mock-table-mode)
  - [3.8 — Cross-Page Session Notifications](#38--cross-page-session-notifications)
  - [3.9 — Spectator Mode](#39--spectator-mode)
- [v2.5 Ravenloft — DM Tools](#milestone-4--dm-tools-beta)
- [v3.0 Avernus — Homebrew & Plugins](#milestone-5--homebrew--plugin-system-beta)
- [v3.5 Elysium — Polish & Self-Hosting](#milestone-6--polish--self-hosting-v10)
- [v4.0 Sigil (The Outlands) — Community & Ecosystem](#milestone-7--community--ecosystem-post-v10)
- [Technical Decisions](#technical-decisions)
- [Out of Scope](#out-of-scope)
- [Contributing](#contributing)

---

## Vision

Most VTTs are either too rigid (D&D Beyond's locked character sheets), too complex (Roll20's overwhelming feature set), or too raw (pure Foundry module hell). Beyond1d1 is for groups that want:

- **Character sheets as programmable spreadsheets** — define your own fields, formulas, and layouts with no code.
- **A clean session table** — initiative, HP, dice, chat — no map required.
- **First-class 5e data** — spells, monsters, items, and rules searchable and linkable anywhere.
- **Complete self-hostability** — one `docker compose up` and it's yours.
- **An open plugin ecosystem** — homebrew rules as JSON, macros as lightweight scripts.

---

## Guiding Principles

1. **Formula over hardcode.** Every derived stat (modifier, save, AC) is a formula the user can inspect and override — never a magic number from hidden server logic.
2. **Data portability.** Every character sheet, campaign, and homebrew pack exports to clean JSON. No lock-in.
3. **Self-host first.** Every feature must work fully on a single-server Docker deployment without cloud dependencies.
4. **5e-tools compatibility.** Where possible, our data format mirrors 5e-tools schema so the community can reuse thousands of existing homebrew entries.
5. **Small team velocity.** Prefer boring technology. Avoid premature abstraction. Ship working vertical slices.

---

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                │
│  Sheet Builder · Compendium · Session Table · DM     │
└────────────────────────┬────────────────────────────┘
                         │ HTTP / WebSocket
┌────────────────────────▼────────────────────────────┐
│              Backend (Next.js API Routes)            │
│  Auth · Sheet Engine · Room Manager · Dice Engine   │
└──────┬──────────────────────────┬───────────────────┘
       │                          │
┌──────▼──────┐          ┌────────▼────────┐
│ PostgreSQL  │          │     Redis        │
│ Campaigns   │          │ Sessions · Cache │
│ Sheets      │          └─────────────────┘
│ Users       │
└─────────────┘
```

---

## Milestone 0 — Foundation ✅

**Goal:** Working monorepo. A logged-in user can create a campaign and open a blank character sheet.  
**Status:** COMPLETE — May 2026  
**Actual versions:** Next.js 16.2.6 · Prisma 5.x · next-auth 5.0.0-beta.31 · Zod v4 · pnpm 11.x · Node 20

### 0.1 — Monorepo & Tooling ✅

- [x] Initialize Next.js 16 (App Router) + TypeScript project
- [x] Configure ESLint and Prettier (`.prettierrc`, `eslint.config.mjs`)
- [x] Set up pnpm workspaces (`pnpm-workspace.yaml` with `allowBuilds` for pnpm v11)
- [x] Configure `tsconfig` path aliases (`@/*`)
- [x] Add GitHub Actions CI (`/.github/workflows`) — lint → type-check → build on every PR
- [ ] Husky pre-commit hooks — deferred to Milestone 0.5
- [ ] Vitest unit tests — deferred to Milestone 0.5
- [ ] Playwright e2e tests — deferred to Milestone 0.5

### 0.2 — Database & ORM ✅

- [x] PostgreSQL + Redis running on **Elide** (ZimaOS, `192.168.1.42`) via Docker Compose
- [x] ZeroTier remote access (`10.194.115.96`) for coding outside home
- [x] Prisma ORM with schema: `User`, `Account`, `Session`, `Campaign`, `CampaignMember`, `Character`, `GameSession`
- [x] User model uses `name` + `image` (NextAuth PrismaAdapter-compatible)
- [x] `prisma db push` applied to Elide successfully
- [x] Prisma client singleton (`lib/prisma.ts`)
- [ ] Seed script — written but not finalized
- [ ] Prisma migrations (using `db push` for now — migrate to `prisma migrate` before beta)

### 0.3 — Authentication ✅

- [x] NextAuth.js v5 (beta.31) with Discord OAuth
- [x] Two-file auth split: `auth.config.ts` (edge-safe) + `auth.ts` (PrismaAdapter + JWT)
- [x] JWT session strategy
- [x] Session callback uses `token.sub` for user ID
- [x] Protected route middleware (`middleware.ts` imports `authConfig`)
- [x] Login page (`/login`) with "Continue with Discord" button
- [ ] Email/password fallback — deferred, Discord-first for now
- [ ] User profile page — deferred to Milestone 1.6
- [ ] Avatar initials fallback: when no Discord image, show filled circle with username initials

### 0.4 — Campaign & Character CRUD 🔄

- [x] `GET/POST /api/campaigns` route
- [x] `GET/POST /api/characters` route
- [x] `GET /api/health` health check endpoint
- [ ] `GET/PUT/DELETE /api/campaigns/[id]`
- [ ] `GET/PUT /api/characters/[id]`
- [ ] Campaign dashboard UI (list, create, delete)
- [ ] Campaign detail page
- [ ] Character creation wizard UI
- [ ] Character list view UI

### 0.5 — Infrastructure Baseline 🔄

- [x] Docker Compose on Elide: `postgres`, `redis`
- [x] Dual `.env` workflow: `.env.local` (home) / `.env.remote` (ZeroTier)
- [x] Health check endpoint (`/api/health`)
- [ ] Zod env validation on startup
- [ ] Error boundary and 404/500 pages
- [ ] Pino structured logging
- [ ] Husky pre-commit hooks

---

## Milestone 0.5 — Design System & Tokens 🔄

**Goal:** Establish a single source of truth for every color, font, spacing value, and component style used in the app. Nothing is ever hardcoded — all values reference design tokens. This milestone must be completed before any feature UI is built.  
**Target:** Week 4 (1 week)

### 0.5.1 — Color Token Index

The app has two token layers: **semantic tokens** (what a color means) over **primitive tokens** (the actual hex value). Only semantic tokens are used in components — never raw hex, never arbitrary Tailwind colors.

- [ ] Create `styles/tokens.css` with full primitive + semantic token layers
- [ ] Four themes: `dark` (default, stone-black + parchment-gold) · `dark-cho` (muted sage greens) · `parchment` (cream + sienna) · `arcane` (indigo-violet)
- [ ] All tokens documented in `TOKENS.md`
- [ ] ESLint rule: no raw hex values in TSX files

### 0.5.2 — Typography Scale

- [ ] Define heading scale: `h1` → `h5` with size, weight, line-height, font family
- [ ] Define body scale: `body-lg`, `body-md`, `body-sm`, `label`, `caption`
- [ ] Define mono scale: `code-sm`, `code-md` (formula cells, dice log)
- [ ] Serif stack: Palatino Linotype → Book Antiqua → Palatino → Georgia
- [ ] All scales in `TOKENS.md`

### 0.5.3 — Spacing & Layout Scale

- [ ] Spacing tokens: `--space-1` through `--space-16` (4px base unit)
- [ ] Border radius tokens: `--radius-sm` through `--radius-full`
- [ ] Shadow tokens: `--shadow-card`, `--shadow-modal`, `--shadow-tooltip`
- [ ] Layout widths: `--width-content` (960px), `--width-narrow` (640px), `--width-wide` (1280px)

### 0.5.4 — Component Primitives

- [ ] `Button` — variants: `primary`, `secondary`, `ghost`, `danger`; sizes: `sm`, `md`, `lg`
- [ ] `Badge` — variants: `status` (active/resting/archived/dead), `class`, `condition`
- [ ] `Card` — base container with surface background, border, border-radius, shadow
- [ ] `Input` / `NumberInput` — text and number inputs with focus ring
- [ ] `Modal` — backdrop, centered panel, close button
- [ ] `Tooltip` — hover text for condition names, formula inspectors, campaign overflow
- [ ] `Separator` — horizontal rule using `--color-border`
- [ ] `HpBar` — colored progress bar using `--color-hp-*` tokens
- [ ] `ContextMenu` — lightweight dropdown menu triggered by a button (used by "more" on character cards)

### 0.5.5 — Theme System

- [ ] `ThemeProvider` in `lib/theme.tsx` using React context
- [ ] `useTheme()` hook — current theme + setter
- [ ] Theme persisted to `localStorage` key `beyond1d1-theme`
- [ ] `data-theme` attribute set on `<html>` — no JS color logic in components
- [ ] `ThemeSwitcher` component renders four labeled buttons
- [ ] `dark-cho` differs from `dark` in exactly 3 tokens: `--color-hp-high`, `--color-status-active-bg`, `--color-status-active-text`

### 0.5.6 — Class Color Registry

- [ ] Class colors live in `lib/class-colors.ts` — runtime registry, not CSS vars
- [ ] `getClassColor(className, override?)` — returns `{ color, label, icon }`, falls back gracefully
- [ ] `registerClassColor(className, entry, allowOverride?)` — called by homebrew importer
- [ ] `BASE_CLASS_COLORS` covers all 12 SRD classes + Artificer + Blood Hunter
- [ ] `ClassBadge` component accepts optional `colorOverride` prop
- [ ] Per-character color stored in `Character.sheetData.classColorOverride` as hex string

### 0.5.7 — Repo Hygiene (do this first)

- [ ] Add to `.gitignore`: `.next/`, `.DS_Store`, `*.tsbuildinfo`
- [ ] Remove already-tracked files: `git rm -r --cached .next .DS_Store tsconfig.tsbuildinfo`
- [ ] Commit: `chore: remove build artifacts from tracking`

---

## Milestone 0.6 — UI/UX Design

**Goal:** Every major screen is wireframed and specced before a single feature component is built.  
**Target:** Weeks 5–6

### 0.6.1 — Visual Direction

- [ ] Define the app's visual identity: dark, tactile, furnished — like a well-worn binder at a game table. Maximalist in weight and texture, not in kitsch. No clip-art scrollwork; yes to typography density, layered panels, ornament that earns its place.
- [ ] Collect 10–15 reference screenshots into `design/references/`
- [ ] Confirm accent color per theme (gold for dark, sienna for parchment, violet for arcane)
- [ ] Design dark theme version of Home screen (parchment mockup exists; dark does not)

### 0.6.2 — Screen Wireframes

- [ ] **Character Roster** (`/characters`) — full-width card grid, search bar, sort controls, size toggle, floating widgets
- [ ] **Character Sheet** (`/characters/[id]`) — section tabs, formula cells, dice log panel
- [ ] **Public Character Profile** (`/c/[slug]`) — read-only view, no auth required
- [ ] **Campaign Dashboard** (`/campaigns`) — campaign cards, session history strip
- [ ] **Session Table** (`/sessions/[id]`) — two-column: initiative+HP left, chat+dice right
- [ ] **DM Screen** (`/sessions/[id]/dm`) — split view: public table + private DM panel
- [ ] **Compendium Browser** — command palette overlay + detail side panel
- [ ] **Login page** (`/login`) — Discord button centered

### 0.6.3 — User Flows

- [ ] **New user flow:** Login → empty roster → create first character → open sheet → fill basics
- [ ] **Session flow:** DM creates session → shares join code → players join → initiative → combat loop → notifications follow players across pages
- [ ] **Away-from-table flow:** User navigates away mid-session → cross-page notification overlay persists → "go back" pill in header → return to table
- [ ] **Import flow:** Click import → upload GSheet → review mapping → confirm → land on roster
- [ ] **Homebrew flow:** Upload JSON pack → validate → enable for campaign → fields appear in sheet
- [ ] **Share flow:** Open character "more" menu → Share externally → generate public URL → share link

### 0.6.4 — Component Layout Specs

For each component primitive from 0.5.4, define exact padding, gap, border-radius, and all states (default / hover / focus / active / disabled / error).

### 0.6.5 — Responsive Strategy

- [ ] Three breakpoints: `sm` (480px) · `md` (768px) · `lg` (1024px+)
- [ ] Character Roster: 1 col mobile → 2 col tablet → 3–4 col desktop
- [ ] Character Sheet: single column stacked (mobile) → two-panel (desktop)
- [ ] Session Table: simplified tracker only (mobile) → full layout (desktop)
- [ ] DM Screen: desktop-only for v1

---

## Milestone 1 — Sheet Engine (Alpha)

**Goal:** Users can build, save, and load a fully functional D&D 5e character sheet with custom formula fields that recalculate reactively.  
**Target:** Weeks 4–9

### 1.1 — Core Formula Evaluator (`packages/engine`)

- [ ] Define `FieldType`: `number | text | formula | derived | diceRoll`
- [ ] Implement variable substitution: longest-first to avoid `STR` matching inside `STR_MOD`
- [ ] Integrate `expr-eval` or custom recursive descent parser supporting:
  - Arithmetic: `+ - * / %`
  - Functions: `floor()`, `ceil()`, `max()`, `min()`, `abs()`
  - Dice: `rollDice(n, sides)`, `advantage()`, `disadvantage()`
  - Conditionals: `if(condition, trueVal, falseVal)`
- [ ] Sandbox evaluation — no access to `window`, `fetch`, `eval`, or globals
- [ ] Dependency graph builder + topological sort (Kahn's algorithm)
- [ ] Circular dependency detection: `"Circular reference: A → B → A"`
- [ ] Full unit test suite (basic arithmetic, modifier formula, cross-field deps, circular ref, unknown variable)

### 1.2 — Default 5e Sheet Schema

- [ ] Define `SheetSchema` type: ordered sections → cells → field definitions
- [ ] Canonical 5e schema JSON: ability scores, core stats, saving throws, skills, combat, resources, personality, equipment
- [ ] Schema versioning: `schemaVersion` field + migration system

### 1.3 — Sheet Builder UI

- [ ] Sheet renderer: iterate schema → render sections and cells
- [ ] Cell components: `NumberCell`, `FormulaCell`, `TextCell`, `CheckboxCell`, `DiceCell`, `ResourceCell`
- [ ] Formula inspector popover: expression, substituted values, result, dependency list
- [ ] Inline edit mode: click formula cell to override with custom expression
- [ ] Dirty state tracking + auto-save (debounced 2s) + manual save with timestamp

### 1.4 — Custom Layout (GSheet-style)

- [ ] Layout editor mode (toggle in sheet header)
- [ ] Drag-and-drop cell reordering within sections (`@dnd-kit/core`)
- [ ] Add custom field dialog: name, type, formula input with live preview, section assignment
- [ ] Delete custom field (confirmation if referenced by other formulas)
- [ ] Save layout to `Character.sheetData.layout`
- [ ] Reset to default 5e schema button

### 1.4B — Character Appearance Settings

**Goal:** Each character can have a custom class color and icon, independent of the global class registry.  
**Where it lives:** Collapsible "Appearance" panel at the top of the sheet builder.

```
┌─────────────────────────────────────────────────────┐
│  Appearance                               [collapse] │
├─────────────────────────────────────────────────────┤
│  Class color                                        │
│  ● Using class default  ○ Custom color              │
│  [🟣 Wizard default — #5c4a8a]                      │
│  Preset swatches (12 class colors + 6 neutral)      │
│  [#] [ 5 c 4 a 8 a ]  ← hex input, live preview    │
│  Preview:  [🔮 Lv 11 Wizard]  ← ClassBadge live    │
│  [Reset to class default]  [Save]                   │
│  Class icon (optional)                              │
│  Current: 🔮   [Change icon]  ← emoji picker        │
└─────────────────────────────────────────────────────┘
```

- [ ] Color mode toggle: "Using class default" vs "Custom color"
- [ ] Preset swatch grid: 12 class colors + 6 neutral options
- [ ] Hex input with live validation + live ClassBadge preview
- [ ] Reset button: clears `sheetData.classColorOverride`
- [ ] Emoji icon picker: categories (Nature, Objects, Symbols, Activities); stored in `sheetData.classIconOverride`
- [ ] Propagation: `CharacterCard`, `ClassBadge`, sheet header, session tracker all read from `getClassColor(cls, override)`

### 1.5 — Dice Roll System (Client-Side)

- [ ] `rollDice(n, sides)` using `crypto.getRandomValues()` for cryptographic fairness
- [ ] Roll result object: `{ expression, rolls[], total, timestamp }`
- [ ] Dice log panel: last 20 rolls, newest at top
- [ ] Roll animation: brief highlight flash on result cell
- [ ] Keyboard shortcut: `R` while focusing a DiceCell

### 1.5B — Quick Dice Widget

**Goal:** A lightweight, always-available dice roller floating over every page. Completely separate from the session dice log — private, not broadcast to the table.

- [ ] Persistent fixed-position panel, bottom-right corner
- [ ] Accepts dice notation input: `/r 1d20+5`, `2d6`, `d100`, etc.
- [ ] Result displays briefly then fades — no log kept
- [ ] Collapse behavior: minimizes to just the header bar ("Quick Dice ▼")
- [ ] Can be toggled off entirely in user settings
- [ ] **5e-tools integration (stretch):** clicking a blue highlighted roll anywhere in the Books/Compendium section fires the result to this widget — mirrors 5e-tools UX
- [ ] Completely separate from Milestone 1.5 Dice Log (no shared state, no broadcast)

### 1.6 — Character Roster Dashboard

**Goal:** The post-login landing page. Every character the user has, displayed as glanceable cards on a full-width grid.

**Route:** `/characters`

#### Card grid

- [ ] Full-width wrapping CSS grid — cards fill the entire viewport width and wrap to new rows
- [ ] **Three card sizes** (Small / Medium / Large) selectable in user settings — exact dimensions TBD
- [ ] **Custom drag-and-drop card ordering** — user can reorder cards freely (mobile home screen model). Uses `@dnd-kit/core`. Order persists to `UserPreferences.characterOrder: string[]` (new field, see schema note below)
- [ ] Toolbar: search bar (filter by name, class, race, campaign) + sort controls (Recent · Level · Name · Custom) + size selector
- [ ] Sort mode "Custom" unlocks drag-and-drop; all other sort modes lock it
- [ ] Dead/retired characters dimmed (65% opacity) but still browsable
- [ ] Empty state: illustrated prompt guiding new users to create their first character
- [ ] Optimistic UI: new characters appear instantly before server confirmation

#### CharacterCard component

Displays per character — **no numeric stats, no HP bars, no ability scores on this screen**:

- [ ] Portrait image (source: `character.portraitUrl` — see 1.6 portrait section below)
- [ ] Character name (supports CJK and mixed-script names)
- [ ] Race
- [ ] Class + level
- [ ] Campaign tag(s): max 2 shown, comma-separated. If more than 2, overflow shown in a **tooltip on hover**
- [ ] **Right-edge class color tab:** solid color strip ~30px wide, full card height. Color from `getClassColor()` registry or `classColorOverride`. Decorative only — settings live in "more" menu. Can be hidden per-character.

#### Card action buttons (three, stacked, pill-shaped)

1. **Open Sheet** → `/characters/[id]`
2. **Go to Campaign:**
   - **Green dot visible** → navigate to active live table for that campaign
   - **No green dot** → open sandbox/mock table (Milestone 3.7)
3. **"more"** → context menu:
   - Delete character (with confirmation)
   - Share externally → generates public URL (see Milestone 1.7)
   - Duplicate character
   - Color tab settings (change color / hide tab)

#### Portrait system

- [ ] `character.portraitUrl` field on `Character` model (add to Prisma schema)
- [ ] Populated from: (1) image URL detected in GSheet import, or (2) manual upload by user
- [ ] Manual upload UI: accessible from character sheet header or "more" menu
- [ ] **Fallback when no portrait:** TBD — options are class icon in class color, character initials in class color, or a silhouette. Needs design decision.
- [ ] For self-hosted instances: store uploaded images on local filesystem (configurable path). Cloud version: S3/R2 (see Milestone 7.3).

#### API

- [ ] `GET /api/characters` — returns all characters owned by the authenticated user across all campaigns, lightweight summary fields only (no full `sheetData` payload)
- [ ] Schema addition: `UserPreferences` table or `User.preferences JSONB` for storing `characterOrder`, card size setting, widget visibility toggles

#### Add New tile

- [ ] Always trails the last character card in the grid
- [ ] Dashed border, large `+` icon, label "Import via GSheet or Create New"
- [ ] On click: dialog with two options — "Build from scratch" (creation wizard) or "Import from Google Sheets" (Milestone 2.5)

---

### 1.7 — Public Character Profiles

**Goal:** Any character can be shared via a public read-only URL. No login required to view. The owner controls visibility.

**Route:** `/c/[slug]` where `slug` is a unique short identifier (e.g., `/c/amanyanzu-champion-fighter`)

#### Data model

- [ ] Add `Character.isPublic: Boolean` (default `false`)
- [ ] Add `Character.publicSlug: String?` (unique, auto-generated when first made public, e.g., `[name-kebab]-[6-char-nanoid]`)
- [ ] Slug is permanent once generated — even if the character is made private again and re-shared, the same slug is reused

#### Public page

- [ ] Publicly accessible without authentication — no login wall
- [ ] Displays: portrait, name, race, class, level, campaign (name only, not linkable)
- [ ] Displays full character sheet in **read-only mode** — all fields visible, no edit controls
- [ ] Formula cells show computed values only (no formula inspector — that's private)
- [ ] Does **not** show: session history, dice log, any user account information
- [ ] Meta tags for link previews (Open Graph): character name, class, portrait image, "View [Name]'s character sheet on Beyond1d1"
- [ ] If character is made private (`isPublic = false`): URL returns a graceful 404-style page ("This character sheet is not publicly shared")

#### Sharing flow

- [ ] "Share externally" in "more" context menu on character card
- [ ] If not yet public: confirmation dialog — "Make this character sheet publicly viewable? Anyone with the link can see it." Toggle to confirm. Generates slug.
- [ ] If already public: shows the URL with a copy-to-clipboard button, and a "Revoke public access" option (sets `isPublic = false`)
- [ ] Owner can toggle public/private at any time from: character card "more" menu, or the Appearance panel in the sheet builder

#### API

- [ ] `POST /api/characters/[id]/share` → sets `isPublic = true`, generates `publicSlug` if not set, returns `{ url }`
- [ ] `DELETE /api/characters/[id]/share` → sets `isPublic = false`
- [ ] `GET /api/public/characters/[slug]` → public endpoint, no auth, returns sanitized character data
- [ ] Rate limit the public endpoint: 30 req/min per IP (lower than authenticated routes)

---

## Milestone 2 — Compendium & Data Layer (Alpha)

**Goal:** Users can search and reference spells, monsters, items, classes, and conditions from 5e-tools data, and insert them into their sheet or session.  
**Target:** Weeks 10–14

### 2.1 — 5e-tools JSON Ingestion

- [ ] Document OGL / Creative Commons licensing boundary in `LEGAL.md` — SRD only ships bundled
- [ ] Ingestion scripts for SRD-safe 5e-tools JSON: spells, bestiary, items, classes, conditions, skills, senses
- [ ] Store in PostgreSQL `CompendiumEntry` table (`type`, `name`, `source`, `data JSONB`) — or serve as static JSON from `/public/data/` (simpler, self-host friendly)
- [ ] MiniSearch client-side index over name + tags + type

### 2.2 — Compendium Browser UI

- [ ] Global search bar (`Ctrl+K` / `Cmd+K`) — command palette overlay
- [ ] Filter sidebar: type, source, level/CR, school
- [ ] Instant search results with keyboard navigation
- [ ] Entry detail panel: spells, monsters, items, classes
- [ ] "Add to sheet" button: inject spell slot resource or class feature field
- [ ] "Pin to session" button: add monster/NPC to initiative tracker (unlocked in Milestone 3)

### 2.3 — Rulebook Viewer

- [ ] Render 5e-tools JSON book entries as formatted HTML
- [ ] Internal cross-links: `{@spell Fireball}`, `{@condition Prone}`, `{@creature Goblin}`
- [ ] Table of contents sidebar with scroll-sync
- [ ] User-supplied book import: drag-and-drop `.json`, validate, store privately
- [ ] Bookmark system: save entries per character or campaign
- [ ] **Quick Dice integration:** clicking a blue highlighted roll in any rulebook entry fires the result to the Quick Dice Widget (Milestone 1.5B)

### 2.4 — Spell & Ability Cards

- [ ] `SpellCard` component: compact inline card in spell list section
- [ ] Click to expand full compendium entry
- [ ] "Prepared" checkbox state persisted to character sheet
- [ ] Quick-cast button: rolls spell attack or prompts save DC

---

## Milestone 2.5 — Google Sheets Import

**Goal:** Users can import an existing D&D character sheet built in Google Sheets into Beyond1d1, with a confidence-scored field mapping UI and three-tier error handling that never silently drops data.  
**Target:** Weeks 18–21 (runs parallel to late Milestone 3 work)

### 2.5.1 — File Ingestion

- [ ] Accept `.xlsx` and `.csv` exports from Google Sheets (no OAuth required)
- [ ] Drag-and-drop upload on the `+ New Character` dialog
- [ ] Parse `.xlsx` with SheetJS, `.csv` with papaparse
- [ ] Flatten all cells into `RawCell[]`: `{ address, value, rawValue, neighbors[] }`
- [ ] Detect sheet with most D&D-like content when workbook has multiple tabs
- [ ] Detect `image_url` field and store to `character.portraitUrl`

### 2.5.2 — Field Detection Engine

- [ ] Label–value proximity scanner
- [ ] Canonical label dictionary (fuzzy matching, case-insensitive, abbreviations)
- [ ] Confidence scoring: `high` / `medium` / `low` per field
- [ ] Formula cell detection: flag `formula_origin`, attempt reverse-engineering to Beyond1d1 syntax

### 2.5.3 — Three-Tier Error Handling

- [ ] **Tier 1 — Parse errors:** empty file, corrupt XLSX, zero cells — blocking error screen with retry
- [ ] **Tier 2 — Mapping warnings:** type mismatch, out-of-range values, duplicate matches — `needs_review` flag, import continues
- [ ] **Tier 3 — Coverage check:** if < 50% of core fields found, prominent warning + "Not imported" list

```typescript
type ImportResult = {
  status: 'success' | 'partial' | 'failed'
  coverage: number // 0–1
  mapped: MappedField[] // high/medium confidence
  warnings: ImportWarning[]
  missing: string[]
  skipped: RawCell[]
}
```

### 2.5.4 — Mapping Confirmation UI

- [ ] Three-column confirmation screen: Mapped (green) / Needs review (yellow) / Not found (gray)
- [ ] Inline edit: any mapped field overridable before finalizing
- [ ] Coverage progress bar
- [ ] "Import anyway" vs "Go back" — never force completion

### 2.5.5 — Post-Import Experience

- [ ] Newly imported character appears on roster immediately with "Imported" badge
- [ ] ⚠️ badge on card if `needs_review` fields exist
- [ ] "Finish setup" prompt in sheet builder highlighting unresolved fields
- [ ] Re-import flow: diff of changed fields, user picks which changes to accept
- [ ] Import history log: `CharacterImport` table `{ characterId, importedAt, source, coverage, warnings[] }`

---

## Milestone 3 — Session Table (Alpha)

**Goal:** A DM can start a live session; all players join and share a real-time game table with initiative, HP tracking, dice, and chat.  
**Target:** Weeks 15–21

### 3.1 — Real-Time Infrastructure

- [ ] Socket.io on Next.js server (custom server or separate Express process)
- [ ] One Socket.io room per `sessionId`
- [ ] Event schema (Zod-typed): `session:join` / `session:leave` / `initiative:update` / `hp:change` / `dice:roll` / `chat:message` / `condition:add` / `condition:remove` / `resource:update`
- [ ] Redis adapter for Socket.io (horizontal scale)
- [ ] Reconnection: client re-subscribes and receives full state snapshot
- [ ] Presence: online/offline status per player
- [ ] **Socket client lives at the layout level** (not page level) so it survives navigation and powers cross-page notifications (Milestone 3.8)

### 3.2 — Session Management

- [ ] DM creates session: generates a short join code (e.g., `WOLF-7`)
- [ ] Players join via code or direct link
- [ ] Session state machine: `lobby → active → paused → ended`
- [ ] Persistent session log: all events stored to `SessionEvent` table for replay
- [ ] Session settings: display name, allow late joins, hide DM rolls
- [ ] **"Leave the table" explicit action:** distinct from closing the browser tab. Removes campaign pill from header, stops cross-page notifications, closes socket room subscription. Confirmation dialog before leaving mid-session.
- [ ] **Navigation-without-leaving:** if user navigates to another page while in a session without leaving, the socket connection stays alive and the campaign pill + cross-page notifications remain active.

### 3.3 — Initiative Tracker

- [ ] Add combatant dialog: campaign characters or quick NPC
- [ ] Auto-roll initiative: `rollDice(1,20) + DEX_MOD`
- [ ] Manual initiative override
- [ ] Turn order list: sorted, active combatant highlighted
- [ ] "Next turn" button, round counter, drag-to-reorder (DM only)
- [ ] Remove combatant (with confirmation)
- [ ] All changes broadcast in real time

### 3.4 — HP & Condition Tracking

- [ ] HP display per combatant: current / max, color-coded
- [ ] HP adjustment: `+/−` buttons + direct input
- [ ] Temp HP field
- [ ] Death save tracker: 3 success / 3 fail pips
- [ ] Condition chips from SRD list with tooltips
- [ ] All HP/condition changes logged to session event stream

### 3.5 — Shared Dice Log & Chat

- [ ] Combined log panel: dice rolls + chat, newest at bottom
- [ ] Player rolls from character sheet appear in shared log
- [ ] `/roll 1d20+5` chat command
- [ ] Secret rolls (DM only, `[secret]` in DM view)
- [ ] Whisper: `/w PlayerName message`
- [ ] System messages: turn changes, combatant added/removed, state changes
- [ ] Log export: Markdown or JSON

### 3.6 — Player Character Panel

- [ ] Each player sees their own character's HP, conditions, resources in a side panel
- [ ] HP changes from tracker reflect immediately
- [ ] Resource tracking: spend/restore spell slots, class abilities
- [ ] Quick-roll buttons: attack, save, skill check

### 3.7 — Sandbox / Mock Table Mode

**Goal:** Let players experience the full Play Table UI solo — for testing rolls, sheet macros, and layouts — without creating a real session.

- [ ] Triggered by clicking "Go to Campaign" when no active session (no green dot on card)
- [ ] Identical UI to the real Play Table (`/sessions/[id]`)
- [ ] No Socket.io room created — all state is local (React state only, nothing persisted to DB)
- [ ] No other players visible — solo environment
- [ ] Dice rolls work fully via `rollDice()` — results appear in local dice log only
- [ ] Banner at the top: "Sandbox mode — rolls and changes are not saved" to make the distinction clear
- [ ] Exiting sandbox does not trigger "leave session" confirmation dialog

### 3.8 — Cross-Page Session Notifications

**Goal:** Session activity follows the user across every page in the app — like macOS notification banners — so players can step away from the table screen without losing awareness.

- [ ] Notification overlay: fixed-position, top-right or corner of screen (TBD design)
- [ ] Appears for: dice rolls, chat messages, attacks — any player in the session
- [ ] Auto-dismisses after ~3 seconds (configurable in user settings: 1s / 3s / 5s / manual dismiss only)
- [ ] Each notification shows:
  - Campaign abbreviation label tab (e.g., "AOD :")
  - Acting character's portrait thumbnail
  - Action text (bold): e.g., "Nightingale attacks with a Songbird!"
  - Roll breakdown: To Hit, Damage
  - Effect text: ability/weapon description
  - ✕ close button for manual dismiss
- [ ] Multiple notifications queue — one visible at a time, next appears after current fades
- [ ] User can configure in settings: disable entirely / event types (dice / chat / all) / duration
- [ ] Active on ALL pages including the table itself — persistent until user explicitly leaves the session
- [ ] Requires socket client at layout level (see Milestone 3.1)

### 3.9 — Spectator Mode

**Goal:** A user can join and watch a session without having an active character — DMs sharing their screen, players waiting to join, observers.

- [ ] Session role enum extended: `player | dm | spectator`
- [ ] Spectators can: view the full table, read the dice log and chat, see HP/conditions
- [ ] Spectators cannot: roll dice, take turns, send chat messages (read-only)
- [ ] Spectator joins via the same join code as players — DM can assign spectator role or it can be self-selected at join time
- [ ] Cross-page notification overlay (Milestone 3.8) also appears for spectators
- [ ] Campaign pill appears in header for spectators while watching

---

## Milestone 4 — DM Tools (Beta)

**Goal:** A complete digital DM screen with NPC management, secret notes, and encounter builder.  
**Target:** Weeks 22–27

### 4.1 — DM Screen

- [ ] Split-view layout: public session table (left) + private DM panel (right)
- [ ] DM panel tabs: NPCs · Notes · Encounter · Loot
- [ ] DM panel persists between sessions

### 4.2 — NPC & Monster Quick-Reference

- [ ] Add monster from compendium to DM NPC list
- [ ] NPC stat block rendered inline
- [ ] Quick-roll from stat block (DM-only, secret log)
- [ ] Multiple instances with individual HP tracking
- [ ] "Send to tracker" button

### 4.3 — Session Notes

- [ ] Rich text editor (Tiptap or ProseMirror) per campaign
- [ ] Notes private to DM by default; "Share with players" toggle
- [ ] Tag system: `#lore`, `#quest`, `#npc`, `#location`
- [ ] Note search by title + tag
- [ ] Link notes to compendium entries: `[[Goblin King]]`

### 4.4 — Encounter Builder

- [ ] Drag monsters from compendium into encounter builder
- [ ] XP budget calculator: easy / medium / hard / deadly thresholds
- [ ] Adjusted XP multiplier by monster count
- [ ] "Launch encounter" → sends to tracker, starts session if not active

### 4.5 — Loot Generator

- [ ] Individual treasure tables (no magic items by default)
- [ ] Loot result as shared session log message
- [ ] "Award to party" button

---

## Milestone 5 — Homebrew & Plugin System (Beta)

**Goal:** Users can write homebrew rules, custom classes, spells, and monsters using a 5e-tools–compatible JSON schema, and share them with their campaign.  
**Target:** Weeks 28–35

### 5.1 — Homebrew JSON Format

- [ ] Adopt 5e-tools homebrew schema as base
- [ ] Support: custom spells, monsters, items, classes/subclasses, backgrounds, feats, rules
- [ ] JSON Schema (Draft 7) validation with detailed error messages
- [ ] `HOMEBREW.md` guide with annotated examples

### 5.2 — Homebrew Import & Management

- [ ] Upload UI: drag-and-drop or paste JSON
- [ ] Validation feedback: green checkmark or inline error list
- [ ] Homebrew library per user; enable/disable per campaign
- [ ] Pack detail page; export as JSON

### 5.3 — Custom Sheet Schema Plugins

- [ ] Plugin type: `sheetExtension` — adds new fields/sections to any character sheet
- [ ] Plugin field types: number, formula, resource, list, enum
- [ ] Conflict detection for field name clashes

### 5.4 — Macro System

- [ ] Macro definition: `{ "name": "Sneak Attack", "steps": ["rollDice(1,20)+DEX_MOD+PROF", "rollDice(SNEAK_DICE, 6)"] }`
- [ ] Triggers: button in sheet cell, `/macro SnakeAttack` chat command, keyboard shortcut
- [ ] Result logged to session dice log with step breakdown
- [ ] Macro library per character; importable from homebrew packs
- [ ] Macro editor: CodeMirror with formula syntax highlighting + live preview

---

## Milestone 6 — Polish & Self-Hosting (v1.0)

**Goal:** Production-quality UX, complete self-hosting documentation, performance, accessibility, security hardening.  
**Target:** Weeks 36–44

### 6.1 — Self-Hosting

- [ ] Production `docker-compose.yml`: web, postgres, redis, nginx
- [ ] One-command setup: `docker compose up -d`
- [ ] `SELF_HOSTING.md`: DigitalOcean Droplet / Raspberry Pi / VPS / Coolify / Dokku / Render
- [ ] Environment variable reference
- [ ] SMTP configuration for email invites and password reset
- [ ] Optional: Cloudflare Tunnel support
- [ ] Data backup guide + upgrade guide

### 6.2 — Performance

- [ ] Next.js bundle analysis: target < 150KB first-load JS
- [ ] Compendium search: MiniSearch client-side, no server round-trips
- [ ] Sheet render: `React.memo` + `useMemo` on formula evaluation
- [ ] WebSocket event batching: debounce rapid HP changes
- [ ] Database indexes on `Character.campaignId`, `Session.campaignId`, `CompendiumEntry.type`
- [ ] Lighthouse CI: ≥ 90 performance, ≥ 95 accessibility

### 6.3 — Accessibility

- [ ] Full keyboard navigation
- [ ] ARIA labels on all icon-only buttons
- [ ] Screen reader testing (NVDA + VoiceOver)
- [ ] WCAG AA color contrast
- [ ] `prefers-reduced-motion` support
- [ ] Skip-to-content link

### 6.4 — Security Hardening

- [ ] Formula sandbox audit: no path to `window`, `document`, `fetch`, `eval`
- [ ] CSRF protection on all mutating routes
- [ ] Rate limiting: 60 req/min per IP (Redis-based); 30 req/min for public character endpoints
- [ ] Zod validation on all API request bodies
- [ ] Content Security Policy headers
- [ ] `pnpm audit` in CI + Dependabot
- [ ] OWASP Top 10 self-audit

### 6.5 — UX Polish

- [ ] Onboarding flow: empty states with guided prompts
- [ ] Keyboard shortcut reference modal (`?` key)
- [ ] Toast notification system (save confirmations, errors, session events)
- [ ] Dark mode toggle persisted to user profile
- [ ] Mobile responsiveness: sheet builder and session table on tablet
- [ ] Print stylesheet: character sheet on A4/Letter
- [ ] Offline indicator: warning when WebSocket disconnects
- [ ] Session notification settings: duration, event types, enable/disable (from Milestone 3.8)

### 6.6 — Testing & Documentation

- [ ] Unit test coverage ≥ 80% on `packages/engine`
- [ ] Integration tests: API routes for CRUD, auth flows
- [ ] e2e tests (Playwright): create character → fill sheet → start session → roll dice → track HP → share character publicly
- [ ] `CONTRIBUTING.md`: local setup, PR guidelines, commit convention
- [ ] `ARCHITECTURE.md`: system diagram, key decisions, rationale
- [ ] JSDoc / TSDoc on all public engine functions
- [ ] Storybook for UI component library (optional)

---

## Milestone 7 — Community & Ecosystem (Post-v1.0)

**Goal:** Build an open ecosystem of shared homebrew, sheet templates, and optional cloud features.  
**Target:** Ongoing after v1.0

### 7.1 — Homebrew Registry

- [ ] Public homebrew index: separate GitHub repo (`beyond1d1-homebrew`) with curated packs
- [ ] In-app "Browse homebrew" panel: fetches index, one-click install
- [ ] Submission process: PR with CI validation; author attribution + versioning

### 7.2 — Sheet Template Library

- [ ] Export sheet layout as shareable template (strips values, keeps schema + layout)
- [ ] Built-in templates: standard 5e, Starter Set simplified, Spellcaster-focused, Martial-focused
- [ ] Community sharing via GitHub Gist or the homebrew registry

### 7.3 — Optional Cloud Features (hosted version only)

- [ ] Campaign sharing links: invite by email or Discord username
- [ ] Avatar + portrait image upload (to S3/R2) — consolidates portrait storage from Milestone 1.6
- [ ] Campaign history timeline: session log browsable per-session
- [ ] AI DM assistant (stretch): "summarize last session," "generate an encounter for level 5 party"

### 7.4 — System Expansion

- [ ] System-agnostic mode: sheet engine works with any RPG system
- [ ] Community-maintained schema packs: Pathfinder 2e / Call of Cthulhu 7e / Blades in the Dark / Shadowrun 6e
- [ ] Multi-system campaign: mix characters of different systems

---

## Technical Decisions

| Decision        | Choice                      | Rationale                                                                                                        |
| --------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Framework       | Next.js 16 (App Router)     | SSR for compendium SEO, React for reactive sheet UI, API routes avoid a separate server                          |
| Language        | TypeScript (strict)         | Shared types between engine, API, and frontend catch bugs at compile time                                        |
| ORM             | Prisma                      | Type-safe queries, excellent migration tooling, works well with PostgreSQL JSONB                                 |
| Real-time       | Socket.io                   | Battle-tested, rooms + namespaces match session model; client lives at layout level for cross-page notifications |
| Formula eval    | Custom parser + `expr-eval` | Sandboxed, extendable with D&D primitives, no `eval()` in production                                             |
| Auth            | NextAuth.js v5              | Discord OAuth is one config block; JWT is stateless and self-host friendly                                       |
| Styling         | Tailwind CSS + shadcn/ui    | shadcn gives accessible headless components; Tailwind keeps bundle lean                                          |
| Search          | MiniSearch                  | Runs client-side, zero server round-trips, < 10KB                                                                |
| Testing         | Vitest + Playwright         | Vitest is fast and native ESM; Playwright is the best e2e tool for Next.js                                       |
| GSheet import   | SheetJS + papaparse         | SheetJS parses XLSX with formula cell detection; papaparse handles CSV. No Google OAuth needed.                  |
| Deployment      | Docker Compose              | Single-command self-hosting; no Kubernetes complexity                                                            |
| Drag-and-drop   | @dnd-kit/core               | Already a dependency for sheet layout editor; reused for roster card ordering                                    |
| Slug generation | nanoid                      | Short, URL-safe unique IDs for public character profile URLs                                                     |

---

## Out of Scope

- **Battle maps and tokens** — use Owlbear Rodeo, Foundry, or Roll20 alongside this tool
- **Voice/video chat** — use Discord
- **Mobile native apps** — responsive web is sufficient
- **Automated rule enforcement** — the engine provides formulas, not a rules lawyer; DM adjudicates
- **Monetization** — MIT-licensed and free forever

---

## Contributing

1. Check [open issues](../../issues) — your idea may already be tracked
2. For new features, open a discussion issue first
3. Read `CONTRIBUTING.md` for local setup and commit conventions (If it exsist.)
4. All engine code must have unit tests; all UI components a Storybook story (post-v1.0)

**Good first issues** are labeled [`good first issue`](../../labels/good%20first%20issue) — typically self-contained tasks in the formula engine or UI component layer.

---

_Last updated: May 2026 — Added release timeline. Added Milestones 1.5B (Quick Dice Widget), 1.7 (Public Character Profiles), 3.7 (Sandbox Mode), 3.8 (Cross-Page Notifications), 3.9 (Spectator Mode). Updated 1.6 (Character Roster) with full spec from Home UI mockup: card size settings, drag-and-drop ordering, portrait system, "more" context menu, campaign tag overflow tooltip. Updated 3.1 (socket at layout level). Updated 3.2 (leave-table vs navigate-away distinction). Fixed project name OpenVTT → Beyond1d1 throughout. Roadmap is a living document._
