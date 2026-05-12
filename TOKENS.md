cat > TOKENS.md << 'EOF'

# 🎨 Beyond1d1 Design Tokens

All visual values are defined in `styles/tokens.css`.
**Never hardcode colors, spacing, or radii in components.**
Always reference a semantic token.

## Color Tokens (per theme)

| Token                    | Dark      | Parchment | Arcane    | Used for             |
| ------------------------ | --------- | --------- | --------- | -------------------- |
| `--color-bg-base`        | `#0c0a09` | `#f5f0e8` | `#0d0b1a` | Page background      |
| `--color-bg-surface`     | `#1c1917` | `#ede6d6` | `#151228` | Cards, panels        |
| `--color-bg-elevated`    | `#292524` | `#e0d8c4` | `#1e1935` | Dropdowns, inputs    |
| `--color-text-primary`   | `#f5f5f4` | `#1a1409` | `#ede9ff` | Main text            |
| `--color-text-secondary` | `#a8a29e` | `#4a3c28` | `#9d94cc` | Labels, captions     |
| `--color-accent`         | `#c9a84c` | `#8b3a0f` | `#818cf8` | Buttons, focus rings |
| `--color-hp-high`        | `#16a34a` | `#15803d` | `#059669` | HP bar > 60%         |
| `--color-hp-mid`         | `#d97706` | `#b45309` | `#d97706` | HP bar 30–60%        |
| `--color-hp-low`         | `#dc2626` | `#b91c1c` | `#dc2626` | HP bar < 30%         |

> Dark-Cho is identical to Dark except `--color-hp-high` (`#4a8c6a`),
> `--color-status-active-bg` (`#1a3326`), and `--color-status-active-text` (`#6aaa88`).

## Class Identity Colors

Class colors are NOT CSS variables. They live in `lib/class-colors.ts`.

```typescript
import { getClassColor } from '@/lib/class-colors'
const { color, icon } = getClassColor('Wizard')
// → { color: '#5c4a8a', icon: '🔮', label: 'Wizard' }
```
