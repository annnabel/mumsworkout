/* ============================================================
   Mum's Workout — app logic
   Plain vanilla JS. No build step. One view on screen at a time.
   ============================================================ */

"use strict";

/* ---------- tiny helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const app = () => document.getElementById("app");

// Minimal inline icons (stroke = currentColor)
const icon = {
  back: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  close: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  chev: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
  chevDown: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  dumbbell: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5v11M3 9v6M17.5 6.5v11M21 9v6M6.5 12h11"/></svg>`,
  calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>`,
  check: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  checkBig: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  breath: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20c4 0 7-2.2 7-5.5S16 9 12 9 5 11.2 5 14.5 8 20 12 20z"/><path d="M12 9V4M9 6l3-2 3 2"/></svg>`,
  book: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"/></svg>`,
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>`,
  gauge: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13l4-3"/><path d="M4.5 17a8 8 0 1 1 15 0"/></svg>`,
  alert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 4l-8 14a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0z"/></svg>`,
  dot: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>`,
};

/* ============================================================
   CONTENT — the program, in plain language
   ============================================================ */

// Effort levels -> filled bars (out of 3) + plain words
const EFFORT = {
  moderate: { on: 2, word: "Comfortably hard", note: "At the end you could still do about 3 more." },
  easy:     { on: 1, word: "Take it gently",   note: "This joint needs extra care. Keep 3–4 in reserve." },
  steady:   { on: 2, word: "Steady effort",    note: "Controlled and smooth — no straining." },
};

const EXERCISES = [
  {
    slug: "leg-press",
    name: "Leg Press",
    works: "Your legs and hips — the big movement, like standing up from a chair.",
    sets: "2 sets", reps: "10–12 reps", effort: "moderate",
    setup: [
      "Set the seat so your knees bend to about a right angle at the bottom — no deeper.",
      "Feet flat on the plate, about shoulder-width apart, placed a little high.",
      "Sit with your back flat against the pad. Hold the side handles lightly.",
    ],
    doThis: [
      "Breathe out as you push the plate away.",
      "Push through your whole foot, keeping knees in line with your toes.",
      "Take 2–3 seconds to lower it back down, slow and controlled.",
    ],
    avoid: [
      "Letting your knees fall inwards.",
      "Going so low your lower back lifts off the pad.",
      "Snapping your knees straight and locking them hard at the top.",
    ],
    breath: "Breathe out on the push, in as you lower.",
  },
  {
    slug: "chest-press",
    name: "Chest Press",
    works: "Chest, shoulders and the backs of your arms — pushing strength.",
    sets: "2 sets", reps: "10–12 reps", effort: "moderate",
    setup: [
      "Set the seat height so the handles line up with the middle of your chest.",
      "Sit tall, back flat, shoulders gently drawn back and down.",
      "Keep your wrists straight, not bent.",
    ],
    doThis: [
      "Breathe out as you press the handles away.",
      "Move smoothly — no bouncing off the weight stack.",
      "Come back only until your elbows are level with your body.",
    ],
    avoid: [
      "Shrugging your shoulders up towards your ears.",
      "Arching your back away from the pad.",
      "Letting your elbows flare far out to the sides.",
    ],
    breath: "Breathe out as you press, in as you return.",
  },
  {
    slug: "seated-row",
    name: "Seated Row",
    works: "Your upper back and posture — helps you stand tall.",
    sets: "2 sets", reps: "10–12 reps", effort: "moderate",
    setup: [
      "Sit with your chest resting firmly against the pad, if there is one.",
      "Take hold of the handles at about chest height.",
      "Plant both feet flat and stable.",
    ],
    doThis: [
      "Breathe out and pull, leading with your elbows.",
      "Gently squeeze your shoulder blades together at the end.",
      "Return slowly, letting your arms stretch forward without slumping.",
    ],
    avoid: [
      "Yanking the weight using your body's momentum.",
      "Shrugging instead of squeezing the shoulder blades.",
      "Rounding your back on the way back.",
    ],
    breath: "Breathe out as you pull in, in as you return.",
  },
  {
    slug: "leg-curl",
    name: "Seated Leg Curl",
    works: "The backs of your thighs — important for steady, stable knees.",
    sets: "2 sets", reps: "10–12 reps", effort: "moderate",
    setup: [
      "Adjust the seat so your knee lines up with the machine's pivot point.",
      "Rest the ankle pad just above your heels.",
      "Sit back with your back flush against the seat.",
    ],
    doThis: [
      "Breathe out and curl your heels down and under the seat.",
      "Move smoothly through the whole range.",
      "Return slowly — don't let the weight drop.",
    ],
    avoid: [
      "Lifting your hips to help.",
      "Letting the weight slam down at the end.",
      "A knee that doesn't line up with the pivot.",
    ],
    breath: "Breathe out as you curl, in as you return.",
  },
  {
    slug: "lat-pulldown",
    name: "Lat Pulldown",
    works: "Your back and arms — pulling strength for everyday reaching.",
    sets: "2 sets", reps: "10–12 reps", effort: "moderate",
    setup: [
      "Tuck the thigh pad down snugly before you sit.",
      "Take the bar a little wider than shoulder-width, palms facing away.",
      "Sit tall with a very slight lean back.",
    ],
    doThis: [
      "Breathe out and pull the bar down to the top of your chest.",
      "Drive your elbows down and back.",
      "Return slowly all the way up to a full stretch overhead.",
    ],
    avoid: [
      "Swinging your body to help pull.",
      "Pulling the bar down too low, towards your tummy.",
      "Ever pulling the bar behind your neck.",
    ],
    breath: "Breathe out as you pull down, in as you return.",
  },
  {
    slug: "shoulder-press",
    name: "Seated Shoulder Press",
    works: "Shoulders and arms — for reaching up to shelves.",
    sets: "2 sets", reps: "8–10 reps", effort: "easy",
    setup: [
      "Set the seat so the handles start level with your shoulders.",
      "Keep your back flat against the pad the whole time.",
      "Wrists straight and steady.",
    ],
    doThis: [
      "Breathe out and press up smoothly — don't snap your elbows straight.",
      "Lower with control back to shoulder height, no lower.",
      "Keep your ribs down; let your shoulders do the work.",
    ],
    avoid: [
      "Arching your back away from the pad to help.",
      "Jerky, rushed movements.",
      "Adding weight too quickly — this joint is easily aggravated.",
    ],
    breath: "Breathe out as you press up, in as you lower.",
  },
  {
    slug: "dead-bug",
    name: "Dead Bug (Core)",
    works: "A gentle tummy and back exercise done on a mat — no machine.",
    sets: "2 sets", reps: "8–10 each side", effort: "steady",
    setup: [
      "Lie on your back on a mat, knees bent up over your hips.",
      "Reach both arms straight up towards the ceiling.",
      "Press your lower back gently into the floor.",
    ],
    doThis: [
      "Slowly lower one arm overhead and the opposite leg out straight.",
      "Keep your lower back pressed flat the whole time.",
      "Bring them back, then switch to the other side.",
    ],
    avoid: [
      "Letting your lower back arch up off the floor.",
      "Rushing — this is a slow, controlled exercise.",
      "Holding your breath.",
    ],
    breath: "Breathe out as you reach out, in as you return.",
    note: "Prefer this on hands and knees? Ask about the Bird Dog version in the full plan.",
  },
  {
    slug: "calf-raise",
    name: "Calf Raise",
    works: "Your calves and ankles — steadier balance and fewer stumbles.",
    sets: "2 sets", reps: "12–15 reps", effort: "moderate",
    setup: [
      "Place the balls of your feet on the edge, heels free to drop below.",
      "Use a light hand on a rail for balance if standing.",
      "Stand tall and steady.",
    ],
    doThis: [
      "Rise up onto your toes and pause briefly at the top.",
      "Lower slowly, letting your heels drop into a gentle stretch.",
      "Keep it smooth all the way through.",
    ],
    avoid: [
      "Bouncing out of the bottom.",
      "Using momentum instead of a controlled lift.",
      "Cutting the movement short.",
    ],
    breath: "Breathe out as you rise, in as you lower.",
  },
];

const WARMUP = {
  title: "Warm-Up First",
  kicker: "5–8 minutes",
  intro: "A few easy minutes to get your body ready. Please don't skip this.",
  items: [
    { b: "5 minutes of easy cardio", s: "Recumbent bike, cross-trainer, or a brisk walk. Gentle enough to chat." },
    { b: "Loosen your joints", s: "Small circles: ankles, hips, arms — 10 each way." },
    { b: "A few practice sit-to-stands", s: "Stand up and sit down from a chair 8–10 times, plus some shoulder rolls." },
  ],
  tip: "Save stretching for the very end — muscles stretch better once they're warm.",
};

const COOLDOWN = {
  title: "Cool-Down",
  kicker: "5–8 minutes",
  intro: "Lovely work. Finish with some gentle stretches while your muscles are warm.",
  items: [
    { b: "Stretch the muscles you used", s: "Thighs, hips, chest, upper back, shoulders and calves." },
    { b: "Hold each stretch 20–30 seconds", s: "Breathe normally, no bouncing. It should feel pleasant, never painful." },
    { b: "Optional easy walk", s: "3–5 minutes of gentle walking to wind down." },
  ],
  tip: "Have a glass of water and a little protein with your next meal — it helps you recover.",
};

/* ---------- state ---------- */
const STORE_KEY = "mums-workout-v1";
function loadStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
}
function saveStore(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function doneToday() { return loadStore().lastDone === todayKey(); }
function markDone() {
  const s = loadStore();
  s.lastDone = todayKey();
  s.count = (s.count || 0) + 1;
  saveStore(s);
}

/* ---------- steps for the flow ---------- */
function buildSteps() {
  return [
    { type: "warmup" },
    ...EXERCISES.map((ex, i) => ({ type: "exercise", ex, exIndex: i })),
    { type: "cooldown" },
  ];
}

/* ---------- media (GIF with graceful placeholder) ---------- */
function mediaHTML(ex) {
  return `
    <figure class="media" data-slug="${ex.slug}">
      <img alt="How to do the ${ex.name}" src="assets/exercises/${ex.slug}.gif"
           onerror="this.remove(); this.closest('.media').classList.add('is-missing');" />
      <span class="media-credit">Demo: ExerciseDB</span>
      <div class="media-placeholder" aria-hidden="true">
        <span class="mp-emoji">🎬</span>
        <b>Form video goes here</b>
        <small>To change it, save a clip as</small>
        <code>assets/exercises/${ex.slug}.gif</code>
      </div>
    </figure>`;
}
// Show placeholder only when img failed. If img loads, hide placeholder.
function wireMedia(root) {
  root.querySelectorAll(".media").forEach((fig) => {
    const img = fig.querySelector("img");
    const ph = fig.querySelector(".media-placeholder");
    if (!img) { if (ph) ph.style.display = "flex"; return; }
    // img present but may still fail; hide placeholder while it tries
    if (ph) ph.style.display = "none";
    img.addEventListener("error", () => { if (ph) ph.style.display = "flex"; });
    if (img.complete && img.naturalWidth === 0 && ph) ph.style.display = "flex";
  });
}

/* ============================================================
   ROUTER
   ============================================================ */
let flowIndex = 0;

function go(route, opts = {}) {
  if (route === "flow") flowIndex = opts.index ?? 0;
  window.scrollTo(0, 0);
  render(route, opts);
}

function render(route, opts = {}) {
  const root = app();
  switch (route) {
    case "home":     root.innerHTML = viewHome(); break;
    case "flow":     root.innerHTML = viewFlow(flowIndex); break;
    case "done":     root.innerHTML = viewDone(); break;
    case "plan":     root.innerHTML = viewPlan(); break;
    case "safety":   root.innerHTML = viewSafety(); break;
    case "effort":   root.innerHTML = viewEffort(); break;
    default:         root.innerHTML = viewHome();
  }
  wireMedia(root);
  const v = root.firstElementChild;
  if (v) v.classList.add("view-enter");
}

/* ============================================================
   VIEWS
   ============================================================ */

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function niceDate() {
  return new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}

function viewHome() {
  const done = doneToday();
  return `
  <main class="view">
    <header class="home-hero">
      <div class="greeting">${greeting()} 🌸</div>
      <h1>Ready for today?</h1>
      <div class="home-date">${niceDate()}</div>
    </header>

    <section class="today-card">
      <span class="tag">${icon.calendar} Today's workout</span>
      <h2>Full-Body Strength</h2>
      <div class="today-meta">
        <span>${icon.dumbbell} 8 exercises</span>
        <span>${icon.clock} About 50 minutes</span>
      </div>
      ${done ? `<div class="done-today">${icon.check} You've done this today — lovely!</div>` : ``}
      <button class="btn btn-go" data-go="flow">${done ? "Do it again" : "Start Workout"} ${icon.chev}</button>
    </section>

    <nav class="quick-links" aria-label="More">
      <button class="quick-link" data-go="plan">
        <span class="ql-icon">${icon.book}</span>
        <span class="ql-text"><b>See the full plan</b><small>All exercises and how to progress</small></span>
        <span class="ql-chev">${icon.chev}</span>
      </button>
      <button class="quick-link" data-go="effort">
        <span class="ql-icon">${icon.gauge}</span>
        <span class="ql-text"><b>How hard should it feel?</b><small>A simple guide to effort</small></span>
        <span class="ql-chev">${icon.chev}</span>
      </button>
      <button class="quick-link" data-go="safety">
        <span class="ql-icon">${icon.shield}</span>
        <span class="ql-text"><b>Staying safe</b><small>When to stop and get help</small></span>
        <span class="ql-chev">${icon.chev}</span>
      </button>
    </nav>

    <p class="home-foot">Move at your own pace. There's no rush, and no prizes for going heavy.<br/>If anything hurts, stop.</p>
  </main>`;
}

function effortBars(level) {
  const e = EFFORT[level];
  let bars = "";
  for (let i = 0; i < 3; i++) bars += `<i class="${i < e.on ? "on" : ""}"></i>`;
  return { bars, word: e.word, note: e.note };
}

function stepChrome(index, total, inner) {
  const pct = Math.round(((index + 1) / total) * 100);
  return `
  <div class="flow-header">
    <div class="flow-header-row">
      <button class="icon-btn" data-go="home" aria-label="Close workout">${icon.close}</button>
      <div class="flow-progress">
        <div class="flow-step-label"><span>Step ${index + 1} of ${total}</span></div>
        <div class="pbar"><i style="width:${pct}%"></i></div>
      </div>
    </div>
  </div>
  <main class="view step">${inner}</main>`;
}

function flowFooter(index, total) {
  const last = index === total - 1;
  return `
  <div class="flow-footer">
    <div class="flow-footer-row">
      ${index > 0 ? `<button class="btn btn-ghost btn-back" data-flow="prev">${icon.back}</button>` : ``}
      <button class="btn ${last ? "btn-go" : "btn-primary"} btn-next" data-flow="next">
        ${last ? `Finish ${icon.check}` : `Next ${icon.chev}`}
      </button>
    </div>
  </div>`;
}

function viewFlow(index) {
  const steps = buildSteps();
  const total = steps.length;
  const step = steps[index];
  let inner = "";

  if (step.type === "warmup") inner = warmupStep(WARMUP);
  else if (step.type === "cooldown") inner = warmupStep(COOLDOWN);
  else inner = exerciseStep(step.ex, step.exIndex);

  return stepChrome(index, total, inner) + flowFooter(index, total);
}

function warmupStep(data) {
  const items = data.items.map((it) => `
    <button class="check-item" data-check aria-pressed="false">
      <span class="box">${icon.check}</span>
      <span class="ci-text"><b>${it.b}</b><small>${it.s}</small></span>
    </button>`).join("");
  return `
    <div class="step-kicker">${data.kicker}</div>
    <h2 class="step-title">${data.title}</h2>
    <p class="works">${data.intro}</p>
    <div class="checklist">${items}</div>
    <div class="callout info" style="margin-top:1.3rem">${data.tip}</div>`;
}

function exerciseStep(ex, exIndex) {
  const eff = effortBars(ex.effort);
  const setup = ex.setup.map((s) => `<li>${s}</li>`).join("");
  const doThis = ex.doThis.map((s) => `<li>${s}</li>`).join("");
  const avoid = ex.avoid.map((s) => `<li>${s}</li>`).join("");
  return `
    <div class="step-kicker">Exercise ${exIndex + 1} of ${EXERCISES.length}</div>
    <h2 class="step-title">${ex.name}</h2>
    <p class="works">${ex.works}</p>

    ${mediaHTML(ex)}

    <div class="vitals">
      <div class="vital">
        <div class="vlabel">Do</div>
        <div class="vbig">${ex.sets}</div>
        <div class="vsub">of ${ex.reps}</div>
      </div>
      <div class="vital effort">
        <div class="vlabel">How hard</div>
        <div class="meter" aria-hidden="true">${eff.bars}</div>
        <div class="vsub"><b style="font-weight:700">${eff.word}.</b> ${eff.note}</div>
      </div>
    </div>

    <section class="block setup">
      <div class="block-head">Set up</div>
      <ol>${setup}</ol>
    </section>

    <section class="block do">
      <div class="block-head">${icon.check} Do this</div>
      <ul>${doThis}</ul>
    </section>

    <section class="block avoid">
      <div class="block-head">${icon.alert} Avoid</div>
      <ul>${avoid}</ul>
    </section>

    <div class="breath">${icon.breath}<span>${ex.breath}</span></div>
    ${ex.note ? `<div class="callout info" style="margin-top:1rem">${ex.note}</div>` : ``}`;
}

function viewDone() {
  return `
  <main class="view done">
    <div class="burst">${icon.checkBig}</div>
    <h1>All done!</h1>
    <p>Wonderful work. Every session keeps you stronger and steadier. See you next time.</p>
    <button class="btn btn-primary" data-go="home">Back to start</button>
  </main>`;
}

/* ---------- Full plan ---------- */
function viewPlan() {
  const acc = EXERCISES.map((ex, i) => {
    const eff = effortBars(ex.effort);
    return `
    <div class="acc-item">
      <button class="acc-btn" data-acc aria-expanded="false">
        <span class="acc-num">${i + 1}</span>
        <span class="acc-name">${ex.name}<small>${ex.works}</small></span>
        <span class="acc-chev">${icon.chevDown}</span>
      </button>
      <div class="acc-panel">
        ${mediaHTML(ex)}
        <div class="vitals" style="margin-top:0.9rem">
          <div class="vital"><div class="vlabel">Do</div><div class="vbig" style="font-size:1.5rem">${ex.sets}</div><div class="vsub">of ${ex.reps}</div></div>
          <div class="vital effort"><div class="vlabel">How hard</div><div class="meter">${eff.bars}</div><div class="vsub">${eff.word}</div></div>
        </div>
        <section class="block setup"><div class="block-head">Set up</div><ol>${ex.setup.map((s) => `<li>${s}</li>`).join("")}</ol></section>
        <section class="block do"><div class="block-head">${icon.check} Do this</div><ul>${ex.doThis.map((s) => `<li>${s}</li>`).join("")}</ul></section>
        <section class="block avoid"><div class="block-head">${icon.alert} Avoid</div><ul>${ex.avoid.map((s) => `<li>${s}</li>`).join("")}</ul></section>
      </div>
    </div>`;
  }).join("");

  return `
  ${pageHeader("The Full Plan")}
  <main class="view">
    <p class="section-intro">The same 8 exercises, <strong>3 days a week</strong> — for example Monday, Wednesday and Friday, with a rest day in between. Each session takes about 50 minutes.</p>

    <div class="callout info">${icon.shield}<b style="display:inline; margin-left:0.4rem">Before you begin</b><br/>
    If you've never had a bone-density (DEXA) scan, or you have any joint replacement, disc problem, osteopenia or osteoporosis, please get the all-clear from your doctor first.</div>

    <h2 class="section-title">Warm-up</h2>
    <ul class="plan-list">${WARMUP.items.map((it) => `<li>${icon.dot}<span><strong>${it.b}.</strong> ${it.s}</span></li>`).join("")}</ul>

    <h2 class="section-title">The exercises</h2>
    <p class="section-intro">Tap any exercise to see how to do it.</p>
    <div class="acc">${acc}</div>

    <h2 class="section-title">Cool-down</h2>
    <ul class="plan-list">${COOLDOWN.items.map((it) => `<li>${icon.dot}<span><strong>${it.b}.</strong> ${it.s}</span></li>`).join("")}</ul>

    <h2 class="section-title">Getting stronger over time</h2>
    <div class="prose">
      <p>Only add a little weight when you can finish every set comfortably with good form — and it still feels like you had 2–3 reps left in you.</p>
      <p>Go up in <strong>small steps</strong> (the smallest the machine allows). If your form gets messy during a set, that's your stopping point — never push through it.</p>
    </div>

    <div class="callout warn"><b>Two optional extras (ask first)</b>
    Once you've done the basic plan well for a couple of months, a slightly heavier block on the leg and chest press, and some gentle heel-drops for bone strength, can be added. These specifically need a doctor or physio's OK if there's any bone or joint concern — so please check before adding them.</div>

    ${bdiscReturn()}
  </main>`;
}

/* ---------- Effort explainer ---------- */
function viewEffort() {
  const row = (level) => {
    const e = effortBars(level);
    return `<div class="vital effort" style="margin-bottom:0.8rem">
      <div class="meter">${e.bars}</div>
      <div class="vsub"><b style="font-weight:800">${e.word}.</b> ${e.note}</div>
    </div>`;
  };
  return `
  ${pageHeader("How hard should it feel?")}
  <main class="view">
    <p class="section-intro">You don't need to push to your limit. The aim is <strong>comfortably hard</strong> — working, but always in control.</p>

    <h2 class="section-title">A simple test</h2>
    <div class="prose"><p>At the end of each set, ask yourself: <strong>could I have done a few more?</strong> If the answer is yes — about 2 or 3 more — you've got it just right.</p></div>

    <h2 class="section-title">The levels</h2>
    ${row("moderate")}
    ${row("steady")}
    ${row("easy")}

    <div class="callout warn" style="margin-top:1.2rem"><b>If in doubt, go lighter</b>
    A weight that's a little too easy is far better than one that's too heavy. You can always add a little next time.</div>

    <div class="callout danger" style="margin-top:1rem">${icon.alert}<b style="display:inline;margin-left:0.4rem">Sharp pain is different</b><br/>
    A gentle muscle "burn" is normal. Sharp, pinching or shooting pain is not — stop straight away.</div>

    ${bdiscReturn()}
  </main>`;
}

/* ---------- Safety ---------- */
function viewSafety() {
  const stops = [
    "Sharp, pinching or shooting pain in a joint (different from normal muscle tiredness).",
    "Pain that carries on or gets worse two days after a session.",
    "Clicking, catching or a feeling that a joint might give way.",
    "Numbness or tingling anywhere during or after exercise.",
    "You simply can't feel the right muscle working, even after following the set-up.",
  ];
  return `
  ${pageHeader("Staying safe")}
  <main class="view">
    <p class="section-intro">This program is built to be gentle on your joints. Listening to your body is the most important rule of all.</p>

    <div class="callout danger">${icon.alert}<b style="display:inline;margin-left:0.4rem">Stop and rest if you feel unwell</b><br/>
    Dizziness, chest pain, breathlessness beyond normal effort, or feeling faint — stop, sit down, and seek help.</div>

    <h2 class="section-title">Stop and see a professional if…</h2>
    <div class="stop-list">
      ${stops.map((s) => `<div class="stop-item">${icon.alert}<span>${s}</span></div>`).join("")}
    </div>

    <div class="callout info" style="margin-top:1.4rem"><b>Worth doing</b>
    One session with a physiotherapist or trainer to check your set-up on the machines is a great investment — even if you do the rest on your own.</div>

    <div class="callout warn"><b>Check with your doctor first if you have</b>
    any joint replacement, a disc problem, or diagnosed osteopenia or osteoporosis — ideally before starting this program at all.</div>

    <p class="section-intro" style="margin-top:1.4rem">This app is a friendly guide, not medical advice. Your doctor and physio know you best.</p>

    ${bdiscReturn()}
  </main>`;
}

function pageHeader(title) {
  return `
  <div class="page-header">
    <div class="page-header-row">
      <button class="icon-btn" data-go="home" aria-label="Back to start">${icon.back}</button>
      <h1>${title}</h1>
    </div>
  </div>`;
}
function bdiscReturn() {
  return `<button class="btn btn-primary btn-lg" data-go="home" style="margin-top:2rem">Back to start</button>`;
}

/* ============================================================
   EVENTS (single delegated listener)
   ============================================================ */
document.addEventListener("click", (e) => {
  const goEl = e.target.closest("[data-go]");
  if (goEl) { go(goEl.getAttribute("data-go")); return; }

  const flowEl = e.target.closest("[data-flow]");
  if (flowEl) {
    const dir = flowEl.getAttribute("data-flow");
    const steps = buildSteps();
    if (dir === "next") {
      if (flowIndex >= steps.length - 1) { markDone(); go("done"); }
      else { flowIndex++; go("flow", { index: flowIndex }); }
    } else if (dir === "prev") {
      if (flowIndex > 0) { flowIndex--; go("flow", { index: flowIndex }); }
    }
    return;
  }

  const check = e.target.closest("[data-check]");
  if (check) {
    const on = check.classList.toggle("checked");
    check.setAttribute("aria-pressed", on ? "true" : "false");
    return;
  }

  const acc = e.target.closest("[data-acc]");
  if (acc) {
    const item = acc.closest(".acc-item");
    const open = item.classList.toggle("open");
    acc.setAttribute("aria-expanded", open ? "true" : "false");
    return;
  }
});

/* boot */
render("home");
