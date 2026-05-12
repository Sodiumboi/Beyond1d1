// lib/class-colors.ts

export interface ClassColorEntry {
  color: string    // hex — main identity color (cards, badges, sheet header)
  label: string    // display name (correctly cased)
  icon: string     // emoji icon shown on character cards
}

// ── Built-in SRD + common expansion classes ──────────────────────
// Add new official classes here as needed. Keys are always lowercase.
const BASE_CLASS_COLORS: Record<string, ClassColorEntry> = {
  barbarian:  { color: '#8a2a2a', label: 'Barbarian',  icon: '🪓' },
  bard:       { color: '#7a2a6a', label: 'Bard',       icon: '🎵' },
  cleric:     { color: '#7a6a2a', label: 'Cleric',     icon: '✨' },
  druid:      { color: '#3a6a2a', label: 'Druid',      icon: '🌿' },
  fighter:    { color: '#8a4a2a', label: 'Fighter',    icon: '⚔️' },
  monk:       { color: '#2a6a6a', label: 'Monk',       icon: '👊' },
  paladin:    { color: '#6a5a2a', label: 'Paladin',    icon: '🛡️' },
  ranger:     { color: '#4a7c59', label: 'Ranger',     icon: '🏹' },
  rogue:      { color: '#2a4a5c', label: 'Rogue',      icon: '🗡️' },
  sorcerer:   { color: '#6a2a4a', label: 'Sorcerer',   icon: '⚡' },
  warlock:    { color: '#4a2a6a', label: 'Warlock',    icon: '🔱' },
  wizard:     { color: '#5c4a8a', label: 'Wizard',     icon: '🔮' },
  // Expansions
  artificer:  { color: '#4a6a7a', label: 'Artificer',  icon: '⚙️' },
  bloodhunter:{ color: '#7a1a2a', label: 'Blood Hunter',icon: '🩸' },
}

// ── Runtime registry ─────────────────────────────────────────────
// Starts with base classes. Homebrew packs and user overrides add to this.
const registry = new Map<string, ClassColorEntry>(
  Object.entries(BASE_CLASS_COLORS)
)

// ── Fallback for completely unknown classes ───────────────────────
const FALLBACK: ClassColorEntry = {
  color: '#57534e',
  label: 'Unknown',
  icon: '⚔️',
}

/**
 * Get the color entry for a class name.
 * Accepts a per-character color override (hex string) from sheetData.
 * Falls back gracefully for any unknown class — never throws.
 *
 * @param className  - e.g. "Wizard", "Chronomancer", "Shadow Dancer"
 * @param override   - optional hex from Character.sheetData.classColorOverride
 */
export function getClassColor(
  className: string,
  override?: string | null
): ClassColorEntry {
  if (override) {
    // User has picked a custom color — use it, keep label/icon from registry
    const key = className.toLowerCase().trim()
    const base = registry.get(key) ?? FALLBACK
    return { ...base, color: override }
  }
  const key = className.toLowerCase().trim()
  return registry.get(key) ?? { ...FALLBACK, label: className }
}

/**
 * Register a homebrew or custom class at runtime.
 * Called by the homebrew pack importer when loading a new pack.
 *
 * @param className     - e.g. "chronomancer"
 * @param entry         - color, label, icon
 * @param allowOverride - set true to replace a built-in class (e.g. player
 *                        wants a different color for Wizard globally)
 */
export function registerClassColor(
  className: string,
  entry: ClassColorEntry,
  allowOverride = false
): void {
  const key = className.toLowerCase().trim()
  if (!allowOverride && BASE_CLASS_COLORS[key]) {
    console.warn(
      `[ClassColors] "${key}" is a built-in class. ` +
      `Pass allowOverride=true to replace it, or use a per-character ` +
      `color override in sheetData.classColorOverride instead.`
    )
    return
  }
  registry.set(key, entry)
}

/** List all registered classes — built-in + any homebrew registered so far. */
export function listClassColors(): Map<string, ClassColorEntry> {
  return new Map(registry)
}

/** Check if a class name is a built-in SRD/expansion class. */
export function isBuiltInClass(className: string): boolean {
  return !!BASE_CLASS_COLORS[className.toLowerCase().trim()]
}