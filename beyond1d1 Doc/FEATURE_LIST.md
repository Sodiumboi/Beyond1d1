# Beyond1d1 — Complete Feature List
> Every feature in the project, grouped by area.
> Milestone reference in brackets. ✅ = complete, 🔄 = in progress, 🔜 = planned.

---

## Auth & Identity

- [🔜] Discord OAuth login [M0.3]
- [🔜] Email/password login fallback [M0.3]
- [🔜] JWT session strategy [M0.3]
- [🔜] Protected route middleware [M0.3]
- [🔜] User profile page [M1.6]
- [🔜] Discord avatar display in header [M1.6]
- [🔜] Username initials fallback avatar [M0.3]

---

## Character Management

- [🔜] Character creation wizard [M0.4]
- [🔜] Character deletion [M1.6]
- [🔜] Character duplication [M1.6]
- [🔜] Character portrait — URL from GSheet import [M2.5]
- [🔜] Character portrait — manual upload [M1.6]
- [🔜] Character portrait — fallback state (no image) [M1.6]
- [🔜] Character appearance settings: class color override [M1.4B]
- [🔜] Character appearance settings: class icon override (emoji picker) [M1.4B]
- [🔜] Public character profile page (`/c/[slug]`) — read-only, no login required [M1.7]
- [🔜] Public character share link generation [M1.7]
- [🔜] Public / private toggle per character [M1.7]
- [🔜] Permanent public slug (nanoid-based) [M1.7]
- [🔜] Open Graph meta tags on public profile pages [M1.7]

---

## Character Roster (`/characters`)

- [🔜] Full-width wrapping card grid [M1.6]
- [🔜] Three card sizes: Small / Medium / Large (user setting) [M1.6]
- [🔜] Custom drag-and-drop card ordering (persists to account) [M1.6]
- [🔜] Search bar: filter by name, class, race, campaign [M1.6]
- [🔜] Sort controls: Recent · Level · Name · Custom [M1.6]
- [🔜] "Custom" sort mode unlocks drag-and-drop [M1.6]
- [🔜] Dead/retired characters dimmed (65% opacity), still browsable [M1.6]
- [🔜] Empty state with illustrated new-user prompt [M1.6]
- [🔜] Optimistic UI — new characters appear before server confirmation [M1.6]
- [🔜] Add New tile — dashed border, trails grid, opens create/import dialog [M1.6]
- [🔜] Campaign tag overflow tooltip (max 2 shown, rest on hover) [M1.6]

---

## Character Card

- [🔜] Portrait image [M1.6]
- [🔜] Character name (CJK and mixed-script support) [M1.6]
- [🔜] Race, class, level [M1.6]
- [🔜] Campaign tags (max 2 + tooltip) [M1.6]
- [🔜] Right-edge class color tab (decorative, hideable) [M1.6]
- [🔜] "Open Sheet" button [M1.6]
- [🔜] "Go to Campaign" button — live session (green dot) or sandbox [M1.6 / M3.7]
- [🔜] "more" context menu: Delete / Share / Duplicate / Tab settings [M1.6]

---

## Character Sheet

- [🔜] Formula evaluator engine (sandboxed, dependency graph, topo sort) [M1.1]
- [🔜] Circular dependency detection [M1.1]
- [🔜] Default 5e sheet schema JSON [M1.2]
- [🔜] Schema versioning + migration system [M1.2]
- [🔜] Cell types: Number, Formula, Text, Checkbox, Dice, Resource [M1.3]
- [🔜] Formula inspector popover [M1.3]
- [🔜] Inline formula override (click to edit) [M1.3]
- [🔜] Dirty state indicator + auto-save (debounced 2s) [M1.3]
- [🔜] Manual save with last-saved timestamp [M1.3]
- [🔜] Layout editor mode (drag-and-drop cell reordering) [M1.4]
- [🔜] Add custom field dialog (name, type, formula, section) [M1.4]
- [🔜] Delete custom field (confirmation if referenced) [M1.4]
- [🔜] Reset to default 5e schema [M1.4]
- [🔜] Appearance panel: class color picker + live preview [M1.4B]
- [🔜] Appearance panel: emoji icon picker [M1.4B]
- [🔜] Read-only sheet mode (used on public profile pages) [M1.7]
- [🔜] Print stylesheet: A4/Letter clean output [M6.5]

---

## Dice

- [🔜] `rollDice(n, sides)` using `crypto.getRandomValues()` [M1.5]
- [🔜] Roll result object: expression, rolls[], total, timestamp [M1.5]
- [🔜] Per-sheet dice log panel (last 20 rolls) [M1.5]
- [🔜] Roll animation flash on result cell [M1.5]
- [🔜] Keyboard shortcut `R` on focused DiceCell [M1.5]
- [🔜] Quick Dice Widget — persistent floating roller, all pages [M1.5B]
- [🔜] Quick Dice — dice notation input (`/r 1d100+4`) [M1.5B]
- [🔜] Quick Dice — results fade, no log kept [M1.5B]
- [🔜] Quick Dice — collapse to header bar [M1.5B]
- [🔜] Quick Dice — toggle off in settings [M1.5B]
- [🔜] Quick Dice — 5e-tools compendium click integration (stretch) [M1.5B / M2.3]

---

## Compendium & Books

- [🔜] 5e-tools JSON ingestion scripts (SRD-safe content only) [M2.1]
- [🔜] `CompendiumEntry` table (type, name, source, data JSONB) [M2.1]
- [🔜] MiniSearch client-side index [M2.1]
- [🔜] Global search bar (`Ctrl+K`) — command palette [M2.2]
- [🔜] Filter sidebar: type, source, level/CR, school [M2.2]
- [🔜] Entry detail panel: spells, monsters, items, classes [M2.2]
- [🔜] "Add to sheet" — inject spell slot or class feature [M2.2]
- [🔜] "Pin to session" — add monster to initiative tracker [M2.2]
- [🔜] Rulebook viewer — render 5e-tools JSON as formatted HTML [M2.3]
- [🔜] Internal cross-links: `{@spell}`, `{@condition}`, `{@creature}` [M2.3]
- [🔜] Table of contents with scroll-sync [M2.3]
- [🔜] User-supplied book import (`.json` drag-and-drop, validated) [M2.3]
- [🔜] Bookmark system per character/campaign [M2.3]
- [🔜] SpellCard component (inline, expand to full entry) [M2.4]
- [🔜] Spell "Prepared" checkbox [M2.4]
- [🔜] Quick-cast button (spell attack roll / save DC) [M2.4]
- [🔜] `LEGAL.md` OGL / Creative Commons boundary documentation [M2.1]

---

## Google Sheets Import

- [🔜] Accept `.xlsx` and `.csv` exports (no OAuth) [M2.5]
- [🔜] Drag-and-drop upload zone on New Character dialog [M2.5]
- [🔜] Field detection engine (label-value proximity, fuzzy matching) [M2.5]
- [🔜] Confidence scoring: high / medium / low per field [M2.5]
- [🔜] Formula cell detection + reverse-engineering attempt [M2.5]
- [🔜] Image URL detection → `character.portraitUrl` [M2.5]
- [🔜] Tier 1 errors: parse failures (blocking) [M2.5]
- [🔜] Tier 2 warnings: type mismatches, out-of-range values [M2.5]
- [🔜] Tier 3 coverage check: < 50% fields found → prominent warning [M2.5]
- [🔜] Mapping confirmation UI (3 columns: Mapped / Review / Not found) [M2.5]
- [🔜] Coverage progress bar [M2.5]
- [🔜] "Import anyway" CTA — never forced to complete all fields [M2.5]
- [🔜] Post-import "Imported" badge on character card [M2.5]
- [🔜] ⚠️ badge for unresolved `needs_review` fields [M2.5]
- [🔜] Re-import flow with field diff [M2.5]
- [🔜] Import history log (`CharacterImport` table) [M2.5]

---

## Session Table

- [🔜] Socket.io real-time infrastructure (client at layout level) [M3.1]
- [🔜] One room per `sessionId`, Redis adapter [M3.1]
- [🔜] Typed event schema (Zod): join, leave, initiative, HP, dice, chat, conditions, resources [M3.1]
- [🔜] Reconnection with full state snapshot [M3.1]
- [🔜] Player presence (online/offline) [M3.1]
- [🔜] DM creates session with short join code (e.g., `WOLF-7`) [M3.2]
- [🔜] Player joins via code or direct link [M3.2]
- [🔜] Session state machine: lobby → active → paused → ended [M3.2]
- [🔜] Persistent session event log (`SessionEvent` table) [M3.2]
- [🔜] "Leave the table" explicit action (distinct from navigating away) [M3.2]
- [🔜] Campaign pill in header while in session [M3.2]
- [🔜] Navigate-away-without-leaving (socket stays alive) [M3.2]
- [🔜] Initiative tracker: auto-roll, manual override, sorted list [M3.3]
- [🔜] "Next turn" button, round counter [M3.3]
- [🔜] Drag-to-reorder combatants (DM only) [M3.3]
- [🔜] HP adjustment: +/− buttons + direct input [M3.4]
- [🔜] Temp HP field [M3.4]
- [🔜] Death save tracker (3 success / 3 fail pips) [M3.4]
- [🔜] Condition chips from SRD list [M3.4]
- [🔜] Condition tooltips (effect text on hover) [M3.4]
- [🔜] Shared dice log + chat panel [M3.5]
- [🔜] `/roll` chat command [M3.5]
- [🔜] Secret DM rolls [M3.5]
- [🔜] Whisper: `/w PlayerName message` [M3.5]
- [🔜] Session log export (Markdown or JSON) [M3.5]
- [🔜] Player character panel: HP, conditions, resources, quick-roll [M3.6]
- [🔜] Sandbox / mock table mode (no socket, local only, "not saved" banner) [M3.7]
- [🔜] Cross-page session notification overlay (auto-fades ~3s) [M3.8]
- [🔜] Notification queue (one at a time) [M3.8]
- [🔜] Notification settings: duration, event types, on/off [M3.8]
- [🔜] Spectator mode (read-only session role) [M3.9]

---

## DM Tools

- [🔜] DM Screen: split view (public table + private DM panel) [M4.1]
- [🔜] DM panel tabs: NPCs · Notes · Encounter · Loot [M4.1]
- [🔜] NPC stat block inline with quick-roll [M4.2]
- [🔜] Multiple instances of same monster with individual HP [M4.2]
- [🔜] "Send to tracker" from NPC list [M4.2]
- [🔜] Rich text note editor (Tiptap / ProseMirror) [M4.3]
- [🔜] Notes: private / share-with-players toggle [M4.3]
- [🔜] Note tagging and search [M4.3]
- [🔜] Compendium cross-links in notes (`[[Goblin King]]`) [M4.3]
- [🔜] Encounter builder with XP budget calculator [M4.4]
- [🔜] "Launch encounter" → sends to tracker [M4.4]
- [🔜] Loot generator (custom treasure tables) [M4.5]

---

## Homebrew & Plugins

- [🔜] Homebrew JSON format (5e-tools schema compatible) [M5.1]
- [🔜] JSON Schema validation with detailed error messages [M5.1]
- [🔜] Upload UI: drag-and-drop or paste JSON [M5.2]
- [🔜] Homebrew library per user; enable/disable per campaign [M5.2]
- [🔜] Pack export as JSON [M5.2]
- [🔜] `sheetExtension` plugin type — adds fields/sections to sheets [M5.3]
- [🔜] Conflict detection for field name clashes [M5.3]
- [🔜] Macro system: named, triggerable formula sequences [M5.4]
- [🔜] Macro triggers: button, chat command, keyboard shortcut [M5.4]
- [🔜] Macro editor (CodeMirror + syntax highlighting + live preview) [M5.4]
- [🔜] `registerClassColor()` for homebrew classes [M0.5.6]

---

## Navigation & Global UI

- [🔜] Header bar with B1d wordmark + bracket glyph [M0.6]
- [🔜] Nav dropdowns: Characters / DM / Books [M0.6]
- [🔜] Campaign context pill (session-only, "go back" button) [M3.2]
- [🔜] Theme switcher: dark · dark-cho · parchment · arcane [M0.5.5]
- [🔜] Toast notification system [M6.5]
- [🔜] Keyboard shortcut reference modal (`?` key) [M6.5]
- [🔜] Offline indicator (WebSocket disconnect) [M6.5]

---

## Settings & Preferences

- [🔜] User preferences store (`UserPreferences` table or `User.preferences JSONB`) [M1.6]
- [🔜] Card size preference (S/M/L) [M1.6]
- [🔜] Character card order (drag-and-drop persisted) [M1.6]
- [🔜] Quick Dice widget toggle [M1.5B]
- [🔜] Session notification settings (duration, event types, on/off) [M3.8]
- [🔜] Theme preference [M0.5.5]
- [🔜] Dark mode toggle (system preference + manual, persisted to profile) [M6.5]

---

## Self-Hosting & Infrastructure

- [🔜] Docker Compose stack: web + postgres + redis + nginx [M6.1]
- [🔜] One-command setup: `docker compose up -d` [M6.1]
- [🔜] `SELF_HOSTING.md` (DigitalOcean, Raspberry Pi, VPS, Coolify, Dokku, Render) [M6.1]
- [🔜] Zod env validation on startup [M0.5]
- [🔜] Pino structured logging [M0.5]
- [🔜] Husky pre-commit hooks [M0.5]
- [🔜] Error boundary + 404/500 pages [M0.5]
- [🔜] GitHub Actions CI: lint → type-check → build [M0.1] ✅
- [🔜] Health check endpoint (`/api/health`) [M0.5] ✅
- [🔜] SMTP for email invites and password reset [M6.1]
- [🔜] Optional Cloudflare Tunnel support [M6.1]
- [🔜] Data backup guide + upgrade guide [M6.1]

---

## Security

- [🔜] Formula sandbox audit (no access to `window`, `eval`, `fetch`) [M6.4]
- [🔜] CSRF protection on all mutating routes [M6.4]
- [🔜] Rate limiting: 60 req/min per IP (Redis-based) [M6.4]
- [🔜] Rate limiting: 30 req/min for public character endpoints [M1.7]
- [🔜] Zod validation on all API request bodies [M6.4]
- [🔜] Content Security Policy headers [M6.4]
- [🔜] `pnpm audit` in CI + Dependabot [M6.4]
- [🔜] OWASP Top 10 self-audit [M6.4]

---

## Performance

- [🔜] Next.js bundle < 150KB first-load JS [M6.2]
- [🔜] `React.memo` + `useMemo` on formula evaluation [M6.2]
- [🔜] WebSocket event batching (debounce rapid HP changes) [M6.2]
- [🔜] MiniSearch index loaded once, no search round-trips [M6.2]
- [🔜] DB indexes on `Character.campaignId`, `Session.campaignId`, `CompendiumEntry.type` [M6.2]
- [🔜] Lighthouse CI: ≥ 90 performance, ≥ 95 accessibility [M6.2]

---

## Accessibility

- [🔜] Full keyboard navigation [M6.3]
- [🔜] ARIA labels on all icon-only buttons [M6.3]
- [🔜] Screen reader testing (NVDA + VoiceOver) [M6.3]
- [🔜] WCAG AA color contrast on all themes [M6.3]
- [🔜] `prefers-reduced-motion` support [M6.3]
- [🔜] Skip-to-content link [M6.3]

---

## Community & Ecosystem (Post-v1.0)

- [🔜] Public homebrew registry (separate GitHub repo) [M7.1]
- [🔜] In-app "Browse homebrew" panel [M7.1]
- [🔜] Sheet template export (strips values, keeps schema + layout) [M7.2]
- [🔜] Built-in templates: standard 5e, Starter Set, Spellcaster, Martial [M7.2]
- [🔜] Campaign sharing links (email or Discord invite) [M7.3]
- [🔜] Avatar + portrait upload to S3/R2 (cloud version) [M7.3]
- [🔜] Campaign history timeline [M7.3]
- [🔜] AI DM assistant — "summarize last session", "generate an encounter" (stretch) [M7.3]
- [🔜] System-agnostic sheet engine mode [M7.4]
- [🔜] Community schema packs: Pathfinder 2e, CoC 7e, Blades in the Dark, Shadowrun 6e [M7.4]
- [🔜] Multi-system campaign support [M7.4]

---

## Totals

| Area | Features |
|---|---|
| Auth & Identity | 7 |
| Character Management | 13 |
| Character Roster | 11 |
| Character Card | 8 |
| Character Sheet | 16 |
| Dice | 11 |
| Compendium & Books | 18 |
| Google Sheets Import | 16 |
| Session Table | 31 |
| DM Tools | 13 |
| Homebrew & Plugins | 12 |
| Navigation & Global UI | 7 |
| Settings & Preferences | 7 |
| Self-Hosting & Infrastructure | 13 |
| Security | 8 |
| Performance | 6 |
| Accessibility | 6 |
| Community & Ecosystem | 11 |
| **Total** | **214** |

---

*Beyond1d1 · Complete Feature List · May 2026*
