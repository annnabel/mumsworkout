---
name: Mum's Workout
description: A calm, phone-first guide that walks one person through her workout, one exercise at a time.
colors:
  bg: "oklch(1 0 0)"
  surface: "oklch(0.978 0.006 245)"
  surface-2: "oklch(0.955 0.009 245)"
  line: "oklch(0.90 0.012 245)"
  line-strong: "oklch(0.82 0.015 245)"
  ink: "oklch(0.25 0.02 255)"
  ink-soft: "oklch(0.42 0.02 255)"
  primary: "oklch(0.50 0.11 250)"
  primary-strong: "oklch(0.44 0.11 250)"
  primary-wash: "oklch(0.955 0.028 250)"
  accent-coral: "oklch(0.66 0.15 35)"
  go: "oklch(0.52 0.13 152)"
  go-strong: "oklch(0.46 0.13 152)"
  go-wash: "oklch(0.95 0.045 152)"
  caution: "oklch(0.74 0.15 78)"
  caution-ink: "oklch(0.44 0.10 62)"
  caution-wash: "oklch(0.965 0.045 82)"
  danger: "oklch(0.55 0.19 25)"
  danger-ink: "oklch(0.45 0.16 25)"
  danger-wash: "oklch(0.965 0.03 25)"
typography:
  display:
    fontFamily: "Figtree, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2rem, 9vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(1.7rem, 8vw, 2.15rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.15
  body:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "0.92rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
  # Same roles, same sizes and weights - only the family changes, and only for
  # Vietnamese text. Figtree has no Vietnamese glyphs; Mulish does.
  vietnamese:
    fontFamily: "Mulish, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  sm: "12px"
  md: "18px"
  lg: "26px"
  pill: "999px"
spacing:
  pad: "clamp(1.1rem, 5vw, 1.6rem)"
  tap: "3.75rem"
  cta: "4.4rem"
components:
  button-go:
    backgroundColor: "{colors.go}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "1rem 1.4rem"
    height: "4.4rem"
  button-go-hover:
    backgroundColor: "{colors.go-strong}"
    textColor: "{colors.bg}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "1rem 1.4rem"
    height: "3.75rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.bg}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1rem 1.4rem"
    height: "3.75rem"
  vital-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1rem 1.1rem"
  callout-info:
    backgroundColor: "{colors.primary-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.15rem 1.2rem"
  callout-warn:
    backgroundColor: "{colors.caution-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.15rem 1.2rem"
  callout-danger:
    backgroundColor: "{colors.danger-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.15rem 1.2rem"
---

# Design System: Mum's Workout

## 1. Overview

**Creative North Star: "The Patient Guide"**

Everything here behaves like a trusted person walking beside you, one step at a time. The system never rushes, never crowds, and never assumes you already know the way. Screens hold a single idea at a time — one exercise, one big demo, a short list of cues — on a comfortable phone-width column (`34rem`) of calm white. The scale is deliberately oversized: an 18px root, 1.15rem body, and headings that reach 2.6rem, because the one person who uses this is 50+, does not use technology often, and must understand every screen on first glance. This low density is a committed override of normal product-UI density norms, made in service of legibility and calm.

The palette is a **pure-white daylight** carrying a single **deep, confident blue** for guidance, with a tightly-governed safety vocabulary: green means go, amber means be careful, red means stop. Warmth comes from the humanist letterforms of Figtree and generous rounding (up to 26px), not from a tinted background. The result should read as reassuring and human — a guide, not a gym.

This system explicitly rejects the clinical and the sporty: no dashboards, no hero-metric templates, no jargon (never "RPE"), no dark "athletic" theming, no hidden menus or gestures to discover, no dense stat grids. If a screen feels like a fitness tracker or a hospital form, it has failed.

**Key Characteristics:**
- Phone-first, single-column, one-idea-per-screen.
- Oversized type and ≥60px tap targets for older eyes and hands.
- Pure-white daylight surface; one blue guide color; strict semantic safety colors.
- Plain language, always. No jargon, no abbreviations, no hidden affordances.
- Injury prevention is the north star of the content; the visual system serves it by making cues and warnings impossible to miss.

## 2. Colors

A pure-white daylight surface, one confident blue for guidance, and a disciplined traffic-light vocabulary for safety.

### Primary
- **Confident Blue** (`oklch(0.50 0.11 250)`): The single guide color. Carries the primary action, the progress bar, step kickers, selected language, numbered setup markers, and quick-link icons. `primary-strong` (`oklch(0.44 0.11 250)`) is the hover/pressed and text-on-wash shade; `primary-wash` (`oklch(0.955 0.028 250)`) is the pale blue tint behind chips, numbers, and info callouts.

### Secondary
- **Warm Coral** (`oklch(0.66 0.15 35)`): A single warm accent, used sparingly for human warmth. It is a seasoning, never a second brand color.

### Tertiary — the Safety Vocabulary
- **Go Green** (`oklch(0.52 0.13 152)`): "Do this" cues, the effort meter, completed checklist items, the big Start button, and the done screen. Means *proceed / correct / finished*.
- **Caution Amber** (`oklch(0.74 0.15 78)`, ink `oklch(0.44 0.10 62)`): "Avoid this" / common-mistake blocks and warning callouts. Means *be careful*. The darker `caution-ink` carries any amber text so contrast holds.
- **Stop Red** (`oklch(0.55 0.19 25)`, ink `oklch(0.45 0.16 25)`): The "when to stop and see a professional" list, pain warnings, danger callouts. Means *stop*. Rare by design; its rarity is what makes it loud.

### Neutral
- **Ink** (`oklch(0.25 0.02 255)`): Body copy and headings. A soft near-black with a faint cool cast, never pure `#000`.
- **Ink Soft** (`oklch(0.42 0.02 255)`): Secondary text, meta, captions. Deliberately kept at ~4.5:1 on white — dark enough to read, not a decorative light gray.
- **Surface / Surface-2** (`oklch(0.978 0.006 245)` / `oklch(0.955 0.009 245)`): Faint cool cards, rails, and inactive tracks against the white body.
- **Line / Line-strong** (`oklch(0.90 0.012 245)` / `oklch(0.82 0.015 245)`): Hairlines and stronger borders (e.g. resting button edges).

### Named Rules
**The Traffic-Light Rule.** Green, amber, and red are reserved for safety meaning — go, caution, stop — and never used decoratively. If green appears, it says "correct/proceed"; if red appears, it says "stop." Borrowing a safety color for ornament is prohibited.

**The One-Blue Rule.** There is exactly one guide color. Blue leads the eye to the next action and the current position; it is never spent on decoration that competes with a real cue.

**The Pure-White Rule.** The body background is pure white (`oklch(1 0 0)`), never a cream, sand, or warm-tinted near-white. Warmth is carried by type and rounding, not by tinting the daylight.

## 3. Typography

**Display Font:** Figtree (with `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`)
**Body Font:** Figtree — the same family, in lighter weights.
**Vietnamese Font:** Mulish (same fallback stack), applied by `:lang(vi)`.

**Character:** One highly legible humanist sans, used from 400 to 800, at large sizes. Humanist warmth keeps it human rather than clinical; a single family keeps every screen quiet and consistent. There is no display/body pairing — the range is created by weight and size alone.

**Why there are two families.** Figtree contains no Vietnamese glyphs at all — nothing in `U+1EA0–U+1EF9` — so Vietnamese set in Figtree renders every toned vowel in whatever fallback the phone happens to have, and "Bắt đầu tập" arrives in two typefaces at once. Mulish covers Vietnamese completely and shares Figtree's humanist-geometric skeleton, high x-height, and open apertures. This is not a display/body pairing: the two never meet inside a word, and only one is on screen at a time. Both are self-hosted from `assets/fonts/` (variable, 400–800), so the app carries its own type and needs no network to render.

### Hierarchy
- **Display** (800, `clamp(2rem, 9vw, 2.6rem)`, lh 1.15, ls −0.02em): The Home greeting headline and the Done screen. `text-wrap: balance` for even lines.
- **Headline** (800, `clamp(1.7rem, 8vw, 2.15rem)`, lh 1.15): The exercise/step title on each flow screen.
- **Title** (800, `1.5rem`): Section titles on the full-plan and safety reference pages.
- **Body** (400, `1.15rem`, lh 1.55): All reading copy, cues, and list items. Prose capped ~65–75ch; the `34rem` column keeps it comfortable.
- **Label** (700, `0.92rem`, ls 0.06em, uppercase): The small "SETS × REPS" / "EFFORT" vital labels only.

### Named Rules
**The One-Voice Rule.** One family per language — Figtree for English, Mulish for Vietnamese — and nothing else. No second font is introduced for headings, numbers, or labels. Hierarchy comes from weight (400/500/600/700/800) and size, never from a new typeface. A language face is selected only by `:lang()`, never by hand on individual elements.

**The Read-It-Once Rule.** Nothing that must be understood drops below body size (`1.15rem` on an 18px root). Uppercase tracking is confined to the two tiny vital labels; body and cues are always sentence case and plain-spoken.

## 4. Elevation

Mostly flat, with soft ambient lift reserved for the two elements that must feel "raised toward you": the Today card and the primary CTAs. Depth is otherwise carried by the faint cool surface tint and hairline borders, not by shadow. Sticky headers and footers use a translucent white with a light backdrop-blur so content scrolls calmly beneath them.

### Shadow Vocabulary
- **Ambient soft** (`box-shadow: 0 1px 2px oklch(0.4 0.03 255 / 0.06), 0 6px 20px oklch(0.4 0.03 255 / 0.08)`): The Today card, the Start button, selected language pill. A diffuse, low-contrast lift — never a hard drop shadow.
- **Ambient lifted** (`box-shadow: 0 2px 6px oklch(0.4 0.03 255 / 0.08), 0 18px 40px oklch(0.4 0.03 255 / 0.14)`): Reserved for the most prominent raised surface; used sparingly.

### Named Rules
**The Soft-Lift Rule.** Shadows are soft, blue-tinted, and ambient — they suggest morning light, not UI chrome. If a shadow reads as a hard edge or a 2014-app drop shadow (too dark, blur too small), it is wrong. Flat-by-default; lift only what the user should act on.

## 5. Components

Every interactive surface is oversized, softly rounded, and unmistakably tappable. The feel is reassuring and tactile — big, calm, forgiving.

### Buttons
- **Shape:** Softly rounded (18px, `--r`); pill shapes (999px) only for small toggles/chips.
- **Go (primary CTA):** Go-green fill, white text, tall (`4.4rem`), 1.35rem/700. The single most important action on a screen (Start Workout, Next).
- **Primary:** Confident-blue fill, white text, `3.75rem` min height, 1.2rem/700. Standard forward actions.
- **Ghost:** Transparent with a `line-strong` border; back and secondary actions.
- **Hover / Focus / Active:** Hover darkens to the `-strong` shade; `:active` scales to 0.985 for a gentle press; focus-visible draws a 3px blue outline with 3px offset. Minimum tap target is 60px everywhere.

### Cards / Containers
- **Corner Style:** 18px default (`--r`), 26px (`--r-lg`) for the hero Today card and media frame.
- **Background:** Faint cool `surface` on white; the Today card adds a soft blue radial wash in its top-right corner.
- **Shadow Strategy:** Flat by default; Ambient-soft lift only on the Today card (see Elevation).
- **Border:** 1px hairline (`line`); safety blocks border with a tint of their own semantic hue.

### Instruction Blocks (signature)
Color-coded content blocks that carry the injury-prevention cues:
- **Setup:** White block, blue numbered pills (1, 2, 3…) for the "do this in order" steps.
- **Do this:** Go-wash green background, hand-drawn green check marks.
- **Avoid:** Caution-wash amber background, amber ✕ markers; body text stays ink for readability.
- **Callouts** mirror the same three semantics (info = blue-wash, warn = amber-wash, danger = red-wash), each with a hairline in its own hue.

### Progress & Effort (signature)
- **Progress bar:** 12px pill track (`surface-2`) with a blue fill; width eases over 320ms.
- **Effort meter:** A row of segmented pills that fill green — a plain-language stand-in for "how hard should this feel," deliberately replacing any numeric RPE scale.

### Media Frame (signature)
- A 4:3 rounded frame holding the form-demo GIF, `object-fit: contain` so the whole movement (head to feet) is always visible — **never cropped**. A missing GIF shows a friendly striped placeholder naming the exact filename the maintainer must add.

### Language Switch (signature)
Two shapes for the same control, because it has to be reachable on every screen without crowding any of them:
- **Full** (Home only): a globe-and-label row with both languages as pills side by side, each written in its own language and carrying its own `lang` attribute. The current one is a filled blue pill.
- **Compact** (workout flow and all reference pages): a single blue-wash pill naming the language it switches *to*, written in that language — it reads to whoever needs it. One tap, no menu; there are only ever two.

Switching never costs her anything: the same screen re-renders in place, keeping her step, her scroll position, her ticks and her open accordions, with focus returned to the switch and a polite live-region announcement.

### Navigation & Chrome
- No persistent app nav. Movement is a linear flow (Start → warm-up → 8 exercises → cool-down → Done) driven by a big **Next** button in a sticky footer and a back icon in a sticky header.
- **Sticky headers are two rows:** controls on top (close/back on the left, language pill on the right), then the title — or, in the flow, the step count and progress bar. Three items on one row cannot fit a 320px phone once the labels are Vietnamese, and neither the step count nor the page title is a thing to abbreviate away.
- There are no hidden menus or gestures.

## 6. Do's and Don'ts

### Do:
- **Do** keep one idea per screen and one clearly-dominant action (the green or blue button). If a screen has two equally-loud buttons, one is wrong.
- **Do** keep the body pure white (`oklch(1 0 0)`) and carry warmth through Figtree and rounding.
- **Do** honor the Traffic-Light Rule: green = proceed/correct/done, amber = caution, red = stop. Reserve these hues for meaning.
- **Do** keep every tap target ≥ 60px and body text ≥ 1.15rem.
- **Do** keep `ink-soft` (`oklch(0.42 0.02 255)`) as the *lightest* text on white — dark enough for ~4.5:1.
- **Do** contain (never crop) the demo GIF, and show the filename-naming placeholder when a GIF is missing.
- **Do** write in plain, sentence-case language a first-time user understands on sight.

### Don't:
- **Don't** make it look like a gym, a fitness tracker, or a clinical/medical form — no dark "athletic" theme, no hero-metric stat blocks, no dense dashboards.
- **Don't** use jargon or abbreviations (never "RPE"); the effort meter and plain words replace numeric scales.
- **Don't** introduce a second font family, a gradient headline (`background-clip: text`), or a tiny tracked uppercase eyebrow above sections.
- **Don't** use a cream/sand/warm-tinted background in place of pure white.
- **Don't** spend green, amber, or red on decoration, and don't let coral become a second brand color — it is a rare seasoning.
- **Don't** hide actions behind menus, swipes, or discoverable gestures; every choice is a visible, labelled, oversized control.
- **Don't** use hard/dark drop shadows; lift is soft, blue-tinted, and ambient, and only on what the user should act on.
