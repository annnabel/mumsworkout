# PRODUCT.md - Mum's Workout

## What this is
A phone-first web app that shows one person (a woman aged 50+, not comfortable with technology) her machine-based strength workout, one exercise at a time. It is a personal tool, not a commercial product. No login, no accounts, no data collection.

## Who uses it
A single user, 50+, uses it on her **phone** at the gym. She does not use technology often. Everything must be obvious on first glance: large text, large buttons, plain language, no hidden menus, no jargon.

## The one job
Get her through today's workout **safely**. Injury prevention is the north star:
- Clear form demonstrations (a GIF per exercise, dropped in by the daughter who maintains this).
- Setup steps, "do this" cues, and "avoid this" common mistakes for every exercise.
- Plain-language effort guidance (never "RPE").
- Warm-up and cool-down built into the flow.
- A prominent, always-reachable "when to stop and see a professional" safety section.

## Primary flow
Home ("Today") → **Start Workout** → warm-up → 8 exercises, one per screen → cool-down → done.
Secondary: browse the full plan; read safety guidance.

## Register & deliberate overrides
Register: product (design serves the task). Deliberately **low-density** and oversized - this overrides the usual product-UI density norms because the audience and safety goal demand maximum legibility and calm.

## Content source
Program: "Machine-Based Strength Program: Longevity & Joint Health for Women 50+ (Revised)" - 3 days/week full-body, same 8 machines each session. The daily flow shows the base program; heavier blocks, impact add-on, and progression live in the full-plan reference.

## Tech
Static site: plain HTML + CSS + vanilla JS, no build step. Deployable to any static host. GIFs live in `assets/exercises/<slug>.gif`; a missing file shows a labelled placeholder telling the maintainer exactly which filename to add.

## Design direction
Mood: "a calm, unhurried morning - a reassuring guide, not a gym." Warm and human, never clinical.
Palette: pure-white background; deep confident blue primary; green for go/done; amber for caution; red for stop-warnings; a warm coral accent used sparingly. One highly legible humanist sans (Figtree) at large sizes.
