# Mum's Workout 🌸

A simple, phone-first website that walks Mum through her workout **one exercise at a time**,
with a form video, clear cues, and plain-language safety guidance. Built to be easy for
someone who doesn't use technology often, with injury prevention as the priority.

## What it does
- **Today's Workout** - a big "Start" button leads through a warm-up → 8 exercises → cool-down,
  one screen at a time with a large **Next** button and a progress bar.
- **A mobility & longevity warm-up** - 6 gentle moves (gentle cardio, shoulder & upper-back
  reach, seated mid-back twists, marching high knees, ankle circles, supported squats), each on
  its own screen with a demo GIF and cues, warming every joint the workout will use.
- **Form demo GIF** for every exercise and warm-up move (exercises from
  [ExerciseDB](https://exercisedb.dev); warm-ups from
  [ExerciseGymGifsDB](https://github.com/JahelCuadrado/ExerciseGymGifsDB)).
- **Do this / Avoid** cues, colour-coded, plus a breathing reminder.
- **Plain-language effort guide** (no jargon like "RPE").
- **Staying safe** page - when to stop and see a professional.
- **The full plan** - all exercises, warm-up/cool-down, and how to progress.
- Remembers when today's session is done (stored on the phone; no account, no data collected).

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
- `app.js` - all content (the program) + the screen-to-screen logic
- `assets/exercises/` - the form demo GIFs

## A note
This app is a friendly guide, not medical advice. Anyone with a joint replacement,
disc issue, or diagnosed osteopenia/osteoporosis should get the all-clear from a
doctor before starting. Exercise demos courtesy of ExerciseDB and ExerciseGymGifsDB.
