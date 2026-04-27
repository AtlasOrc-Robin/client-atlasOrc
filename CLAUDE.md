# CLAUDE.md

## Stack
Next.js 14+ App Router · TypeScript strict · Tailwind · shadcn/ui · GSAP · Supabase (if needed) · Vercel · pnpm

---

## Source of truth: content.json

Everything — copy, colors, sections, features — comes from `content.json`. Never hardcode business data.

### Shape you'll always find:
```
meta          → slug, title, lang
business      → name, industry, phone, email, address, hours
theme.colors  → primaryColor, secondaryColor, accent, bg, bgCard, text, textMuted, border
theme.tokens  → headingWeight, letterSpacing, borderRadius, sectionSpacing, animationStyle, shadowStyle, buttonStyle
theme.fonts   → heading (Google Font), body (Google Font)
theme.vibes   → array of selected vibes (first = dominant)
theme.referenceUrl → animation/motion direction — study it
seo           → metaTitle, metaDescription, keywords, ogImage
services[]    → id, name, description, icon, featured
sections[]    → id, enabled, order, data, _placeholder?
featureFlags  → chatbot, booking, appointmentReminders, reviewCollection, googleReviewsWidget, contactForm, faq, newsletter, paymentLink, gallery, testimonials
social        → instagram, facebook, twitter, linkedin, youtube
specialRequests → free text, treat as hard requirements
```

### sections[] rendering rule:
```ts
sections
  .filter(s => s.enabled)
  .sort((a, b) => a.order - b.order)
  .map(s => <SectionRegistry[s.id] data={s.data} placeholder={s._placeholder} />)
```

### _placeholder: true rule:
Section is enabled but `data` is null. Build the full section shell. Generate contextually relevant placeholder copy based on `business.name` + `business.industry`. Never use lorem ipsum.

### theme.tokens → CSS variables:
```ts
'--heading-weight': tokens.headingWeight
'--letter-spacing': tokens.letterSpacing
'--radius': tokens.borderRadius
'--section-spacing': tokens.sectionSpacing
'--shadow-style': tokens.shadowStyle  // none | subtle | soft | hard | colored
```

### animationStyle values:
- `fade-elegant` → slow fade-up, staggered, no overshoot
- `fade-minimal` → opacity only, fast, no movement
- `fade-warm` → gentle fade-up, soft easing
- `slide-punch` → translate + scale, fast, punchy
- `bounce-pop` → spring easing, overshoot
- `fade-classic` → fade-in, conservative timing

Always check `theme.referenceUrl` — motion behavior there overrides animationStyle if more specific.

### buttonStyle values:
`ghost-thin` · `ghost-sharp` · `filled-bold` · `filled-rounded` · `filled-pill` · `filled-classic`

---

## Skills — load exactly when triggered, not before

Global path: `~/.claude/skills/[folder]/SKILL.md`

| Skill | Folder | Load when |
|---|---|---|
| UI/UX Pro Max | `ui-ux-pro-max` | Before building any component or section. Run design-system generator first → persist to `design-system/MASTER.md`. Page overrides → `design-system/pages/<page>.md`. |
| Vercel React Best Practices | `vercel-react-best-practices` | While writing any React/Next.js code. Not after. RSC boundaries, bundle size, waterfalls decided here. |
| Supabase Postgres Best Practices | `supabase-postgres-best-practices` | Only if featureFlags has: `chatbot`, `booking`, `reviewCollection`, or `loginSignup` = true. RLS required on every user-data table. |
| Web Design Guidelines | `web-design-guidelines` | After all sections built. Audit gate — nothing ships without passing. Contrast, a11y, `prefers-reduced-motion`, responsive breakpoints. |

Pairing rule: build with `ui-ux-pro-max` → audit with `web-design-guidelines` before done.

---

## Build sequence

```
1. Read content.json fully before touching any file
2. Load ui-ux-pro-max → generate design system → write design-system/MASTER.md
3. Load vercel-react-best-practices
4. Build layout + theme (CSS variables from theme.tokens + theme.colors + theme.fonts)
5. Import Google Fonts (theme.fonts.heading + theme.fonts.body)
6. Build sections in order (sections[].order) — enabled only
7. Wire featureFlags (chatbot widget, booking embed, newsletter form, etc.)
8. If Supabase needed → load supabase-postgres-best-practices → schema + RLS
9. SEO: metadata from seo{}, OG tags, sitemap.xml, robots.txt
10. Load web-design-guidelines → full audit → fix all flags
11. Final check against Done criteria below
```

---

## Section registry

Every section accepts `{ data, placeholder }` props.

| id | Component | Notes |
|---|---|---|
| `hero` | HeroSection | GSAP on mount, animationStyle from tokens |
| `services` | ServicesSection | services[] filtered by enabled, featured first |
| `booking` | BookingSection | Cal.com embed or contact CTA |
| `testimonials` | TestimonialsSection | placeholder if _placeholder: true |
| `faq` | FAQSection | Accordion, faqs[] array |
| `gallery` | GallerySection | Masonry or grid, placeholder if null |
| `blog` | BlogSection | Static placeholder cards if no data |
| `contact` | ContactSection | Form if featureFlags.contactForm, else details only |
| `footer` | FooterSection | social{} links, business.name, tagline |

---

## featureFlags wiring

| Flag | What to build |
|---|---|
| `chatbot` | Floating chat widget (bottom-right). Stub if no provider specified. |
| `booking` | Cal.com inline embed or button → `#booking` |
| `appointmentReminders` | Note in handover — no UI component needed |
| `reviewCollection` | Post-CTA micro-copy ("Had a great experience? Leave us a review") |
| `googleReviewsWidget` | Live Google Reviews feed component |
| `contactForm` | Form with name, email, phone, message. Supabase or Resend. |
| `newsletter` | Email capture, Supabase or Resend |
| `paymentLink` | CTA button → business payment URL or placeholder |
| `gallery` | GallerySection enabled |
| `testimonials` | TestimonialsSection enabled |

---

## Done means

- All `sections[].enabled === true` sections render with correct data
- `_placeholder` sections have contextual copy, not lorem ipsum
- theme.tokens applied as CSS variables globally
- Google Fonts loaded (heading + body only — max 2)
- All featureFlags wired
- `web-design-guidelines` audit: all pass
- TypeScript strict: no errors
- No `console.log`, debug code, commented blocks
- Lighthouse score target: Performance 90+, SEO 100, A11y 90+
- Mobile nav works, no horizontal scroll, images lazy-loaded
- `.env.example` has all required vars
- `specialRequests` from content.json addressed explicitly

---

## Don't

- Hardcode any business name, color, copy, or URL — always from content.json
- Load Supabase skill if no DB feature is flagged
- Skip web-design-guidelines audit
- Use placeholder images from external URLs in production paths
- Introduce a dependency without stating what it replaces
- Generate the same layout twice — sections must feel distinct
- Ignore `theme.referenceUrl` — study its motion + layout before building
- Invent API behaviour — verify before using
- Catch-and-ignore errors
- Disable lint, typecheck, or tests to pass
