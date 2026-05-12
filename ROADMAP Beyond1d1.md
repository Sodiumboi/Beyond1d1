# 🎲 OpenVTT — Project Roadmap

> A free, open-source, map-free virtual tabletop that combines the customizability of Google Sheets character building, the convenience of D&D Beyond, and the live-play experience of Roll20 — powered by 5e-tools data.

**Status:** Alpha — Milestone 0 complete, Milestone 0.5 (Design System) in progress  
**License:** MIT  
**Stack:** Next.js · TypeScript · PostgreSQL · Redis · Socket.io · Tailwind CSS

---

## Table of Contents

- [Vision](#vision)
- [Guiding Principles](#guiding-principles)
- [System Overview](#system-overview)
- [Milestone 0 — Foundation](#milestone-0--foundation-pre-alpha) ✅
- [Milestone 0.5 — Design System & Tokens](#milestone-05--design-system--tokens)
- [Milestone 0.6 — UI/UX Design](#milestone-06--uiux-design)
- [Milestone 1 — Sheet Engine](#milestone-1--sheet-engine-alpha)
  - [1.6 — Character Roster Dashboard](#16--character-roster-dashboard)
- [Milestone 2 — Compendium](#milestone-2--compendium--data-layer-alpha)
- [Milestone 2.5 — GSheet Import](#milestone-25--google-sheets-import)
- [Milestone 3 — Session Table](#milestone-3--session-table-alpha)
- [Milestone 4 — DM Tools](#milestone-4--dm-tools-beta)
- [Milestone 5 — Homebrew & Plugins](#milestone-5--homebrew--plugin-system-beta)
- [Milestone 6 — Polish & Self-Hosting](#milestone-6--polish--self-hosting-v10)
- [Milestone 7 — Community & Ecosystem](#milestone-7--community--ecosystem-post-v10)
- [Technical Decisions](#technical-decisions)
- [Out of Scope](#out-of-scope)
- [Contributing](#contributing)

---

## Vision

Most VTTs are either too rigid (D&D Beyond's locked character sheets), too complex (Roll20's overwhelming feature set), or too raw (pure Foundry module hell). OpenVTT is for groups that want:

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

## Milestone 0 — Foundation (Pre-Alpha) ✅

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
- [x] User model uses `name` + `image` (NextAuth PrismaAdapter-compatible, not `displayName`/`avatarUrl`)
- [x] `prisma db push` applied to Elide successfully
- [x] Prisma client singleton (`lib/prisma.ts`)
- [ ] Seed script — written but not finalized
- [ ] Prisma migrations (using `db push` for now — migrate to `prisma migrate` before beta)

### 0.3 — Authentication ✅

- [x] NextAuth.js v5 (beta.31) with Discord OAuth
- [x] Two-file auth split: `auth.config.ts` (edge-safe) + `auth.ts` (PrismaAdapter + JWT)
- [x] JWT session strategy (`session: { strategy: 'jwt' }`)
- [x] Session callback uses `token.sub` for user ID (JWT-compatible)
- [x] Protected route middleware (`middleware.ts` imports `authConfig`, not `auth`)
- [x] Login page (`/login`) with "Continue with Discord" button
- [ ] Email/password fallback — deferred, Discord-first for now
- [ ] User profile page — deferred to Milestone 1.6 (Character Dashboard)

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
- [ ] `.next/` and `.DS_Store` removed from git tracking ⚠️

> ⚠️ **Repo hygiene needed:** `.next/` and `.DS_Store` are currently committed. Add them to `.gitignore` and run `git rm -r --cached .next .DS_Store` then commit.

---

## Milestone 0.5 — Design System & Tokens

**Goal:** Establish a single source of truth for every color, font, spacing value, and component style used in the app. Nothing is ever hardcoded — all values reference design tokens. This milestone must be completed before any feature UI is built.  
**Target:** Week 4 (1 week)

### 0.5.1 — Color Token Index

The app has two token layers: **semantic tokens** (what a color means) over **primitive tokens** (the actual hex value). Only semantic tokens are used in components — never raw hex, never arbitrary Tailwind colors.

- [ ] Create `styles/tokens.css` with CSS custom properties:

```css
/* styles/tokens.css */

/* ── Primitive palette (never use these directly in components) ── */
--primitive-stone-950: #0c0a09;
--primitive-stone-900: #1c1917;
--primitive-stone-800: #292524;
--primitive-stone-100: #f5f5f4;
--primitive-indigo-500: #6366f1;
--primitive-indigo-600: #4f46e5;
--primitive-red-500: #ef4444;
--primitive-amber-500: #f59e0b;
--primitive-green-600: #16a34a;

/* ── Class identity colors (one per class, used on cards/badges) ── */
--class-ranger: #4a7c59;
--class-wizard: #5c4a8a;
--class-fighter: #8a4a2a;
--class-rogue: #2a4a5c;
--class-cleric: #7a6a2a;
--class-barbarian: #8a2a2a;
--class-bard: #7a2a6a;
--class-paladin: #6a5a2a;
--class-druid: #3a6a2a;
--class-monk: #2a6a6a;
--class-warlock: #4a2a6a;
--class-sorcerer: #6a2a4a;

/* ── Semantic tokens — light mode ── */
--color-bg-base: var(--primitive-stone-950);
--color-bg-surface: var(--primitive-stone-900);
--color-bg-elevated: var(--primitive-stone-800);
--color-text-primary: var(--primitive-stone-100);
--color-text-secondary: #a8a29e;
--color-text-muted: #57534e;
--color-border: #292524;
--color-border-subtle: #1c1917;
--color-accent: var(--primitive-indigo-500);
--color-accent-hover: var(--primitive-indigo-600);

/* ── HP / status colors ── */
--color-hp-high: var(--primitive-green-600);
--color-hp-mid: var(--primitive-amber-500);
--color-hp-low: var(--primitive-red-500);
--color-hp-dead: #57534e;

/* ── Condition badge colors ── */
--color-condition-bg: #451a03;
--color-condition-text: #fed7aa;
```

- [ ] Extend `tailwind.config.ts` to expose tokens as Tailwind utilities:

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      surface: 'var(--color-bg-surface)',
      elevated: 'var(--color-bg-elevated)',
      accent: 'var(--color-accent)',
      'hp-high': 'var(--color-hp-high)',
      'hp-mid': 'var(--color-hp-mid)',
      'hp-low': 'var(--color-hp-low)',
    },
    fontFamily: {
      serif: ['"Palatino Linotype"', '"Book Antiqua"', 'Palatino', 'serif'],
      sans:  ['"Segoe UI"', 'system-ui', 'sans-serif'],
      mono:  ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
    },
  },
}
```

- [ ] Rule enforced in ESLint: no raw hex values in TSX files (optional `eslint-plugin-no-hardcoded-colors`)
- [ ] `TOKENS.md` — one-page reference listing every token name, its value, and where it's used

### 0.5.2 — Typography Scale

- [ ] Define heading scale: `h1` → `h5` with size, weight, line-height, and font family
- [ ] Define body scale: `body-lg`, `body-md`, `body-sm`, `label`, `caption`
- [ ] Define mono scale: `code-sm`, `code-md` (used in formula cells and dice log)
- [ ] All scales documented in `TOKENS.md`

### 0.5.3 — Spacing & Layout Scale

- [ ] Define spacing tokens: `--space-1` through `--space-16` (4px base unit)
- [ ] Define border radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- [ ] Define shadow tokens: `--shadow-card`, `--shadow-modal`, `--shadow-dropdown`
- [ ] Max content widths: `--width-content` (960px), `--width-narrow` (640px)

### 0.5.4 — Component Primitives

Build these headless, unstyled-first, then skin with tokens. No feature logic — pure visual building blocks.

- [ ] `Button` — variants: `primary`, `secondary`, `ghost`, `danger`; sizes: `sm`, `md`, `lg`
- [ ] `Badge` — variants: `status` (active/resting/dead), `class`, `condition`
- [ ] `Card` — base container with surface background, border, border-radius, shadow
- [ ] `Input` / `NumberInput` — text and number inputs with focus ring using `--color-accent`
- [ ] `Modal` — backdrop, centered panel, close button
- [ ] `Tooltip` — hover text for condition names, formula inspectors
- [ ] `Separator` — horizontal rule using `--color-border`
- [ ] `HpBar` — colored progress bar using `--color-hp-*` tokens

### 0.5.5 — Theme System

- [ ] Four themes implemented: `dark` (default) · `dark-cho` (Cho's muted sage edition) · `parchment` · `arcane`
- [ ] `dark-cho` differs from `dark` in exactly 3 tokens: `--color-hp-high`, `--color-status-active-bg`, `--color-status-active-text`
- [ ] `ThemeProvider` in `lib/theme.tsx` using React context
- [ ] `useTheme()` hook — current theme + setter
- [ ] Theme persisted to `localStorage` key `beyond1d1-theme`
- [ ] `data-theme` attribute set on `<html>` — no JS color logic in components
- [ ] `ThemeSwitcher` component renders four labeled buttons

### 0.5.6 — Class Color Registry

- [ ] Class colors moved out of CSS into `lib/class-colors.ts` — runtime registry, not static CSS vars
- [ ] `getClassColor(className, override?)` — returns `{ color, label, icon }`, falls back gracefully
- [ ] `registerClassColor(className, entry, allowOverride?)` — called by homebrew pack importer
- [ ] `BASE_CLASS_COLORS` covers all 12 SRD classes + Artificer + Blood Hunter
- [ ] `ClassBadge` component accepts optional `colorOverride` prop (from `sheetData.classColorOverride`)
- [ ] Per-character color stored in `Character.sheetData.classColorOverride` as hex string

### 0.5.7 — Repo Hygiene (do this first)

- [ ] Add to `.gitignore`: `.next/`, `.DS_Store`, `*.tsbuildinfo`
- [ ] Remove already-tracked files: `git rm -r --cached .next .DS_Store tsconfig.tsbuildinfo`
- [ ] Commit: `chore: remove build artifacts from tracking`

---

## Milestone 0.6 — UI/UX Design

**Goal:** Every major screen is wireframed and specced before a single feature component is built. Design decisions are made once — not rediscovered during implementation.  
**Target:** Weeks 5–6 (1–2 weeks)

### 0.6.1 — Visual Direction

- [ ] Define the app's visual identity in a one-page brief:
  - **Mood:** Dark, focused, tactile — like a well-worn notebook at a game table
  - **Influences:** D&D Beyond (clarity), Linear (speed), Notion (flexible structure)
  - **Not:** Fantasy maximalism — no dragons on every button, no parchment textures everywhere
- [ ] Collect 10–15 reference screenshots into a `design/references/` folder
- [ ] Decide on one accent color for interactive elements (default: indigo `#6366f1`)

### 0.6.2 — Screen Wireframes

One wireframe per major screen. Can be done in Figma, Excalidraw, or even paper photos.

- [ ] **Character Roster** (`/characters`) — card grid, search/filter bar, `+ New` button
- [ ] **Character Sheet** (`/characters/[id]`) — section tabs, formula cells, dice log panel
- [ ] **Campaign Dashboard** (`/campaigns`) — campaign cards, session history strip
- [ ] **Session Table** (`/sessions/[id]`) — initiative tracker, HP column, dice/chat log
- [ ] **DM Screen** (`/sessions/[id]/dm`) — split view: public table + private DM panel
- [ ] **Compendium Browser** — command palette overlay + detail side panel
- [ ] **Login page** (`/login`) — minimal, Discord button centered

### 0.6.3 — User Flows

- [ ] **New user flow:** Login → empty roster → create first character → open sheet → fill basics
- [ ] **Session flow:** DM creates session → shares join code → players join → initiative → combat loop
- [ ] **Import flow:** Click import → upload GSheet → review mapping → confirm → land on roster
- [ ] **Homebrew flow:** Upload JSON pack → validate → enable for campaign → fields appear in sheet

### 0.6.4 — Component Layout Specs

For each component primitive from Milestone 0.5.4, define:

- [ ] Exact padding, gap, and border-radius values (referencing spacing tokens)
- [ ] All states: default, hover, focus, active, disabled, error
- [ ] Mobile vs desktop variant if different

### 0.6.5 — Responsive Strategy

- [ ] Define three breakpoints: `sm` (480px mobile), `md` (768px tablet), `lg` (1024px+ desktop)
- [ ] Character Roster: 1 col (mobile) → 2 col (tablet) → 3–4 col (desktop)
- [ ] Character Sheet: single column stacked (mobile) → two-panel (desktop)
- [ ] Session Table: simplified tracker only (mobile) → full layout (desktop)
- [ ] DM Screen: desktop-only for v1 (too complex for mobile)

---

**Goal:** Users can build, save, and load a fully functional D&D 5e character sheet with custom formula fields that recalculate reactively.  
**Target:** Weeks 4–9

### 1.1 — Core Formula Evaluator (`packages/engine`)

- [ ] Define `FieldType`: `number | text | formula | derived | diceRoll`
- [ ] Implement variable substitution: replace field names (longest-first to avoid `STR` matching inside `STR_MOD`)
- [ ] Integrate `expr-eval` or build custom recursive descent parser supporting:
  - Arithmetic: `+ - * / %`
  - Functions: `floor()`, `ceil()`, `max()`, `min()`, `abs()`
  - Dice: `rollDice(n, sides)`, `advantage()`, `disadvantage()`
  - Conditionals: `if(condition, trueVal, falseVal)`
- [ ] Sandbox evaluation — no access to `window`, `fetch`, `eval`, or globals
- [ ] Dependency graph builder: parse formula strings to extract referenced field names
- [ ] Topological sort (Kahn's algorithm) for evaluation order
- [ ] Circular dependency detection with clear error: `"Circular reference: A → B → A"`
- [ ] Full unit test suite for the evaluator:
  - Basic arithmetic
  - Modifier formula: `floor((STR-10)/2)`
  - Cross-field deps: `ATK = STR_MOD + PROF`
  - Circular reference throws
  - Unknown variable throws

### 1.2 — Default 5e Sheet Schema

- [ ] Define `SheetSchema` type: ordered list of sections → cells → field definitions
- [ ] Build the canonical 5e sheet schema as a JSON file:
  - **Ability scores:** STR, DEX, CON, INT, WIS, CHA (raw + auto-computed modifier)
  - **Core stats:** AC, Initiative, Speed, Max HP, Current HP, Temp HP, Hit Dice
  - **Saving throws:** all 6 (formula: `mod + (proficient ? PROF : 0)`)
  - **Skills:** all 18 (formula-driven, proficiency checkbox)
  - **Combat:** Attack bonus, damage formula, spell save DC, spell attack bonus
  - **Resources:** Spell slots (per level), class features with uses/max
  - **Personality:** Traits, ideals, bonds, flaws (freeform text)
  - **Equipment:** Inventory list with weight, value, quantity
- [ ] Schema versioning: `schemaVersion` field + migration system for breaking changes

### 1.3 — Sheet Builder UI

- [ ] Sheet renderer: iterate schema → render sections and cells
- [ ] Cell components:
  - `NumberCell` — editable integer with increment/decrement buttons
  - `FormulaCell` — displays computed value; click to inspect formula
  - `TextCell` — multiline freeform text
  - `CheckboxCell` — proficiency, concentration, etc.
  - `DiceCell` — formula with a "roll" button that logs to the dice log
  - `ResourceCell` — uses / max with pip display
- [ ] Formula inspector popover: shows expression, substituted values, result, dependency list
- [ ] Inline edit mode: click any formula cell to override with a custom expression
- [ ] Dirty state tracking: unsaved indicator in nav
- [ ] Auto-save: debounced 2s after last change, `PATCH /api/characters/[id]`
- [ ] Manual save button with last-saved timestamp

### 1.4 — Custom Layout (GSheet-style)

- [ ] Layout editor mode (toggle in sheet header)
- [ ] Drag-and-drop cell reordering within a section (using `@dnd-kit/core`)
- [ ] Add custom field dialog:
  - Field name (auto-uppercased, validated for uniqueness)
  - Type selector: number / formula / text / resource
  - Formula input with live preview
  - Label and section assignment
- [ ] Delete custom field (with confirmation if referenced by other formulas)
- [ ] Save layout to `Character.sheetData.layout`
- [ ] Reset to default 5e schema button

### 1.4B — Character Appearance Settings

**Goal:** Each character can have a custom class color and icon, independent of the global class registry. A Wizard who wants gold instead of purple, or a homebrew class with no registered color, gets a first-class experience.

**Where it lives:** A collapsible "Appearance" panel at the top of the sheet builder, next to the character name header.

**Color picker UI spec:**

```
┌─────────────────────────────────────────────────────┐
│  Appearance                               [collapse] │
├─────────────────────────────────────────────────────┤
│  Class color                                        │
│                                                     │
│  ● Using class default  ○ Custom color              │
│                                                     │
│  [🟣 Wizard default — #5c4a8a]                      │
│                                                     │
│  When "Custom color" selected:                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  Preset swatches (12 class colors + 6 more) │   │
│  │  🟫 🟪 🟦 🟩 🟨 🟧 🟥 ⬛ + custom hex      │   │
│  └─────────────────────────────────────────────┘   │
│  [#] [ 5 c 4 a 8 a ]  ← hex input, live preview    │
│                                                     │
│  Preview:  [🔮 Lv 11 Wizard]  ← ClassBadge live    │
│                                                     │
│  [Reset to class default]  [Save]                  │
│                                                     │
│  Class icon (optional)                              │
│  Current: 🔮   [Change icon]  ← emoji picker       │
└─────────────────────────────────────────────────────┘
```

- [ ] "Appearance" panel rendered at top of sheet, collapsed by default
- [ ] **Color mode toggle:** "Using class default" (radio) vs "Custom color" (radio)
  - Default mode: reads from `getClassColor(character.class)` — no override stored
  - Custom mode: activates the color picker and stores hex in `sheetData.classColorOverride`
- [ ] **Preset swatch grid:** 12 standard class colors + 6 neutral options (slate, red, amber, teal, violet, rose) — clicking a swatch fills the hex input
- [ ] **Hex input field:** validates 3 or 6 char hex on blur; shows invalid state if bad format; live-updates the preview badge as user types
- [ ] **Live preview:** `ClassBadge` component renders inline with the current color so user sees exactly what it'll look like on their character card before saving
- [ ] **Reset button:** clears `sheetData.classColorOverride`, reverts to class default
- [ ] **Emoji icon picker:** opens a small popover with emoji categories (Nature, Objects, Symbols, Activities); selected emoji stored in `sheetData.classIconOverride`; defaults to class icon from `getClassColor()`
- [ ] **Data storage:** `classColorOverride` and `classIconOverride` written to `Character.sheetData` on save — same auto-save debounce as the rest of the sheet
- [ ] **Propagation:** `CharacterCard`, `ClassBadge`, sheet header, and session tracker all read from `getClassColor(cls, sheetData.classColorOverride)` — override applies everywhere automatically

### 1.5 — Dice Roll System (Client-Side)

- [ ] `rollDice(n, sides)` using `crypto.getRandomValues()` for cryptographic fairness
- [ ] Roll result object: `{ expression, rolls[], total, timestamp }`
- [ ] Dice log panel: last 20 rolls, newest at top
- [ ] Roll animation: brief highlight flash on the result cell
- [ ] Keyboard shortcut: click roll button or press `R` while focusing a DiceCell

### 1.6 — Character Roster Dashboard

**Goal:** Every character the user has ever created is displayed as a glanceable card on a personal roster page — the app's main landing screen after login.

- [ ] `/characters` route as the post-login landing page (replaces plain campaign list)
- [ ] `CharacterCard` component displaying per character:
  - Class icon + class-specific color identity (Ranger = forest green, Wizard = purple, Barbarian = red, etc.)
  - Character name, race, class, and level
  - HP bar with color gradient (green → yellow → red → gray for dead/0 HP)
  - All 6 ability scores with auto-computed modifiers
  - AC badge
  - Active conditions as colored chips
  - Campaign name the character belongs to
  - Last played timestamp
  - Status badge: `Active` / `Resting` / `Archived` / `Dead`
- [ ] Responsive card grid: `repeat(auto-fill, minmax(280px, 1fr))` — works from 1 to 4+ columns
- [ ] Dead/retired characters dimmed (65% opacity) but still browsable
- [ ] Character detail modal on card click:
  - Full 6-stat grid with modifier boxes styled in class color
  - HP + AC summary row
  - Campaign, last played, status, and conditions
  - "Open Sheet" and "View Campaign" action buttons
- [ ] Global search bar: filter by name, class, race, or campaign name
- [ ] Filter tabs with counts: All / Active / Resting / Archived / Dead
- [ ] Sort controls: Recent · Level · Name · HP %
- [ ] `+ New Character` button opens creation wizard (from Milestone 0.4)
- [ ] Empty state: illustrated prompt guiding new users to create their first character
- [ ] API endpoint: `GET /api/characters` — returns all characters owned by the authenticated user across all campaigns, with lightweight summary fields (no full `sheetData` payload)
- [ ] Optimistic UI: new characters appear instantly on the roster before server confirmation

---

## Milestone 2 — Compendium & Data Layer (Alpha)

**Goal:** Users can search and reference spells, monsters, items, classes, and conditions from 5e-tools data, and insert them into their sheet or session.  
**Target:** Weeks 10–14

### 2.1 — 5e-tools JSON Ingestion

- [ ] Document the OGL / Creative Commons licensing boundary clearly in `LEGAL.md`
  - SRD content only ships bundled
  - Non-SRD content: user must supply their own JSON files
- [ ] Write ingestion scripts for SRD-safe 5e-tools JSON:
  - `spells-phb.json` → parsed spell objects
  - `bestiary-mm.json` → parsed monster stat blocks
  - `items-base.json` → parsed equipment
  - `classes/*.json` → class/subclass feature trees
  - `conditions.json`, `skills.json`, `senses.json`
- [ ] Store ingested data in PostgreSQL (`CompendiumEntry` table: `type`, `name`, `source`, `data JSONB`)
- [ ] Alternatively: serve static JSON files from `/public/data/` with client-side indexing (simpler, self-host friendly)
- [ ] Build `FlexSearch` or `MiniSearch` index over name + tags + type on app startup

### 2.2 — Compendium Browser UI

- [ ] Global search bar (`Ctrl+K` / `Cmd+K`) opening a command palette
- [ ] Filter sidebar: type (spell / monster / item / class / condition), source, level/CR, school
- [ ] Instant search results with keyboard navigation (arrow keys + Enter)
- [ ] Entry detail panel (right pane or modal):
  - Spells: level, school, casting time, range, components, duration, description
  - Monsters: CR, type, AC, HP, speeds, ability scores, traits, actions
  - Items: type, weight, cost, properties, description
  - Classes: hit die, proficiencies, feature list per level
- [ ] "Add to sheet" button: inject a spell slot resource or class feature field into current character
- [ ] "Pin to session" button: add monster/NPC to initiative tracker (unlocked in Milestone 3)

### 2.3 — Rulebook Viewer

- [ ] Render 5e-tools JSON book entries as formatted HTML:
  - Support entry types: `entries`, `list`, `table`, `inset`, `quote`, `image`
  - Internal cross-links: `{@spell Fireball}`, `{@condition Prone}`, `{@creature Goblin}` open compendium panel
- [ ] Table of contents sidebar with scroll-sync
- [ ] User-supplied book import: drag-and-drop a 5e-tools compatible `.json` file
  - Validate against expected schema, show import errors
  - Store in user's private data (not shared globally)
- [ ] Bookmark system: save entries per character or campaign

### 2.4 — Spell & Ability Cards

- [ ] `SpellCard` component: compact card used inline in character sheet's spell list section
- [ ] Click to expand full compendium entry
- [ ] "Prepared" checkbox state persisted to character sheet
- [ ] Quick-cast button: rolls spell attack or prompts save DC, logs to dice log

---

## Milestone 2.5 — Google Sheets Import

**Goal:** Users can import an existing D&D character sheet built in Google Sheets into OpenVTT, with a confidence-scored field mapping UI and a robust three-tier error handling system that never silently drops data.  
**Target:** Weeks 18–21 (runs parallel to late Milestone 3 work)

### 2.5.1 — File Ingestion

- [ ] Accept `.xlsx` and `.csv` exports (File → Download from Google Sheets — no OAuth required)
- [ ] Drag-and-drop upload zone on the `+ New Character` dialog: "Build from scratch" vs "Import from Google Sheets"
- [ ] Parse `.xlsx` with `SheetJS` (already a dependency via the compendium data pipeline)
- [ ] Parse `.csv` with `papaparse`
- [ ] Flatten all cells into a `RawCell[]` array: `{ address, value, rawValue, neighbors[] }`
- [ ] Detect sheet with most D&D-like content when the workbook has multiple tabs

### 2.5.2 — Field Detection Engine

GSheets are freeform — the importer detects patterns rather than assuming fixed positions.

- [ ] Label–value proximity scanner: for each candidate label cell, check adjacent cells (right, below, above) for a numeric or text value
- [ ] Canonical label dictionary for fuzzy matching (case-insensitive, handles abbreviations and common variants):

  | Detected label variants                               | Maps to field        |
  | ----------------------------------------------------- | -------------------- |
  | `Strength`, `STR`, `Str Score`                        | `STR`                |
  | `Dexterity`, `DEX`, `Dex`                             | `DEX`                |
  | `Constitution`, `CON`                                 | `CON`                |
  | `Intelligence`, `INT`                                 | `INT`                |
  | `Wisdom`, `WIS`                                       | `WIS`                |
  | `Charisma`, `CHA`                                     | `CHA`                |
  | `Proficiency Bonus`, `Prof`, `PB`                     | `PROF`               |
  | `Armor Class`, `AC`                                   | `AC`                 |
  | `Hit Points`, `HP`, `Max HP`, `Hit Point Maximum`     | `MAX_HP`             |
  | `Current HP`, `Current Hit Points`                    | `CURRENT_HP`         |
  | `Temporary HP`, `Temp HP`                             | `TEMP_HP`            |
  | `Level`, `Lvl`, `Character Level`                     | `LEVEL`              |
  | `Speed`, `Movement`, `Move`                           | `SPEED`              |
  | `Initiative`, `Init`                                  | `INITIATIVE`         |
  | `Passive Perception`, `Passive Wisdom`, `Pass. Perc.` | `PASSIVE_PERCEPTION` |
  | `Spell Save DC`, `Save DC`                            | `SPELL_SAVE_DC`      |
  | `Spell Attack Bonus`, `Spell Atk`                     | `SPELL_ATTACK`       |

- [ ] Confidence scoring per detected field:
  - `high` — exact label match + value in valid range (e.g., STR 1–30)
  - `medium` — fuzzy label match OR value out of expected range
  - `low` — structural heuristic only (no clear label, inferred from position)
- [ ] Formula cell detection: if the GSheet cell contains a formula (e.g., `=B4-10`), flag it as `formula_origin` and attempt to reverse-engineer the expression into OpenVTT formula syntax

### 2.5.3 — Three-Tier Error Handling

- [ ] **Tier 1 — Parse errors** (file-level): caught immediately before field detection runs
  - Empty file → "This file appears to be empty."
  - Corrupt/unreadable XLSX → "Could not read this file. Try re-exporting from Google Sheets as .xlsx."
  - Zero cells detected → "No data found. Make sure you're exporting the correct sheet tab."
  - All parse errors surface as a blocking error screen with a retry button — import does not proceed

- [ ] **Tier 2 — Mapping warnings** (field-level): detected but uncertain — import continues
  - Value type mismatch (e.g., STR cell contains `"1d6+2"` instead of a number) → field imported as `needs_review`, formula preserved as a note
  - Value out of valid range (e.g., STR = 142) → flagged `needs_review` with "Value seems unusually high"
  - Duplicate label matches (two cells both look like STR) → both flagged, user picks one in the confirmation UI
  - Fields marked `needs_review` display a ⚠️ warning badge on the character card until resolved

- [ ] **Tier 3 — Silent failure prevention** (schema-level): the most dangerous class of error
  - After detection, compute a "coverage score": how many of the 20 expected core fields were found?
  - If coverage < 50% → show a prominent warning: "We only detected 8 of 20 core fields. Your sheet may use an unusual layout."
  - Display a "Not imported" list showing every expected field that was not found — user can manually enter missing values before finalizing
  - ImportResult type enforced across the pipeline:
    ```typescript
    type ImportResult = {
      status: 'success' | 'partial' | 'failed'
      coverage: number // 0–1, ratio of core fields found
      mapped: MappedField[] // high/medium confidence
      warnings: ImportWarning[] // low confidence or type mismatch
      missing: string[] // expected fields not detected at all
      skipped: RawCell[] // cells found but not mappable to any field
    }
    ```

### 2.5.4 — Mapping Confirmation UI

The user must review and confirm before any data is written to the database.

- [ ] Three-column confirmation screen:
  - **Mapped** (green checkmark): field name, detected value, confidence badge
  - **Needs review** (yellow warning): field name, detected value, issue description, inline edit input
  - **Not found** (gray dash): field name, empty input for manual entry
- [ ] Inline edit: any mapped field can be overridden before import is finalized
- [ ] "Assign manually" for skipped cells: user can drag an unrecognized cell value onto a field slot
- [ ] Coverage progress bar at the top of the screen (e.g., "17 / 20 core fields detected")
- [ ] "Import anyway" vs "Go back" CTAs — never force the user to complete all fields before importing
- [ ] On confirm: write to `Character.sheetData`, set `importSource: 'gsheet'`, store `needs_review` field list separately so the character card can show the warning badge

### 2.5.5 — Post-Import Experience

- [ ] Newly imported character appears on the roster dashboard immediately with an "Imported" badge
- [ ] ⚠️ badge on card if any fields are `needs_review` — clicking opens the field review panel
- [ ] "Finish setup" prompt in the sheet builder highlighting unresolved fields in yellow
- [ ] Re-import flow: user can re-upload a newer version of their GSheet — shows a diff of changed fields (new value vs current value) and lets user pick which changes to accept
- [ ] Import history log: `CharacterImport` table storing `{ characterId, importedAt, source, coverage, warnings[] }` for debugging

---

## Milestone 3 — Session Table (Alpha)

**Goal:** A DM can start a live session; all players join and share a real-time game table with initiative, HP tracking, dice, and chat.  
**Target:** Weeks 15–21

### 3.1 — Real-Time Infrastructure

- [ ] Set up Socket.io on the Next.js server (custom server or separate Express process)
- [ ] Room architecture: one Socket.io room per `sessionId`
- [ ] Event schema (typed with Zod):
  - `session:join` / `session:leave`
  - `initiative:update` (full tracker state)
  - `hp:change` `{ characterId, delta, newValue }`
  - `dice:roll` `{ rollerId, expression, result, isSecret }`
  - `chat:message` `{ senderId, content, type: 'text' | 'roll' | 'system' }`
  - `condition:add` / `condition:remove`
  - `resource:update` `{ characterId, field, newValue }`
- [ ] Redis adapter for Socket.io (enables multi-instance horizontal scale)
- [ ] Reconnection handling: client re-subscribes and receives full state snapshot on reconnect
- [ ] Presence: show online/offline status per player

### 3.2 — Session Management

- [ ] DM creates session: generates a short join code (e.g., `WOLF-7`)
- [ ] Players join via code or direct link
- [ ] Session state machine: `lobby → active → paused → ended`
- [ ] Persistent session log: all events stored to `SessionEvent` table for replay
- [ ] Session settings: display name, allow late joins, hide DM rolls

### 3.3 — Initiative Tracker

- [ ] Add combatant dialog: choose from campaign characters, or create quick NPC (name + initiative modifier)
- [ ] Auto-roll initiative: `rollDice(1,20) + DEX_MOD` for each combatant
- [ ] Manual initiative override
- [ ] Turn order list: sorted by initiative, active combatant highlighted
- [ ] "Next turn" button (DM only, or configurable): advances active combatant, broadcasts update
- [ ] Round counter display
- [ ] Drag-to-reorder combatants (DM only)
- [ ] Remove combatant button (with confirmation)
- [ ] All tracker changes broadcast to all players in real time

### 3.4 — HP & Condition Tracking

- [ ] HP display per combatant: current / max, color-coded (green → yellow → red → gray)
- [ ] HP adjustment: `+ / −` buttons + direct input; resolves damage/healing
- [ ] Temp HP field (separate from max HP)
- [ ] Death save tracker: 3 success / 3 fail pips per downed character
- [ ] Condition chips: click to apply conditions (Blinded, Charmed, Frightened, etc.) from SRD list
- [ ] Condition tooltips: show condition effect text on hover
- [ ] All HP/condition changes logged to session event stream

### 3.5 — Shared Dice Log & Chat

- [ ] Combined log panel: dice rolls interleaved with chat messages, newest at bottom
- [ ] Player rolls from their character sheet appear in the shared log
- [ ] In-log roll: `/roll 1d20+5` chat command triggers a roll and logs result
- [ ] Secret rolls: DM can roll privately (result hidden from players), flagged as `[secret]` in DM view
- [ ] Whisper: `/w PlayerName message` for private chat
- [ ] System messages: turn changes, combatant added/removed, session state changes
- [ ] Log export: download session log as formatted Markdown or JSON

### 3.6 — Player Character Panel

- [ ] Each player sees their own character's HP, conditions, and resources in a side panel during session
- [ ] HP changes from the tracker reflect immediately on the player's view
- [ ] Resource tracking: click to spend/restore spell slots, class abilities, etc.
- [ ] Quick-roll buttons: attack, save, skill check from character sheet formulas

---

## Milestone 4 — DM Tools (Beta)

**Goal:** A complete digital DM screen with NPC management, secret notes, and encounter builder.  
**Target:** Weeks 22–27

### 4.1 — DM Screen

- [ ] Split-view layout: public session table (left) + private DM panel (right)
- [ ] DM panel tabs: NPCs, Notes, Encounter, Loot
- [ ] DM panel persists between sessions (auto-loaded when a new session starts in the same campaign)

### 4.2 — NPC & Monster Quick-Reference

- [ ] Add monster from compendium to DM NPC list (name, HP, AC, stats — local copy for the session)
- [ ] NPC stat block rendered inline in DM panel
- [ ] Quick-roll from NPC stat block: attack, save, skill — DM-only roll (goes to secret log)
- [ ] Multiple instances of same monster (e.g., "Goblin 1", "Goblin 2") with individual HP tracking
- [ ] "Send to tracker" button: adds NPC to initiative tracker with one click

### 4.3 — Session Notes

- [ ] Rich text note editor (Tiptap or ProseMirror) per campaign
- [ ] Notes are private to DM by default
- [ ] "Share with players" toggle per note
- [ ] Tag system: `#lore`, `#quest`, `#npc`, `#location`
- [ ] Note search by title + tag
- [ ] Link notes to compendium entries: `[[Goblin King]]` auto-links to the NPC in compendium

### 4.4 — Encounter Builder

- [ ] Drag monsters from compendium into encounter builder
- [ ] XP budget calculator: displays easy / medium / hard / deadly thresholds for the party
- [ ] Adjusted XP multiplier based on monster count
- [ ] "Launch encounter" button: sends all monsters to initiative tracker, starts session if not active

### 4.5 — Loot Generator

- [ ] Individual treasure tables (no magic items by default — user can define their own)
- [ ] Loot result displayed as a shared message in session log
- [ ] "Award to party" button: logs loot as a session event

---

## Milestone 5 — Homebrew & Plugin System (Beta)

**Goal:** Users can write homebrew rules, custom classes, spells, and monsters using a 5e-tools–compatible JSON schema, and share them with their campaign.  
**Target:** Weeks 28–35

### 5.1 — Homebrew JSON Format

- [ ] Adopt 5e-tools homebrew schema as the base format
- [ ] Support homebrew entry types:
  - Custom spells (`spell` entries)
  - Custom monsters (`monster` entries)
  - Custom items (`item` entries)
  - Custom classes + subclasses
  - Custom backgrounds and feats
  - Custom rules (free-text `rule` entries)
- [ ] JSON Schema (Draft 7) validation for all homebrew uploads
- [ ] Detailed validation error messages: line number, field, expected type
- [ ] `HOMEBREW.md` guide explaining the format with annotated examples

### 5.2 — Homebrew Import & Management

- [ ] Upload UI: drag-and-drop or paste JSON
- [ ] Validation feedback: green checkmark or inline error list
- [ ] Homebrew library: list of imported packs per user
- [ ] Enable/disable packs per campaign
- [ ] Pack detail page: list all entries by type
- [ ] Export pack: download current pack as JSON (for sharing)

### 5.3 — Custom Sheet Schema Plugins

- [ ] Plugin type: `sheetExtension` — adds new fields or sections to any character sheet
- [ ] Example plugin: `artificer-infusions.json` — adds infusion slot tracker, infusion list
- [ ] Plugin field types: number, formula, resource, list, enum
- [ ] Conflict detection: warn if plugin field names clash with existing fields
- [ ] Apply plugin to character: merges extension schema into sheet layout

### 5.4 — Macro System

- [ ] Macro type: a named, triggerable formula or sequence of rolls
- [ ] Macro definition: `{ "name": "Sneak Attack", "steps": ["rollDice(1,20)+DEX_MOD+PROF", "rollDice(SNEAK_DICE, 6)"] }`
- [ ] Macro triggers: button in sheet cell, chat command `/macro SnakeAttack`, or keyboard shortcut
- [ ] Macro result logged to session dice log with step breakdown
- [ ] Macro library: per-character list, importable from homebrew packs
- [ ] Macro editor UI: code editor (CodeMirror) with formula syntax highlighting and live preview

---

## Milestone 6 — Polish & Self-Hosting (v1.0)

**Goal:** Production-quality UX, complete self-hosting documentation, performance, accessibility, and security hardening.  
**Target:** Weeks 36–44

### 6.1 — Self-Hosting

- [ ] Production `docker-compose.yml`: web, postgres, redis, nginx reverse proxy
- [ ] One-command setup: `docker compose up -d` brings up a fully working instance
- [ ] `SELF_HOSTING.md`: step-by-step guide for:
  - DigitalOcean Droplet
  - Raspberry Pi
  - VPS (generic Linux)
  - Coolify / Dokku / Render
- [ ] Environment variable reference: all config documented with defaults and examples
- [ ] SMTP configuration for email invites and password reset
- [ ] Optional: Cloudflare Tunnel support for exposing local instance without port forwarding
- [ ] Data backup guide: pg_dump scripts, restore procedures, backup cron example
- [ ] Upgrade guide: running migrations on new versions

### 6.2 — Performance

- [ ] Next.js bundle analysis: target < 150KB first-load JS
- [ ] Compendium search: client-side MiniSearch index loaded once, no server round-trips for search
- [ ] Sheet render: React.memo + useMemo on formula evaluation — only recalculate changed fields
- [ ] WebSocket event batching: debounce rapid HP changes into single broadcast
- [ ] Image optimization: Next.js `<Image>` for all avatar and asset images
- [ ] Database: add indexes on `Character.campaignId`, `Session.campaignId`, `CompendiumEntry.type`
- [ ] Lighthouse CI: enforce ≥ 90 performance, ≥ 95 accessibility on main pages

### 6.3 — Accessibility

- [ ] Full keyboard navigation: tab order, visible focus rings, no mouse-only interactions
- [ ] ARIA labels on all icon-only buttons
- [ ] Screen reader testing with NVDA (Windows) and VoiceOver (macOS)
- [ ] Color contrast: WCAG AA on all text/background combinations
- [ ] Reduce motion: respect `prefers-reduced-motion` for all animations
- [ ] Skip-to-content link on all pages

### 6.4 — Security Hardening

- [ ] Formula sandbox audit: verify no path to `window`, `document`, `fetch`, `eval`
- [ ] CSRF protection on all mutating API routes
- [ ] Rate limiting: 60 req/min per IP on API routes (Redis-based)
- [ ] Input validation with Zod on all API request bodies and query params
- [ ] Content Security Policy headers
- [ ] Dependency audit: `pnpm audit` in CI, Dependabot for automated PRs
- [ ] OWASP Top 10 self-audit checklist

### 6.5 — UX Polish

- [ ] Onboarding flow: empty states with guided prompts for new users
- [ ] Keyboard shortcut reference modal (`?` key)
- [ ] Toast notification system for save confirmations, errors, and session events
- [ ] Dark mode (system preference + manual toggle, persisted to user profile)
- [ ] Mobile responsiveness: sheet builder and session table usable on tablet
- [ ] Print stylesheet: character sheet prints cleanly on A4/Letter
- [ ] Offline indicator: show warning when WebSocket disconnects mid-session

### 6.6 — Testing & Documentation

- [ ] Unit test coverage ≥ 80% on `packages/engine` (formula evaluator, topo sort, dice)
- [ ] Integration tests: API routes for CRUD, auth flows
- [ ] e2e tests (Playwright): create character → fill sheet → start session → roll dice → track HP
- [ ] `CONTRIBUTING.md`: local setup, PR guidelines, commit convention
- [ ] `ARCHITECTURE.md`: system diagram, key decisions, why each tech was chosen
- [ ] JSDoc / TSDoc on all public engine functions
- [ ] Storybook for UI component library (optional but recommended)

---

## Milestone 7 — Community & Ecosystem (Post-v1.0)

**Goal:** Build an open ecosystem of shared homebrew, sheet templates, and optional cloud features.  
**Target:** Ongoing after v1.0

### 7.1 — Homebrew Registry

- [ ] Public homebrew index: a separate GitHub repo (`openvtt-homebrew`) with curated community packs
- [ ] In-app "Browse homebrew" panel: fetches index, one-click install
- [ ] Submission process: PR to the homebrew repo with CI validation
- [ ] Author attribution and versioning on all packs

### 7.2 — Sheet Template Library

- [ ] Export sheet layout as a shareable template (strips character-specific values, keeps schema + layout)
- [ ] Built-in templates: standard 5e, Starter Set simplified, Spellcaster-focused, Martial-focused
- [ ] Community template sharing via GitHub Gist or the homebrew registry

### 7.3 — Optional Cloud Features (hosted version only)

- [ ] Campaign sharing links: invite players by email or Discord username
- [ ] Avatar image upload (to S3/R2)
- [ ] Campaign history timeline: session log browsable per-session
- [ ] AI DM assistant (stretch): "summarize last session," "generate an encounter for level 5 party in a dungeon"

### 7.4 — System Expansion

- [ ] System-agnostic mode: sheet engine works with any RPG system
- [ ] Community-maintained schema packs for popular systems:
  - Pathfinder 2e
  - Call of Cthulhu 7e
  - Blades in the Dark
  - Shadowrun 6e
- [ ] Multi-system campaign: one campaign can mix characters of different systems (for megadungeon / crossover campaigns)

---

## Technical Decisions

| Decision      | Choice                      | Rationale                                                                                                                       |
| ------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Framework     | Next.js 14 (App Router)     | SSR for compendium SEO, React for reactive sheet UI, API routes avoid a separate server                                         |
| Language      | TypeScript (strict)         | Shared types between engine, API, and frontend catch bugs at compile time                                                       |
| ORM           | Prisma                      | Type-safe queries, excellent migration tooling, works well with PostgreSQL JSONB                                                |
| Real-time     | Socket.io                   | Battle-tested, rooms + namespaces match our session model perfectly                                                             |
| Formula eval  | Custom parser + `expr-eval` | Sandboxed, extendable with D&D primitives, no `eval()` in production                                                            |
| Auth          | NextAuth.js v5              | Discord OAuth is one config block; JWT is stateless and self-host friendly                                                      |
| Styling       | Tailwind CSS + shadcn/ui    | shadcn gives accessible headless components; Tailwind keeps bundle lean                                                         |
| Search        | MiniSearch                  | Runs client-side, zero server round-trips, < 10KB, good enough for 5e compendium size                                           |
| Testing       | Vitest + Playwright         | Vitest is fast and native ESM; Playwright is the best e2e tool for Next.js                                                      |
| GSheet import | SheetJS + papaparse         | SheetJS parses XLSX with formula cell detection; papaparse handles CSV fallback. No Google OAuth needed — user exports manually |
| Deployment    | Docker Compose              | Single-command self-hosting; no Kubernetes complexity for a small team                                                          |

---

## Out of Scope

The following are explicitly out of scope to keep the project focused:

- **Battle maps and tokens** — use Owlbear Rodeo, Foundry, or Roll20 alongside this tool
- **Voice/video chat** — use Discord (which your players already have)
- **Mobile native apps** — responsive web is sufficient; native adds significant maintenance cost
- **Automated rule enforcement** — the engine provides formulas, not a rules lawyer; DM adjudicates
- **Monetization layer** — this is MIT-licensed and free forever; self-hosters run their own instance

---

## Contributing

We welcome contributions at every milestone. Before opening a PR:

1. Check the [open issues](../../issues) — your idea may already be tracked
2. For new features, open a discussion issue first to align on design
3. Read `CONTRIBUTING.md` for local setup and commit conventions
4. All engine code must have unit tests; all UI components must have a Storybook story (post-v1.0)

**Good first issues** are labeled [`good first issue`](../../labels/good%20first%20issue) and are typically self-contained tasks in the formula engine or UI component layer.

---

_Last updated: May 2026 — Milestone 0 complete ✅. Added Milestone 0.5 (Design System & Tokens) and Milestone 0.6 (UI/UX Design). Added Milestone 1.4B (Character Appearance Settings + color picker spec). Class colors moved from CSS to runtime registry (`lib/class-colors.ts`). Four themes: dark · dark-cho · parchment · arcane. Roadmap is a living document._
