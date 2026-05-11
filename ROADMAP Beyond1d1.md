# 🎲  Beyond1d1 — Project Roadmap

> A free, open-source, map-free virtual tabletop that combines the customizability of Google Sheets character building, the convenience of D&D Beyond, and the live-play experience of Roll20 — powered by 5e-tools data.

**Status:** Pre-alpha — architecture & planning  
**License:** MIT  
**Stack:** Next.js · TypeScript · PostgreSQL · Redis · Socket.io · Tailwind CSS

---

## Table of Contents

- [Vision](#vision)
- [Guiding Principles](#guiding-principles)
- [System Overview](#system-overview)
- [Milestone 0 — Foundation](#milestone-0--foundation-pre-alpha)
- [Milestone 1 — Sheet Engine](#milestone-1--sheet-engine-alpha)
- [Milestone 2 — Compendium](#milestone-2--compendium--data-layer-alpha)
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

## Milestone 0 — Foundation (Pre-Alpha)

**Goal:** Working monorepo. A logged-in user can create a campaign and open a blank character sheet.  
**Target:** Weeks 1–3

### 0.1 — Monorepo & Tooling

- [ ] Initialize Next.js 14 (App Router) + TypeScript project
- [ ] Configure ESLint, Prettier, and Husky pre-commit hooks
- [ ] Set up Turborepo or pnpm workspaces for `apps/web`, `packages/engine`, `packages/types`
- [ ] Configure `tsconfig` path aliases (`@/`, `@engine/`, `@types/`)
- [ ] Set up Vitest for unit tests and Playwright for e2e
- [ ] Add GitHub Actions CI: lint → type-check → test → build on every PR

### 0.2 — Database & ORM

- [ ] Set up PostgreSQL via Docker Compose (local dev)
- [ ] Integrate Prisma ORM with initial schema:
  - `User` (id, email, displayName, avatarUrl, createdAt)
  - `Campaign` (id, name, ownerId, createdAt, settings JSONB)
  - `Character` (id, campaignId, userId, name, sheetData JSONB, schemaVersion)
  - `Session` (id, campaignId, state JSONB, startedAt, endedAt)
- [ ] Write and test initial Prisma migrations
- [ ] Seed script with 2 test users, 1 campaign, 1 character

### 0.3 — Authentication

- [ ] Integrate NextAuth.js v5
- [ ] Discord OAuth provider (primary — target audience lives on Discord)
- [ ] Email/password fallback (for self-hosters without Discord)
- [ ] JWT session strategy (stateless, works behind any reverse proxy)
- [ ] Protected route middleware: redirect unauthenticated users to `/login`
- [ ] User profile page: edit display name, avatar URL

### 0.4 — Campaign & Character CRUD

- [ ] Campaign dashboard: list, create, delete campaigns
- [ ] Campaign detail page: member list, character list, session history
- [ ] Character creation wizard: name, race, class, background (freeform text at this stage)
- [ ] Character list view with HP/class badge
- [ ] Basic REST API endpoints:
  - `GET/POST /api/campaigns`
  - `GET/PUT/DELETE /api/campaigns/[id]`
  - `GET/POST /api/campaigns/[id]/characters`
  - `GET/PUT /api/characters/[id]`

### 0.5 — Infrastructure Baseline

- [ ] Docker Compose stack: `web`, `postgres`, `redis`
- [ ] Environment variable schema with Zod validation on startup
- [ ] Health check endpoint: `GET /api/health` → `{ db: ok, redis: ok, version }`
- [ ] Basic error boundary and 404/500 pages
- [ ] Logging with Pino (structured JSON logs, request IDs)

---

## Milestone 1 — Sheet Engine (Alpha)

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

### 1.5 — Dice Roll System (Client-Side)

- [ ] `rollDice(n, sides)` using `crypto.getRandomValues()` for cryptographic fairness
- [ ] Roll result object: `{ expression, rolls[], total, timestamp }`
- [ ] Dice log panel: last 20 rolls, newest at top
- [ ] Roll animation: brief highlight flash on the result cell
- [ ] Keyboard shortcut: click roll button or press `R` while focusing a DiceCell

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

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR for compendium SEO, React for reactive sheet UI, API routes avoid a separate server |
| Language | TypeScript (strict) | Shared types between engine, API, and frontend catch bugs at compile time |
| ORM | Prisma | Type-safe queries, excellent migration tooling, works well with PostgreSQL JSONB |
| Real-time | Socket.io | Battle-tested, rooms + namespaces match our session model perfectly |
| Formula eval | Custom parser + `expr-eval` | Sandboxed, extendable with D&D primitives, no `eval()` in production |
| Auth | NextAuth.js v5 | Discord OAuth is one config block; JWT is stateless and self-host friendly |
| Styling | Tailwind CSS + shadcn/ui | shadcn gives accessible headless components; Tailwind keeps bundle lean |
| Search | MiniSearch | Runs client-side, zero server round-trips, < 10KB, good enough for 5e compendium size |
| Testing | Vitest + Playwright | Vitest is fast and native ESM; Playwright is the best e2e tool for Next.js |
| Deployment | Docker Compose | Single-command self-hosting; no Kubernetes complexity for a small team |

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

*Last updated: May 2026 — roadmap is a living document and will be revised as milestones complete.*
