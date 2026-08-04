# Mum's Workout 🌸

A simple, phone-first website that walks Mum through her workout **one exercise at a time**,
with a form video, clear cues, and plain-language safety guidance. Built to be easy for
someone who doesn't use technology often, with injury prevention as the priority.

## What it does
- **Today's Workout** - a big "Start" button leads through a warm-up → 8 exercises → cool-down,
  one screen at a time with a large **Next** button and a progress bar.
- **A mobility & longevity warm-up** - 5 gentle moves (general raise, shoulder & upper-back
  reach, seated mid-back twists, glute bridges, supported squats), each on its own screen with a
  demo GIF and cues, warming every joint the workout will use.
- **Form demo GIF** for every exercise and warm-up move (exercises from
  [ExerciseDB](https://exercisedb.dev); warm-ups from
  [ExerciseGymGifsDB](https://github.com/JahelCuadrado/ExerciseGymGifsDB)).
- **Do this / Avoid** cues, colour-coded, plus a breathing reminder.
- **Plain-language effort guide** (no jargon like "RPE").
- **Staying safe** page - when to stop and see a professional.
- **The full plan** - all exercises, warm-up/cool-down, and how to progress.
- **English or Vietnamese**, switchable from every screen - mid-workout too, without
  losing your place. Remembered between visits, and a Vietnamese-set phone opens in
  Vietnamese by itself.
- **Works with no signal.** After the first visit the whole app, including every demo
  GIF, is stored on the phone, so a gym basement with no bars changes nothing.
- Remembers when today's session is done, and offers to resume an interrupted workout
  (stored on the phone; no account, no data collected).

## Running it
It's a plain static site - no build step. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Deploy the folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Changing the exercise videos
GIFs live in `assets/exercises/` named after each exercise (e.g. `leg-press.gif`).
To swap one, replace the file keeping the same name - see
[`assets/exercises/README.md`](assets/exercises/README.md). Missing files show a
friendly placeholder telling you which name to use.

## Files
- `index.html` - page shell
- `styles.css` - the design system (large type, high contrast, calm palette)
- `app.js` - all content (the program, in both languages) + the screen-to-screen logic
- `sw.js` - service worker; keeps the app and its GIFs working offline
- `assets/exercises/` - the form demo GIFs
- `assets/fonts/` - the two self-hosted typefaces (see
  [`assets/fonts/README.md`](assets/fonts/README.md))

After changing `styles.css`, `app.js` or `index.html`, bump `CACHE` in `sw.js` so
phones that already have the old version pick the new one up.

## A note
This app is a friendly guide, not medical advice. Anyone with a joint replacement,
disc issue, or diagnosed osteopenia/osteoporosis should get the all-clear from a
doctor before starting. Exercise demos courtesy of ExerciseDB and ExerciseGymGifsDB.
