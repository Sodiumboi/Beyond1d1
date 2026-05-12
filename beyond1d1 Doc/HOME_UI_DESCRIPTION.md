# Beyond1d1 — Home UI Description & Spec
> Reference document — written from the Home.svg mockup (May 2026 draft).
> Status: **RESOLVED — all 32 questions answered May 2026.**
> Last updated: May 2026

---

## What this document is

A precise description of every element visible in the Home screen mockup, with all open questions resolved. Written for future Claude sessions to reference without needing the original image.

The mockup is an **early draft** in the parchment theme. Proportions and placeholder styling are expected to shift. What it establishes is the *spatial logic and intent* of the layout.

---

## Screen: Character Roster — `/characters`

Post-login landing page. The user sees their characters, a way to add more, and two persistent floating utility widgets.

---

## 1 — Header Bar

**Full-width horizontal band at the top. Height ~60px. Background uses the current theme's surface/band color — cream in parchment, dark in dark theme. NOT hardcoded to `#FEF3C7`.**

### Left zone
- **Wordmark: `B1d`** — this is the final logo derived from "Beyond1d1." The `B` is large and serif, rendered in sienna/red-brown. The `1d` is smaller, superscript-style. A bracket or glyph sits immediately to the right. This is intentional — the bracket is part of the logotype identity (references dice notation bracket).
- **Vertical separator** — thin line after the logo.
- **Navigation links with dropdowns:**
  - **Characters ▼** — dropdown contains: All current characters / Create character / Public shared sheets
  - **Campaigns** — NO dropdown. Plain link, navigates directly.
  - **DM ▼** — dropdown contains: Screen / Campaign manage / DM Homebrew manager
  - **Books ▼** — dropdown contains: All books / Import book from `.json` / 5e-tools / Homebrew (Items, attacks, equipment, etc.) / Export

### Right zone
- **Campaign context pill** — only visible when the user has "sat at the table" (joined an active session). Also visible for sessions they're spectating without a character. Shows: `[Campaign abbreviation] : [Campaign name]` + nested **"go back"** ghost button that returns directly to the table screen.
  - The colon after the abbreviation is a label delimiter — what follows (round number, status, etc.) is TBD.
- **User avatar** — Discord profile image when available. Fallback: filled circle with the user's **username initials**. Color of fallback circle is TBD (likely accent color or a hash-based color from username).

### Header theming
Uses the theme's own color tokens — not locked to any specific hex. In dark theme this will use `--color-bg-surface` or a dedicated header token. **Dark theme header design does not yet exist — needs to be designed.**

---

## 2 — Page Body

**Background:** theme base color (`--color-bg-base`).

**Section title:** "My Characters" — left-aligned, ~24px, sans-serif medium. No decoration.

### Card grid layout
- **Full-width wrapping CSS grid.** Cards fill the entire page width and wrap to new rows when out of space.
- The two floating widgets (AOD popup + Quick Dice tray) sit **on top of** the grid as fixed-position overlays. There is no reserved column for them.
- **Three card size options** selectable in user settings (small / medium / large — exact dimensions TBD).
- **Additional controls needed (not in mockup):** search bar, sort controls (Recent / Level / Name), **custom drag-and-drop arrangement** (mobile home screen model — user can reorder cards freely, order persists to their account).
- The add-new tile always trails the last character card. Even in custom drag-and-drop mode it stays at the end.
- Empty space in the mockup was not intentional — the mockup only had 2 oversized cards.

---

## 3 — Character Cards

Horizontal card layout: **portrait image left, info + actions right, class color tab on far right edge.**

### Portrait area (left ~40%)
- Large illustrated/anime portrait image, flush to card edges (no padding), clipped by rounded-rectangle.
- **Source:** image URL from the imported GSheet (`image_url` field). If no URL, user can manually upload an image.
- **Fallback (no image):** TBD — likely class icon or character initials in class color.
- Only one portrait per card. The two-image appearance in Jin Lóng's card was a **mockup error** — a leftover image that wasn't deleted.

### Info area (right ~50%)
Card background matches page body (theme base color).

**Text fields displayed:**
- Character name — large bold serif, ~22px. Supports CJK and mixed-script names (e.g., "Jin Lóng 美慧 龙").
- Race — regular weight, smaller.
- Class + level — same line as or directly below race.
- Campaign tag(s) — plain text, all-caps abbreviation(s). **Maximum 2 shown**, comma-separated. If more than 2 campaigns, the overflow is shown in a **tooltip on hover**.

**What is NOT shown on the card:**
- HP bar — not here. Open Sheet to see it.
- Ability scores — not here.
- AC badge — not here.
- Conditions — not here.
- Any numeric stats whatsoever.

**Three action buttons** — stacked vertically, pill-shaped, full-width within info column. Current gray styling is placeholder — design system tokens not yet applied:
1. **"Open Sheet"** — navigates to `/characters/[id]` sheet view.
2. **"Go to Campaign"** — behavior depends on session state:
   - **Green dot visible:** navigates directly to the active live table for that campaign (same destination as clicking the header campaign pill).
   - **No green dot:** opens a **sandbox/mock table** — identical UI to the real table but solo, no other players. For testing rolls, layouts, etc.
3. **"more"** — opens a small **context menu** with:
   - Delete character
   - Share character externally
   - Duplicate character
   - Settings for the side color tab (change color / hide tab)

### Right-edge class color tab
- Solid color vertical strip, ~30–35px wide, full card height, rounded on the right side.
- Color = the character's class color from `getClassColor()` registry, or `sheetData.classColorOverride` if set.
- **Purely decorative** — not interactive directly (tab settings live in the "more" menu).
- Can be **hidden per-character** via the "more" → Settings menu.
- Examples visible in mockup: warm brown (~`#7a4a2a`) for Fighter, deep plum (~`#7a2a6a`) for Bard.

---

## 4 — Add New / Import Card

**Same grid cell as a character card. Always the last item in the grid.**

- **Background:** pure white (intentionally brighter than page background — signals "empty slot").
- **Border:** thick dashed border, rounded corners. Intentional visual language — "a slot waiting to be filled," like an empty card pocket in a binder.
- **Large `+` icon** centered, heavy weight.
- **Label:** "Import via GSheet or Create New" (mockup typo "of" → "or").
- **On click:** opens a dialog/modal prompting the user to choose:
  - Build from scratch (creation wizard)
  - Import from Google Sheets (`.xlsx` / `.csv` upload, Milestone 2.5)
- This is a **single tile** — not split into two separate tiles.

---

## 5 — AOD Session Popup (persistent floating notification)

**A real-time, persistent notification overlay. It follows the user across every page in the app.**

### Trigger
Appears when the user has joined a session ("sat at the table"). Also appears for spectated sessions (no active character required). Persists until the user explicitly clicks "leave the table."

### Behavior
- Shows the **most recent action from any player** in the active session — dice rolls, chat messages, attacks.
- Each notification **auto-dismisses after ~3 seconds** (fades out on its own).
- Multiple notifications queue and appear one after another.
- User can **customize notification behavior in settings** (disable entirely, change duration, etc.).
- Functionally similar to macOS notification banners — appear, show briefly, fade.

### Visual structure
- **Header tab/label:** `[Campaign abbreviation] :` — e.g., "AOD :" — sitting above the panel like a label tab. What follows the colon is **TBD**.
- **Notification body:** Two-column layout:
  - Left: small portrait thumbnail of the acting character (~70×70px), rounded rectangle, light-tinted background matching class color.
  - Right: dense stat/action text on near-black background:
    - Gray subheader: target/context info
    - Bold white: action name (e.g., "Nightingale attacks with a Songbird!")
    - **Meta:** To Hit roll breakdown, Damage roll breakdown
    - **Effect:** Weapon/ability description text (italic)
- **Close button:** ✕ in top-right corner to dismiss current notification manually.

### Scope
Persistent across **all pages**. Can be toggled off globally in settings.

---

## 6 — Quick Dice Tray (persistent floating panel)

**A lightweight, always-available dice roller. Completely separate from the session dice log. Not broadcast to table.**

### Purpose
Quick "fun rolls" outside of a formal session — equivalent to clicking a blue highlighted roll in 5e-tools. Useful for: rolling ability checks on the fly, testing formulas, rolling random tables.

### Interface
- **Header bar:** "Quick Dice" label + **▼ collapse chevron** right-aligned.
- **Collapse behavior:** minimizes to just the header bar — does not hide entirely.
- **Body:** dice roller input. Supports notation like `/r 1d100+4`. Results appear temporarily — no log kept.
- **No connection to session table** — these rolls are private, not broadcast.
- **Potential integration:** clicking a blue highlighted roll anywhere in Books/Compendium pops the result here (mirrors 5e-tools UX). Design TBD.

### Scope
Persistent across **all pages**, including while sitting at the table. Can be toggled off in settings.

---

## 7 — Layout Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│  [B1d|]  Characters▼  Campaigns  DM▼  Books▼    [AOD pill][👤]  │  ← Header (theme color)
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  My Characters          [search] [sort] [size]                   │
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │[art][inf]│ │[art][inf]│ │[art][inf]│ │[art][inf]│            │  ← Full-width wrapping grid
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌ ─ ─ ─ ─ ┐                         │
│  │[art][inf]│ │[art][inf]│    +  Add                            │
│  └──────────┘ └──────────┘ └ ─ ─ ─ ─ ┘                         │
│                                                                   │
│  (content scrolls)         ┌────────────────────┐  (fixed)      │
│                             │ AOD :              │               │  ← Session notification
│                             │ [portrait][action] │               │    floating, fades ~3s
│                             └────────────────────┘              │
│                             ┌────────────────────┐  (fixed)     │
│                             │ Quick Dice      ▼  │               │  ← Quick dice tray
│                             │ /r ____________    │               │    always present
│                             └────────────────────┘              │
└──────────────────────────────────────────────────────────────────┘
```

**Key layout rules:**
- Cards fill the full page width. Floating widgets overlay on top — no reserved column.
- Content area scrolls; floating widgets stay fixed to viewport.
- Two-column split (content | chat/dice) **only exists on the Play Table screen** — never here.
- Dark theme version **has not been designed** — to be created using design system tokens.

---

*Beyond1d1 · Home UI Description · May 2026 · All 32 questions resolved.*
