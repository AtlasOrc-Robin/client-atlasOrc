# AtlasOrc — Design System Master

Generated from content.json · ui-ux-pro-max skill · 2026-04-27

---

## Product Profile

| Attribute | Value |
|---|---|
| Product | Premium AI Automation Agency Landing Page |
| Industry | Tech Service |
| Vibe | Premium & High-End |
| Style | Dark Luxury Minimalism |
| Reference | marimba.design |

---

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#cdad6d` | CTAs, highlights, headings |
| `--color-primary-dim` | `#b8985a` | Hover states, borders |
| `--color-accent` | `#e1c481` | Subtle highlights, icons |
| `--color-bg` | `#1a1a1a` | Page background |
| `--color-bg-card` | `#2a2a2a` | Card/section backgrounds |
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-muted` | `#cccccc` | Secondary text, captions |
| `--color-border` | `#404040` | Dividers, card borders |

---

## Typography

| Role | Font | Weight | Size | Letter Spacing |
|---|---|---|---|---|
| Heading | Playfair Display | 300 | 3rem–6rem | 0.08em |
| Subheading | Playfair Display | 400 | 1.5rem–2rem | 0.04em |
| Body | Inter | 400 | 1rem (16px) | normal |
| Caption | Inter | 400 | 0.875rem | 0.02em |
| Label | Inter | 500 | 0.75rem | 0.1em uppercase |

### Font Scale
`12 → 14 → 16 → 18 → 24 → 32 → 48 → 64 → 80` px

### Line Heights
- Body: 1.6
- Headings: 1.15
- Labels: 1.3

---

## Spacing System (8pt grid)

`4 8 12 16 24 32 48 64 80 96 120 140` px

Section spacing: **140px** vertical padding

---

## Design Tokens (CSS Variables)

```css
--heading-weight: 300;
--letter-spacing: 0.08em;
--radius: 2px;
--section-spacing: 140px;
--shadow-style: none;
```

---

## Button System

**buttonStyle: ghost-thin**

```css
/* Ghost Thin Button */
border: 1px solid var(--color-primary);
background: transparent;
color: var(--color-primary);
padding: 10px 28px;
border-radius: var(--radius);
font-family: var(--font-body);
font-size: 0.875rem;
font-weight: 500;
letter-spacing: 0.1em;
text-transform: uppercase;
transition: all 0.3s ease;

/* Hover */
background: var(--color-primary);
color: var(--color-bg);
```

---

## Animation System (fade-elegant)

Inspired by marimba.design: editorial, unhurried, staggered entrances.

| Property | Value |
|---|---|
| Pattern | opacity 0→1, y 40→0 |
| Duration | 1.0–1.2s |
| Ease | power2.out |
| Stagger | 0.15s between children |
| Trigger | `top 80%` (ScrollTrigger) |
| Exit | No exit animation (landing page) |

### GSAP Config
```ts
gsap.fromTo(targets, 
  { opacity: 0, y: 40 },
  { 
    opacity: 1, 
    y: 0, 
    duration: 1.1,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: { trigger, start: 'top 80%' }
  }
)
```

### Reduced Motion
All animations wrapped in `matchMedia('(prefers-reduced-motion: reduce)')` check.

---

## Component Patterns

### Cards (Service / Testimonial)
- Background: `--color-bg-card`
- Border: `1px solid var(--color-border)`
- Radius: `var(--radius)` = 2px
- Padding: 32px
- No box-shadow
- Hover: border-color → `--color-primary-dim`, subtle transition

### Section Layout
```
max-width: 1280px
padding-x: clamp(24px, 5vw, 80px)
padding-y: var(--section-spacing) = 140px
```

### Navbar
- Transparent over hero
- Solid `--color-bg` on scroll (y > 60)
- Logo: Playfair Display, primary color
- Links: Inter 500, uppercase, 0.1em spacing
- CTA: ghost-thin button

---

## Accessibility Targets

- Text contrast: ≥4.5:1 on `--color-bg`
- `--color-text` (#fff) on `--color-bg` (#1a1a1a): 12.6:1 ✓
- `--color-primary` (#cdad6d) on `--color-bg` (#1a1a1a): 6.7:1 ✓
- `--color-text-muted` (#ccc) on `--color-bg` (#1a1a1a): 9.7:1 ✓
- Focus rings: 2px solid `--color-primary`, 2px offset
- All interactive elements: min 44×44px touch target

---

## Anti-Patterns (Avoid)

- No box shadows anywhere (shadowStyle: none)
- No border-radius > 4px
- No vibrant/saturated colors — gold palette only
- No bounce or spring animations — only ease-out
- No emoji as icons — use Lucide React SVG icons
- No lorem ipsum — contextual copy from business data only
- No hardcoded hex values in components — always CSS vars
