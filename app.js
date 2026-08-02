/* ============================================================
   Mum's Workout - app logic
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
  globe: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21C9.5 18.3 8.2 15.3 8.2 12S9.5 5.7 12 3z"/></svg>`,
  dot: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>`,
};

/* ============================================================
   LANGUAGE - English (default) and Vietnamese
   Saved to localStorage so it persists between visits.
   ============================================================ */
const LANG_KEY = "mums-workout-lang";
const LANGS = { en: "English", vi: "Tiếng Việt" };

function loadLang() {
  try {
    const l = localStorage.getItem(LANG_KEY);
    return l === "vi" ? "vi" : "en";
  } catch { return "en"; }
}
function saveLang(l) {
  try { localStorage.setItem(LANG_KEY, l); } catch { /* ignore */ }
}
let LANG = loadLang();
function setLang(l) {
  LANG = l === "vi" ? "vi" : "en";
  saveLang(LANG);
  document.documentElement.lang = LANG;
}

/* ============================================================
   CONTENT - the program, in plain language, per language
   ============================================================ */

const CONTENT = {
  en: {
    // Effort levels -> filled bars (out of 3) + plain words
    EFFORT: {
      moderate: { on: 2, word: "Comfortably hard", note: "At the end you could still do about 3 more." },
      easy:     { on: 1, word: "Take it gently",   note: "This joint needs extra care. Keep 3-4 in reserve." },
      steady:   { on: 2, word: "Steady effort",    note: "Controlled and smooth, no straining." },
      gentle:   { on: 1, word: "Easy and gentle",  note: "Just waking the body up, no strain at all." },
    },
    EXERCISES: [
      {
        slug: "leg-press",
        name: "Leg Press",
        works: "Your legs and hips, the big movement, like standing up from a chair.",
        sets: "2 sets", reps: "10-12 reps", effort: "moderate",
        setup: [
          "Set the seat so your knees bend to about a right angle at the bottom, no deeper.",
          "Feet flat on the plate, about shoulder-width apart, placed a little high.",
          "Sit with your back flat against the pad. Hold the side handles lightly.",
        ],
        doThis: [
          "Breathe out as you push the plate away.",
          "Push through your whole foot, keeping knees in line with your toes.",
          "Take 2-3 seconds to lower it back down, slow and controlled.",
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
        works: "Chest, shoulders and the backs of your arms, pushing strength.",
        sets: "2 sets", reps: "10-12 reps", effort: "moderate",
        setup: [
          "Set the seat height so the handles line up with the middle of your chest.",
          "Sit tall, back flat, shoulders gently drawn back and down.",
          "Keep your wrists straight, not bent.",
        ],
        doThis: [
          "Breathe out as you press the handles away.",
          "Move smoothly, no bouncing off the weight stack.",
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
        works: "Your upper back and posture, helps you stand tall.",
        sets: "2 sets", reps: "10-12 reps", effort: "moderate",
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
        slug: "prone-leg-curl",
        name: "Prone Leg Curl Machine",
        works: "The backs of your thighs, important for steady, stable knees.",
        sets: "2 sets", reps: "10-12 reps", effort: "moderate",
        setup: [
          "Lie face down with your knees just past the edge of the pad.",
          "Rest the ankle pad just above your heels.",
          "Hold the handles and keep your hips pressed into the pad.",
        ],
        doThis: [
          "Breathe out and curl your heels up towards your bottom.",
          "Move smoothly through the whole range.",
          "Lower slowly, don't let the weight drop.",
        ],
        avoid: [
          "Lifting your hips off the pad to help.",
          "Letting the weight slam down at the end.",
          "Arching your lower back as you curl.",
        ],
        breath: "Breathe out as you curl, in as you lower.",
      },
      {
        slug: "lat-pulldown",
        name: "Lat Pulldown",
        works: "Your back and arms, pulling strength for everyday reaching.",
        sets: "2 sets", reps: "10-12 reps", effort: "moderate",
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
        slug: "machine-shoulder-press",
        name: "Machine Shoulder Press",
        works: "Shoulders and arms, for reaching up to shelves.",
        sets: "2 sets", reps: "8-10 reps", effort: "easy",
        setup: [
          "Set the seat so the handles start level with your shoulders.",
          "Keep your back flat against the pad the whole time.",
          "Wrists straight and steady.",
        ],
        doThis: [
          "Breathe out and press up smoothly, don't snap your elbows straight.",
          "Lower with control back to shoulder height, no lower.",
          "Keep your ribs down; let your shoulders do the work.",
        ],
        avoid: [
          "Arching your back away from the pad to help.",
          "Jerky, rushed movements.",
          "Adding weight too quickly, this joint is easily aggravated.",
        ],
        breath: "Breathe out as you press up, in as you lower.",
      },
      {
        slug: "dead-bug",
        name: "Dead Bug (Core)",
        works: "A gentle tummy and back exercise done on a mat, no machine.",
        sets: "2 sets", reps: "8-10 each side", effort: "steady",
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
          "Rushing, this is a slow, controlled exercise.",
          "Holding your breath.",
        ],
        breath: "Breathe out as you reach out, in as you return.",
        note: "Prefer this on hands and knees? Ask about the Bird Dog version in the full plan.",
      },
      {
        slug: "single-leg-calf-raise",
        name: "Single Calf Raise",
        works: "Your calves and ankles, one leg at a time, for steadier balance and fewer stumbles.",
        sets: "2 sets", reps: "10-12 each leg", effort: "moderate",
        setup: [
          "Stand tall beside a wall or sturdy chair, feet hip-width apart.",
          "Rest a light hand on the wall or chair for balance.",
          "Take most of your weight onto one foot; let the other rest lightly.",
        ],
        doThis: [
          "Rise up onto the toes of your working foot as high as you can, and pause at the top.",
          "Lower slowly until your heel touches the floor.",
          "Do all your reps on one leg, then swap to the other.",
        ],
        avoid: [
          "Bouncing quickly off the floor.",
          "Leaning on your hand instead of using it lightly for balance.",
          "Cutting the movement short.",
        ],
        breath: "Breathe out as you rise, in as you lower.",
        note: "Not steady enough on one leg yet? Start on both feet and build up over time.",
      },
    ],
    // Warm-up movements - shown together on one scrollable page (like the
    // cool-down). Mobility- and longevity-focused: a gentle raise, then loosening
    // every joint the workout will load from the top down, finishing with a
    // supported squat that primes the first machine (the leg press).
    // Each has a real demo GIF (ExerciseGymGifsDB) in assets/exercises/.
    WARMUP_EXERCISES: [
      {
        slug: "warmup-cardio",
        name: "General Raise",
        focus: "Warm the heart & whole body",
        works: "A gentle few minutes to wake up your whole body and warm your joints so everything moves more easily. It looks after your heart and muscles before the work begins.",
        dose: "3 minutes", effort: "gentle",
        setup: [
          "Choose a brisk incline walk on the treadmill, or the cross-trainer.",
          "Start slowly and build to a gentle, steady pace.",
          "Keep it easy enough that you could still hold a conversation.",
        ],
        doThis: [
          "Let your breathing rise a little, warm but never puffed out.",
          "Keep your shoulders relaxed and down, posture tall.",
          "Give yourself the full 3 minutes, there's no rush.",
        ],
        avoid: [
          "Going hard or fast, this is only to warm up.",
          "Skipping it because you feel fine, warm joints move far better.",
          "Holding your breath.",
        ],
        breath: "Breathe in and out slowly and evenly the whole time.",
      },
      {
        slug: "warmup-upper-back",
        name: "Shoulder & Upper-Back Reach",
        focus: "Shoulders & upper back",
        works: "Loosens your shoulders and upper back, the joints behind every press and pull. Mobile shoulders help you reach and dress with ease, and keep you standing tall.",
        dose: "8-10 slow reps", effort: "gentle",
        setup: [
          "Stand tall, or sit tall, with your feet about hip-width apart.",
          "Clasp your hands together and reach them out in front, about chest height.",
          "Let your neck and shoulders stay relaxed.",
        ],
        doThis: [
          "Reach forward and gently round your upper back, feeling a soft stretch between the shoulder blades.",
          "Then open your arms wide and squeeze your shoulder blades gently together.",
          "Finish with a few slow shoulder rolls, backwards.",
        ],
        avoid: [
          "Forcing the movement or holding your breath.",
          "Shrugging up towards your ears.",
          "Rushing, slow and smooth warms the joint far better.",
        ],
        breath: "Breathe out as you reach forward, in as you open up.",
      },
      {
        slug: "warmup-midback-twists",
        name: "Seated Mid-Back Twists",
        focus: "Mid-back & posture",
        works: "Frees up your mid-back so you can turn and stand tall, and readies you for the rows and pulldowns. Good upper-back movement is where posture is won or lost as the years go by.",
        dose: "8 each side", effort: "gentle",
        setup: [
          "Sit tall on a bench or sturdy chair (or on a mat with your legs out, as shown).",
          "Cross your arms loosely over your chest.",
          "Keep your hips still and facing forwards.",
        ],
        doThis: [
          "Turn your upper body gently to one side, then to the other.",
          "Let the movement come from your mid-back, not your lower back.",
          "Move slowly and only as far as feels comfortable.",
        ],
        avoid: [
          "Twisting hard or fast, or bouncing at the end of the turn.",
          "Letting your hips swing round with you.",
          "Straining your neck, let your head follow your chest.",
        ],
        breath: "Breathe out gently as you turn, in as you come back to the middle.",
      },
      {
        slug: "warmup-glute-bridges",
        name: "Glute Bridges",
        focus: "Hips & glutes",
        works: "Wakes up your glutes and the back of your hips, priming the hip thrust and the leg press. Strong glutes power every stand-up, stair and step, and look after your lower back.",
        dose: "10 reps", effort: "gentle",
        setup: [
          "Lie on your back on a mat, knees bent and feet flat on the floor.",
          "Place your feet about hip-width apart, arms resting by your sides.",
          "Tuck your chin gently and let your shoulders relax.",
        ],
        doThis: [
          "Squeeze your glutes and lift your hips up towards the ceiling.",
          "Rise until your body makes a straight line from knees to shoulders.",
          "Pause at the top, then lower slowly with control.",
        ],
        avoid: [
          "Arching your lower back, let your glutes do the lifting.",
          "Pushing up too high or too fast.",
          "Holding your breath.",
        ],
        breath: "Breathe out as you lift, in as you lower.",
      },
      {
        slug: "warmup-squats",
        name: "Supported Squats",
        focus: "Legs & hips",
        works: "Grooves the exact movement of the leg press and warms your thighs and hips. Rising smoothly from a chair, or a squat, is one of the clearest signs of a strong, independent body.",
        dose: "8-10 reps", effort: "gentle",
        setup: [
          "Stand tall, holding a sturdy bench, rail or machine frame in front of you.",
          "Feet about shoulder-width apart, toes turned out very slightly.",
          "Hold on lightly, just for balance and confidence.",
        ],
        doThis: [
          "Sit your hips back and down, as if lowering towards a chair.",
          "Go only as low as is comfortable, then stand back up smoothly.",
          "Keep your knees pointing in line with your toes.",
        ],
        avoid: [
          "Dropping down quickly, lower with control.",
          "Letting your knees fall inwards.",
          "Hauling yourself up with your arms if your legs can manage.",
        ],
        breath: "Breathe out as you stand, in as you lower.",
      },
    ],
    WARMUP: {
      title: "Warm-Up First",
      kicker: "About 5 minutes",
      intro: "A few gentle moves to loosen your joints and get your body ready. Don't skip them. Warm joints move better and stay healthy for years.",
      overviewTitle: "Today's warm-up",
      tip: "Save deeper stretching for the very end, muscles stretch better once they're warm.",
    },
    COOLDOWN: {
      title: "Cool-Down",
      kicker: "About 5 minutes",
      intro: "Lovely work. Scroll through these gentle stretches while your muscles are still warm. Hold each one, breathe, and don't bounce. Then a balance hold and a little recovery.",
      overviewTitle: "Ease down, top to toe",
      // Gentle end-of-session stretches, each with a real demo GIF
      // (ExerciseGymGifsDB, same source as the warm-up). Shown all together
      // on one scrollable page rather than one per screen.
      moves: [
        {
          slug: "cooldown-quad",
          name: "Seated Thigh Release",
          focus: "Thighs (quads)",
          hold: "20-30 sec each leg",
          works: "Eases the front of your thighs after the leg press and squats, so your knees and hips feel loose.",
          cues: [
            "Sit tall on a bench, rest one hand on the front of your thigh.",
            "Gently press and slowly straighten, then bend the knee to find an easy stretch.",
            "Keep it comfortable, breathe slowly, then swap legs.",
          ],
        },
        {
          slug: "cooldown-glute",
          name: "Seated Figure-4 Glute Stretch",
          focus: "Hips & glutes",
          hold: "20-30 sec each side",
          works: "Opens the hips and glutes, the muscles that power every stand-up and stair, so your lower back can relax.",
          cues: [
            "Sit tall and cross one ankle over the opposite knee.",
            "Sit up straight and lean forward gently from the hips.",
            "Feel an easy stretch deep in the hip, then swap sides.",
          ],
        },
        {
          slug: "cooldown-chest",
          name: "Chest & Shoulder Opener",
          focus: "Chest & front of shoulders",
          hold: "20-30 seconds",
          works: "Undoes the forward-rounding of the chest press and daily life, opening you up so you stand tall.",
          cues: [
            "Stand tall and draw both hands gently behind you.",
            "Ease your shoulder blades together and lift your chest.",
            "Breathe into the front of the chest. Don't force it.",
          ],
        },
        {
          slug: "cooldown-upper-back",
          name: "Upper-Back Stretch",
          focus: "Upper back & shoulders",
          hold: "20-30 seconds",
          works: "Loosens the upper back after the rows and pulldowns, the area where good posture is won or lost.",
          cues: [
            "Clasp your hands out in front at chest height.",
            "Round your upper back and reach forward, spreading the shoulder blades.",
            "Let your head follow and breathe out slowly.",
          ],
        },
        {
          slug: "cooldown-calf",
          name: "Calf Stretch on the Wall",
          focus: "Calves",
          hold: "20-30 sec each leg",
          works: "Lengthens the calves and keeps your ankles supple. Steady ankles mean steady steps and safer stairs.",
          cues: [
            "Stand facing a wall, hands flat at shoulder height.",
            "Step one foot back, heel down, back leg straight.",
            "Lean gently into the wall until you feel an easy calf stretch, then swap.",
          ],
        },
      ],
      balance: {
        name: "Single-Leg Balance Hold",
        focus: "Balance training",
        hold: "2 × 20-30 sec each side",
        text: "Stand on one leg. Hold a rail, then just a fingertip, then try with your eyes closed. This is your balance training, and it looks after you for years.",
      },
      recover: {
        name: "Recover",
        text: "A glass of water now, and a little protein at your next meal, to help your muscles rebuild.",
      },
      tip: "Feeling wobbly on one leg? Keep hold of the rail. Steadiness comes with practice.",
    },
  },

  vi: {
    EFFORT: {
      moderate: { on: 2, word: "Nặng vừa phải", note: "Khi kết thúc, bạn vẫn có thể làm thêm khoảng 3 lần nữa." },
      easy:     { on: 1, word: "Nhẹ nhàng thôi", note: "Khớp này cần được chăm sóc kỹ hơn. Hãy giữ lại 3-4 lần trong sức." },
      steady:   { on: 2, word: "Gắng sức đều đặn", note: "Kiểm soát và mượt mà, không gồng ép." },
      gentle:   { on: 1, word: "Nhẹ nhàng, thong thả", note: "Chỉ để đánh thức cơ thể, hoàn toàn không gắng sức." },
    },
    EXERCISES: [
      {
        slug: "leg-press",
        name: "Đạp Chân",
        works: "Chân và hông của bạn, động tác lớn giống như đứng lên từ ghế.",
        sets: "2 hiệp", reps: "10-12 lần", effort: "moderate",
        setup: [
          "Chỉnh ghế sao cho đầu gối gập khoảng một góc vuông ở điểm thấp nhất, không sâu hơn.",
          "Đặt bàn chân phẳng trên bàn đạp, rộng bằng vai, đặt hơi cao một chút.",
          "Ngồi tựa lưng phẳng vào đệm. Nắm nhẹ tay vịn hai bên.",
        ],
        doThis: [
          "Thở ra khi đẩy bàn đạp ra xa.",
          "Đẩy bằng cả bàn chân, giữ đầu gối thẳng hàng với các ngón chân.",
          "Hạ xuống trong 2-3 giây, chậm rãi và có kiểm soát.",
        ],
        avoid: [
          "Để đầu gối đổ vào trong.",
          "Hạ quá thấp khiến lưng dưới nhấc khỏi đệm.",
          "Duỗi thẳng và khóa cứng đầu gối ở điểm trên cùng.",
        ],
        breath: "Thở ra khi đẩy, hít vào khi hạ xuống.",
      },
      {
        slug: "chest-press",
        name: "Đẩy Ngực",
        works: "Ngực, vai và mặt sau cánh tay, sức đẩy.",
        sets: "2 hiệp", reps: "10-12 lần", effort: "moderate",
        setup: [
          "Chỉnh độ cao ghế sao cho tay cầm ngang với giữa ngực.",
          "Ngồi thẳng, lưng phẳng, vai nhẹ nhàng kéo ra sau và xuống dưới.",
          "Giữ cổ tay thẳng, không gập.",
        ],
        doThis: [
          "Thở ra khi đẩy tay cầm ra xa.",
          "Chuyển động mượt mà, không nảy khỏi khối tạ.",
          "Chỉ đưa về đến khi khuỷu tay ngang với thân người.",
        ],
        avoid: [
          "Nhún vai lên gần tai.",
          "Ưỡn lưng ra khỏi đệm.",
          "Để khuỷu tay xòe rộng ra hai bên.",
        ],
        breath: "Thở ra khi đẩy, hít vào khi đưa về.",
      },
      {
        slug: "seated-row",
        name: "Kéo Cáp Ngồi",
        works: "Lưng trên và tư thế của bạn, giúp bạn đứng thẳng.",
        sets: "2 hiệp", reps: "10-12 lần", effort: "moderate",
        setup: [
          "Ngồi với ngực tựa chắc vào đệm, nếu có.",
          "Nắm lấy tay cầm ở khoảng ngang ngực.",
          "Đặt cả hai bàn chân phẳng và vững.",
        ],
        doThis: [
          "Thở ra và kéo, dẫn đầu bằng khuỷu tay.",
          "Nhẹ nhàng ép hai bả vai lại với nhau ở cuối động tác.",
          "Đưa về chậm rãi, để cánh tay vươn ra trước mà không gù lưng.",
        ],
        avoid: [
          "Giật tạ bằng đà của cơ thể.",
          "Nhún vai thay vì ép bả vai.",
          "Gù lưng khi đưa về.",
        ],
        breath: "Thở ra khi kéo vào, hít vào khi đưa về.",
      },
      {
        slug: "prone-leg-curl",
        name: "Máy Gập Chân Nằm Sấp",
        works: "Mặt sau đùi, quan trọng cho đầu gối vững và ổn định.",
        sets: "2 hiệp", reps: "10-12 lần", effort: "moderate",
        setup: [
          "Nằm sấp với đầu gối hơi vượt qua mép đệm.",
          "Đặt đệm mắt cá ngay trên gót chân.",
          "Nắm tay cầm và ép hông xuống đệm.",
        ],
        doThis: [
          "Thở ra và gập gót chân lên về phía mông.",
          "Chuyển động mượt mà qua toàn bộ biên độ.",
          "Hạ xuống chậm rãi, đừng để tạ rơi.",
        ],
        avoid: [
          "Nhấc hông khỏi đệm để hỗ trợ.",
          "Để tạ đập mạnh xuống ở cuối động tác.",
          "Ưỡn lưng dưới khi gập.",
        ],
        breath: "Thở ra khi gập, hít vào khi hạ xuống.",
      },
      {
        slug: "lat-pulldown",
        name: "Kéo Xà Trên",
        works: "Lưng và cánh tay, sức kéo cho việc với tay hằng ngày.",
        sets: "2 hiệp", reps: "10-12 lần", effort: "moderate",
        setup: [
          "Kéo đệm đùi xuống cho khít trước khi ngồi.",
          "Nắm thanh xà rộng hơn vai một chút, lòng bàn tay hướng ra ngoài.",
          "Ngồi thẳng, hơi ngả người ra sau một chút.",
        ],
        doThis: [
          "Thở ra và kéo thanh xà xuống đến phía trên ngực.",
          "Đưa khuỷu tay xuống và ra sau.",
          "Đưa về chậm rãi, lên hết cỡ để vươn căng qua đầu.",
        ],
        avoid: [
          "Đung đưa cơ thể để hỗ trợ kéo.",
          "Kéo thanh xà xuống quá thấp, về phía bụng.",
          "Không bao giờ kéo thanh xà ra sau gáy.",
        ],
        breath: "Thở ra khi kéo xuống, hít vào khi đưa về.",
      },
      {
        slug: "machine-shoulder-press",
        name: "Máy Đẩy Vai",
        works: "Vai và cánh tay, để với lên kệ cao.",
        sets: "2 hiệp", reps: "8-10 lần", effort: "easy",
        setup: [
          "Chỉnh ghế sao cho tay cầm bắt đầu ngang với vai.",
          "Giữ lưng phẳng tựa vào đệm suốt cả động tác.",
          "Cổ tay thẳng và vững.",
        ],
        doThis: [
          "Thở ra và đẩy lên mượt mà, đừng bật khóa khuỷu tay.",
          "Hạ xuống có kiểm soát về ngang vai, không thấp hơn.",
          "Giữ khung sườn hạ xuống, để vai làm việc.",
        ],
        avoid: [
          "Ưỡn lưng ra khỏi đệm để hỗ trợ.",
          "Chuyển động giật cục, vội vàng.",
          "Tăng tạ quá nhanh, khớp này dễ bị kích ứng.",
        ],
        breath: "Thở ra khi đẩy lên, hít vào khi hạ xuống.",
      },
      {
        slug: "dead-bug",
        name: "Dead Bug (Cơ lõi)",
        works: "Bài tập nhẹ nhàng cho bụng và lưng thực hiện trên thảm, không cần máy.",
        sets: "2 hiệp", reps: "8-10 mỗi bên", effort: "steady",
        setup: [
          "Nằm ngửa trên thảm, gập gối lên phía trên hông.",
          "Vươn thẳng hai tay lên trần nhà.",
          "Ấn nhẹ lưng dưới xuống sàn.",
        ],
        doThis: [
          "Từ từ hạ một tay qua đầu và chân đối diện duỗi thẳng ra.",
          "Giữ lưng dưới ép phẳng suốt thời gian.",
          "Đưa chúng về, rồi đổi sang bên kia.",
        ],
        avoid: [
          "Để lưng dưới cong nhấc khỏi sàn.",
          "Vội vàng, đây là bài tập chậm và có kiểm soát.",
          "Nín thở.",
        ],
        breath: "Thở ra khi vươn ra, hít vào khi đưa về.",
        note: "Thích tập ở tư thế quỳ chống tay hơn? Hãy hỏi về phiên bản Bird Dog trong kế hoạch đầy đủ.",
      },
      {
        slug: "single-leg-calf-raise",
        name: "Nhón Bắp Chân Một Chân",
        works: "Bắp chân và mắt cá, mỗi lần một chân, giúp giữ thăng bằng tốt hơn và ít vấp ngã hơn.",
        sets: "2 hiệp", reps: "10-12 mỗi chân", effort: "moderate",
        setup: [
          "Đứng thẳng bên cạnh tường hoặc ghế chắc chắn, hai chân rộng bằng hông.",
          "Đặt nhẹ một tay lên tường hoặc ghế để giữ thăng bằng.",
          "Dồn phần lớn trọng lượng lên một bàn chân; chân kia chỉ đặt hờ.",
        ],
        doThis: [
          "Nhón lên trên các đầu ngón của bàn chân trụ cao hết mức, và dừng lại ở đỉnh.",
          "Hạ chậm rãi cho đến khi gót chân chạm sàn.",
          "Làm hết số lần trên một chân, rồi đổi sang chân kia.",
        ],
        avoid: [
          "Nảy nhanh khỏi sàn.",
          "Tì người vào tay thay vì chỉ đặt nhẹ để giữ thăng bằng.",
          "Rút ngắn động tác.",
        ],
        breath: "Thở ra khi nhón lên, hít vào khi hạ xuống.",
        note: "Chưa đủ vững trên một chân? Hãy bắt đầu bằng cả hai chân rồi tăng dần theo thời gian.",
      },
    ],
    // Các động tác khởi động - hiển thị từng động tác trên mỗi màn hình,
    // giống như các bài tập chính. Tập trung vào sự linh hoạt của khớp và sự
    // dẻo dai lâu dài: làm ấm nhẹ, rồi thả lỏng từng khớp từ trên xuống,
    // kết thúc bằng bài squat có điểm tựa để chuẩn bị cho máy đạp chân.
    // Mỗi động tác có GIF minh họa thật (ExerciseGymGifsDB) trong assets/exercises/.
    WARMUP_EXERCISES: [
      {
        slug: "warmup-cardio",
        name: "Khởi Động Chung",
        focus: "Làm ấm tim & toàn thân",
        works: "Vài phút nhẹ nhàng để đánh thức toàn bộ cơ thể và làm ấm các khớp để mọi thứ cử động dễ dàng hơn. Nó chăm sóc tim và cơ bắp của bạn trước khi vào bài.",
        dose: "3 phút", effort: "gentle",
        setup: [
          "Chọn đi bộ nhanh lên dốc trên máy chạy, hoặc máy tập trên không.",
          "Bắt đầu chậm rãi rồi tăng dần lên nhịp độ nhẹ nhàng, đều đặn.",
          "Giữ đủ nhẹ để bạn vẫn có thể vừa tập vừa trò chuyện.",
        ],
        doThis: [
          "Để hơi thở tăng lên một chút, ấm người nhưng không hụt hơi.",
          "Giữ vai thả lỏng, hạ xuống, và giữ tư thế thẳng.",
          "Dành trọn 3 phút cho mình, không cần vội.",
        ],
        avoid: [
          "Tập mạnh hoặc nhanh, đây chỉ là để khởi động.",
          "Bỏ qua vì thấy mình vẫn khỏe, khớp được làm ấm sẽ cử động tốt hơn nhiều.",
          "Nín thở.",
        ],
        breath: "Hít vào và thở ra chậm rãi, đều đặn suốt thời gian.",
      },
      {
        slug: "warmup-upper-back",
        name: "Vươn Vai & Lưng Trên",
        focus: "Vai & lưng trên",
        works: "Làm mềm vai và lưng trên, những khớp đứng sau mọi động tác đẩy và kéo. Vai linh hoạt giúp bạn với tay, mặc đồ dễ dàng và giữ dáng đứng thẳng.",
        dose: "8-10 lần chậm", effort: "gentle",
        setup: [
          "Đứng thẳng, hoặc ngồi thẳng, hai chân rộng bằng hông.",
          "Đan hai tay vào nhau và vươn ra trước, khoảng ngang ngực.",
          "Giữ cổ và vai thả lỏng.",
        ],
        doThis: [
          "Vươn tay ra trước và nhẹ nhàng cong lưng trên, cảm nhận sự căng nhẹ giữa hai bả vai.",
          "Sau đó mở rộng hai tay và nhẹ nhàng ép hai bả vai lại với nhau.",
          "Kết thúc bằng vài vòng xoay vai chậm ra sau.",
        ],
        avoid: [
          "Ép động tác hoặc nín thở.",
          "Nhún vai lên gần tai.",
          "Vội vàng, chậm và mượt sẽ làm ấm khớp tốt hơn nhiều.",
        ],
        breath: "Thở ra khi vươn tay ra trước, hít vào khi mở rộng.",
      },
      {
        slug: "warmup-midback-twists",
        name: "Vặn Lưng Giữa Khi Ngồi",
        focus: "Lưng giữa & tư thế",
        works: "Làm linh hoạt lưng giữa để bạn xoay người và đứng thẳng, đồng thời sẵn sàng cho các bài kéo. Lưng trên cử động tốt là nơi quyết định tư thế theo năm tháng.",
        dose: "8 lần mỗi bên", effort: "gentle",
        setup: [
          "Ngồi thẳng trên băng hoặc ghế chắc chắn (hoặc trên thảm với chân duỗi, như trong hình).",
          "Khoanh nhẹ hai tay trước ngực.",
          "Giữ hông yên và hướng về phía trước.",
        ],
        doThis: [
          "Xoay nhẹ phần thân trên sang một bên, rồi sang bên kia.",
          "Để chuyển động đến từ lưng giữa, không phải lưng dưới.",
          "Xoay chậm rãi và chỉ đến mức thấy thoải mái.",
        ],
        avoid: [
          "Vặn mạnh hoặc nhanh, hay nảy ở cuối động tác.",
          "Để hông xoay theo người.",
          "Gồng cổ, hãy để đầu xoay theo ngực.",
        ],
        breath: "Thở ra nhẹ khi xoay, hít vào khi trở về giữa.",
      },
      {
        slug: "warmup-glute-bridges",
        name: "Cầu Mông",
        focus: "Hông & cơ mông",
        works: "Đánh thức cơ mông và mặt sau của hông, chuẩn bị cho bài hip thrust và đạp chân. Cơ mông khỏe giúp mỗi lần đứng dậy, lên cầu thang và bước đi, đồng thời bảo vệ lưng dưới.",
        dose: "10 lần", effort: "gentle",
        setup: [
          "Nằm ngửa trên thảm, gập gối và đặt hai bàn chân phẳng trên sàn.",
          "Đặt hai chân rộng bằng hông, hai tay đặt xuôi bên thân.",
          "Thu nhẹ cằm và để vai thả lỏng.",
        ],
        doThis: [
          "Siết cơ mông và nâng hông lên phía trần nhà.",
          "Nâng đến khi thân người thành một đường thẳng từ gối đến vai.",
          "Dừng lại ở đỉnh, rồi hạ xuống chậm rãi có kiểm soát.",
        ],
        avoid: [
          "Ưỡn lưng dưới, hãy để cơ mông làm việc nâng.",
          "Đẩy lên quá cao hoặc quá nhanh.",
          "Nín thở.",
        ],
        breath: "Thở ra khi nâng lên, hít vào khi hạ xuống.",
      },
      {
        slug: "warmup-squats",
        name: "Squat Có Điểm Tựa",
        focus: "Chân & hông",
        works: "Rèn đúng động tác của bài đạp chân và làm ấm đùi cùng hông. Đứng dậy nhẹ nhàng từ ghế, hay từ tư thế squat, là dấu hiệu rõ nhất của cơ thể khỏe mạnh, tự lập.",
        dose: "8-10 lần", effort: "gentle",
        setup: [
          "Đứng thẳng, tay nắm vào băng, thanh vịn hoặc khung máy chắc chắn ở phía trước.",
          "Hai chân rộng bằng vai, mũi chân hơi xoay ra ngoài.",
          "Nắm nhẹ, chỉ để giữ thăng bằng và vững tâm.",
        ],
        doThis: [
          "Đẩy hông ra sau và hạ xuống, như thể ngồi xuống ghế.",
          "Chỉ hạ đến mức thấy thoải mái, rồi đứng lên mượt mà.",
          "Giữ đầu gối hướng thẳng hàng với các ngón chân.",
        ],
        avoid: [
          "Buông người xuống nhanh, hãy hạ có kiểm soát.",
          "Để đầu gối đổ vào trong.",
          "Dùng tay kéo người lên nếu chân bạn có thể tự làm.",
        ],
        breath: "Thở ra khi đứng lên, hít vào khi hạ xuống.",
      },
    ],
    WARMUP: {
      title: "Khởi Động Trước",
      kicker: "Khoảng 5 phút",
      intro: "Vài động tác nhẹ nhàng để làm mềm các khớp và giúp cơ thể sẵn sàng. Đừng bỏ qua, khớp được làm ấm sẽ cử động tốt hơn và khỏe mạnh trong nhiều năm.",
      overviewTitle: "Khởi động hôm nay",
      tip: "Để dành việc giãn cơ sâu đến tận cuối buổi, cơ bắp giãn tốt hơn khi đã ấm.",
    },
    COOLDOWN: {
      title: "Thả Lỏng",
      kicker: "Khoảng 5 phút",
      intro: "Làm rất tốt. Cuộn qua các động tác giãn cơ nhẹ nhàng này khi cơ bắp còn ấm. Giữ mỗi động tác, hít thở, và đừng nảy. Sau đó là giữ thăng bằng và hồi phục một chút.",
      overviewTitle: "Thả lỏng từ trên xuống dưới",
      moves: [
        {
          slug: "cooldown-quad",
          name: "Thả Lỏng Đùi Trước (Ngồi)",
          focus: "Đùi trước",
          hold: "20-30 giây mỗi chân",
          works: "Làm dịu mặt trước của đùi sau bài đạp chân và squat, giúp đầu gối và hông thấy nhẹ nhõm.",
          cues: [
            "Ngồi thẳng trên ghế băng, đặt một tay lên mặt trước của đùi.",
            "Nhẹ nhàng ấn và từ từ duỗi thẳng, rồi gập gối để tìm mức giãn dễ chịu.",
            "Giữ thoải mái, thở chậm, rồi đổi chân.",
          ],
        },
        {
          slug: "cooldown-glute",
          name: "Giãn Cơ Mông Kiểu Số 4 (Ngồi)",
          focus: "Hông & cơ mông",
          hold: "20-30 giây mỗi bên",
          works: "Mở hông và cơ mông, nhóm cơ giúp bạn đứng dậy và lên cầu thang, để lưng dưới được thư giãn.",
          cues: [
            "Ngồi thẳng và bắt chéo một cổ chân lên đầu gối bên kia.",
            "Giữ lưng thẳng và nghiêng người nhẹ về trước từ hông.",
            "Cảm nhận mức giãn dễ chịu sâu trong hông, rồi đổi bên.",
          ],
        },
        {
          slug: "cooldown-chest",
          name: "Mở Ngực & Vai",
          focus: "Ngực & phía trước vai",
          hold: "20-30 giây",
          works: "Gỡ tư thế gù về trước do bài đẩy ngực và sinh hoạt hằng ngày, mở lồng ngực để bạn đứng thẳng.",
          cues: [
            "Đứng thẳng và nhẹ nhàng đưa hai tay ra phía sau.",
            "Khép nhẹ hai bả vai lại và nâng ngực lên.",
            "Hít vào phía trước ngực. Đừng gắng sức.",
          ],
        },
        {
          slug: "cooldown-upper-back",
          name: "Giãn Lưng Trên",
          focus: "Lưng trên & vai",
          hold: "20-30 giây",
          works: "Làm mềm lưng trên sau bài kéo xà và kéo cáp, nơi quyết định tư thế đẹp hay xấu.",
          cues: [
            "Đan hai bàn tay và vươn ra trước ngang ngực.",
            "Cong lưng trên và vươn về phía trước, tách rộng hai bả vai.",
            "Để đầu cúi theo và thở ra chậm rãi.",
          ],
        },
        {
          slug: "cooldown-calf",
          name: "Giãn Bắp Chân Vào Tường",
          focus: "Bắp chân",
          hold: "20-30 giây mỗi chân",
          works: "Kéo dài bắp chân và giữ cổ chân linh hoạt. Cổ chân vững là bước đi vững và cầu thang an toàn hơn.",
          cues: [
            "Đứng đối diện tường, hai tay áp phẳng ngang vai.",
            "Bước một chân ra sau, gót chạm đất, chân sau thẳng.",
            "Nghiêng nhẹ vào tường đến khi thấy bắp chân giãn dễ chịu, rồi đổi chân.",
          ],
        },
      ],
      balance: {
        name: "Giữ Thăng Bằng Một Chân",
        focus: "Luyện thăng bằng",
        hold: "2 × 20-30 giây mỗi bên",
        text: "Đứng trên một chân. Bám thanh vịn, rồi chỉ một đầu ngón tay, rồi thử nhắm mắt. Đây là bài tập thăng bằng của bạn, và nó bảo vệ bạn trong nhiều năm.",
      },
      recover: {
        name: "Hồi phục",
        text: "Một cốc nước ngay bây giờ, và một chút chất đạm vào bữa ăn kế tiếp, để cơ bắp tái tạo.",
      },
      tip: "Thấy chông chênh trên một chân? Cứ bám vào thanh vịn. Sự vững vàng đến cùng luyện tập.",
    },
  },
};

/* ---------- UI strings, per language ---------- */
const UI = {
  en: {
    locale: "en-GB",
    greetingMorning: "Good morning",
    greetingAfternoon: "Good afternoon",
    greetingEvening: "Good evening",
    readyToday: "Ready for today?",
    langLabel: "Language",
    todaysWorkout: "Today's workout",
    workoutName: "Full-Body Strength",
    exercisesCount: (n) => `${n} exercises`,
    aboutMinutes: "About 50 minutes",
    doneToday: "You've done this today, lovely!",
    startWorkout: "Start Workout",
    doItAgain: "Do it again",
    resumeWorkout: "Resume workout",
    startOver: "Start from the beginning",
    onStepXofY: (i, n) => `You're on step ${i} of ${n}`,
    seePlanTitle: "See the full plan",
    seePlanSub: "All exercises and how to progress",
    howHardTitle: "How hard should it feel?",
    howHardSub: "A simple guide to effort",
    stayingSafeTitle: "Staying safe",
    stayingSafeSub: "When to stop and get help",
    homeFoot: "Move at your own pace. There's no rush, and no prizes for going heavy.<br/>If anything hurts, stop.",
    stepXofY: (i, n) => `Step ${i} of ${n}`,
    closeWorkout: "Close workout",
    back: "Back",
    next: "Next",
    finish: "Finish",
    exerciseXofY: (i, n) => `Exercise ${i} of ${n}`,
    warmupAim: "Aim for",
    doLabel: "Do",
    ofReps: (reps) => `of ${reps}`,
    howHardLabel: "How hard",
    setUp: "Set up",
    doThisHead: "Do this",
    avoidHead: "Avoid",
    markDone: "Mark as done",
    allDone: "All done!",
    doneText: "Wonderful work. Every session keeps you stronger and steadier. See you next time.",
    backToStart: "Back to start",

    planTitle: "The Full Plan",
    planIntro: "The same 8 exercises, <strong>3 days a week</strong>, for example Monday, Wednesday and Friday, with a rest day in between. Each session takes about 50 minutes.",
    planBefore: `<b style="display:inline; margin-left:0.4rem">Before you begin</b><br/>If you've never had a bone-density (DEXA) scan, or you have any joint replacement, disc problem, osteopenia or osteoporosis, please get the all-clear from your doctor first.`,
    planWarmup: "Warm-up",
    planExercises: "The exercises",
    planTapAny: "Tap any exercise to see how to do it.",
    planCooldown: "Cool-down",
    planStronger: "Getting stronger over time",
    planStrongerP1: "Only add a little weight when you can finish every set comfortably with good form, and it still feels like you had 2-3 reps left in you.",
    planStrongerP2: "Go up in <strong>small steps</strong> (the smallest the machine allows). If your form gets messy during a set, that's your stopping point, never push through it.",
    planExtras: `<b>Two optional extras (ask first)</b>Once you've done the basic plan well for a couple of months, a slightly heavier block on the leg and chest press, and some gentle heel-drops for bone strength, can be added. These specifically need a doctor or physio's OK if there's any bone or joint concern, so please check before adding them.`,

    effortIntro: "You don't need to push to your limit. The aim is <strong>comfortably hard</strong>, working, but always in control.",
    effortTestTitle: "A simple test",
    effortTestP: "At the end of each set, ask yourself: <strong>could I have done a few more?</strong> If the answer is yes, about 2 or 3 more, you've got it just right.",
    effortLevelsTitle: "The levels",
    effortLighter: `<b>If in doubt, go lighter</b>A weight that's a little too easy is far better than one that's too heavy. You can always add a little next time.`,
    effortSharp: `<b style="display:inline;margin-left:0.4rem">Sharp pain is different</b><br/>A gentle muscle "burn" is normal. Sharp, pinching or shooting pain is not, stop straight away.`,

    safetyTitle: "Staying safe",
    safetyIntro: "This program is built to be gentle on your joints. Listening to your body is the most important rule of all.",
    safetyUnwell: `<b style="display:inline;margin-left:0.4rem">Stop and rest if you feel unwell</b><br/>Dizziness, chest pain, breathlessness beyond normal effort, or feeling faint, stop, sit down, and seek help.`,
    safetyStopTitle: "Stop and see a professional if…",
    safetyStops: [
      "Sharp, pinching or shooting pain in a joint (different from normal muscle tiredness).",
      "Pain that carries on or gets worse two days after a session.",
      "Clicking, catching or a feeling that a joint might give way.",
      "Numbness or tingling anywhere during or after exercise.",
      "You simply can't feel the right muscle working, even after following the set-up.",
    ],
    safetyWorth: `<b>Worth doing</b>One session with a physiotherapist or trainer to check your set-up on the machines is a great investment, even if you do the rest on your own.`,
    safetyCheck: `<b>Check with your doctor first if you have</b>any joint replacement, a disc problem, or diagnosed osteopenia or osteoporosis, ideally before starting this program at all.`,
    safetyDisclaimer: "This app is a friendly guide, not medical advice. Your doctor and physio know you best.",

    mediaAlt: (name) => `How to do the ${name}`,
    mediaPlaceholderTitle: "Form video goes here",
    mediaPlaceholderHint: "To change it, save a clip as",
  },
  vi: {
    locale: "vi-VN",
    greetingMorning: "Chào buổi sáng",
    greetingAfternoon: "Chào buổi chiều",
    greetingEvening: "Chào buổi tối",
    readyToday: "Sẵn sàng cho hôm nay chưa?",
    langLabel: "Ngôn ngữ",
    todaysWorkout: "Bài tập hôm nay",
    workoutName: "Sức mạnh toàn thân",
    exercisesCount: (n) => `${n} bài tập`,
    aboutMinutes: "Khoảng 50 phút",
    doneToday: "Bạn đã hoàn thành hôm nay rồi, tuyệt vời!",
    startWorkout: "Bắt đầu tập",
    doItAgain: "Tập lại",
    resumeWorkout: "Tiếp tục bài tập",
    startOver: "Bắt đầu lại từ đầu",
    onStepXofY: (i, n) => `Bạn đang ở bước ${i} trên ${n}`,
    seePlanTitle: "Xem toàn bộ kế hoạch",
    seePlanSub: "Tất cả bài tập và cách tiến bộ",
    howHardTitle: "Nên tập nặng đến mức nào?",
    howHardSub: "Hướng dẫn đơn giản về mức gắng sức",
    stayingSafeTitle: "Giữ an toàn",
    stayingSafeSub: "Khi nào nên dừng và tìm trợ giúp",
    homeFoot: "Hãy tập theo nhịp độ của riêng bạn. Không cần vội, và không có giải thưởng cho việc tập nặng.<br/>Nếu thấy đau, hãy dừng lại.",
    stepXofY: (i, n) => `Bước ${i} trên ${n}`,
    closeWorkout: "Đóng bài tập",
    back: "Quay lại",
    next: "Tiếp",
    finish: "Hoàn tất",
    exerciseXofY: (i, n) => `Bài tập ${i} trên ${n}`,
    warmupAim: "Mục tiêu",
    doLabel: "Thực hiện",
    ofReps: (reps) => `mỗi hiệp ${reps}`,
    howHardLabel: "Mức gắng sức",
    setUp: "Chuẩn bị",
    doThisHead: "Nên làm",
    avoidHead: "Tránh",
    markDone: "Đánh dấu đã xong",
    allDone: "Xong hết rồi!",
    doneText: "Làm tốt lắm. Mỗi buổi tập giúp bạn khỏe hơn và vững vàng hơn. Hẹn gặp lại lần sau.",
    backToStart: "Về trang đầu",

    planTitle: "Kế Hoạch Đầy Đủ",
    planIntro: "Vẫn 8 bài tập đó, <strong>3 ngày một tuần</strong>, ví dụ Thứ Hai, Thứ Tư và Thứ Sáu, với một ngày nghỉ xen giữa. Mỗi buổi mất khoảng 50 phút.",
    planBefore: `<b style="display:inline; margin-left:0.4rem">Trước khi bắt đầu</b><br/>Nếu bạn chưa từng đo mật độ xương (DEXA), hoặc có thay khớp, vấn đề đĩa đệm, thiếu xương hoặc loãng xương, xin hãy được bác sĩ cho phép trước.`,
    planWarmup: "Khởi động",
    planExercises: "Các bài tập",
    planTapAny: "Chạm vào bài tập bất kỳ để xem cách thực hiện.",
    planCooldown: "Thả lỏng",
    planStronger: "Mạnh hơn theo thời gian",
    planStrongerP1: "Chỉ tăng thêm một chút tạ khi bạn có thể hoàn thành mọi hiệp thoải mái với tư thế tốt, và vẫn cảm thấy như còn dư 2-3 lần.",
    planStrongerP2: "Tăng theo <strong>các bước nhỏ</strong> (mức nhỏ nhất máy cho phép). Nếu tư thế của bạn trở nên lộn xộn giữa hiệp, đó là điểm dừng, đừng bao giờ cố ép.",
    planExtras: `<b>Hai phần thêm tùy chọn (hỏi trước)</b>Sau khi bạn đã tập tốt kế hoạch cơ bản trong vài tháng, có thể thêm một khối nặng hơn một chút cho đạp chân và đẩy ngực, cùng vài động tác thả gót nhẹ nhàng để tăng sức mạnh xương. Những phần này đặc biệt cần sự cho phép của bác sĩ hoặc chuyên viên vật lý trị liệu nếu có bất kỳ lo ngại nào về xương hoặc khớp, nên xin hãy hỏi trước khi thêm.`,

    effortIntro: "Bạn không cần phải gắng đến giới hạn. Mục tiêu là <strong>nặng vừa phải</strong>, có gắng sức nhưng luôn trong tầm kiểm soát.",
    effortTestTitle: "Một phép thử đơn giản",
    effortTestP: "Ở cuối mỗi hiệp, hãy tự hỏi: <strong>mình có thể làm thêm vài lần nữa không?</strong> Nếu câu trả lời là có, khoảng 2 hoặc 3 lần nữa, thì bạn đã làm vừa đúng.",
    effortLevelsTitle: "Các mức độ",
    effortLighter: `<b>Nếu còn phân vân, hãy chọn nhẹ hơn</b>Một mức tạ hơi quá nhẹ vẫn tốt hơn nhiều so với mức quá nặng. Bạn luôn có thể thêm một chút vào lần sau.`,
    effortSharp: `<b style="display:inline;margin-left:0.4rem">Đau nhói thì khác</b><br/>Cảm giác cơ bắp "rát" nhẹ là bình thường. Đau nhói, đau nhức hoặc đau buốt thì không, hãy dừng ngay lập tức.`,

    safetyTitle: "Giữ an toàn",
    safetyIntro: "Chương trình này được xây dựng để nhẹ nhàng với các khớp của bạn. Lắng nghe cơ thể là quy tắc quan trọng nhất.",
    safetyUnwell: `<b style="display:inline;margin-left:0.4rem">Dừng lại và nghỉ nếu thấy không khỏe</b><br/>Chóng mặt, đau ngực, khó thở quá mức bình thường, hoặc cảm giác sắp ngất, hãy dừng lại, ngồi xuống và tìm trợ giúp.`,
    safetyStopTitle: "Dừng lại và gặp chuyên gia nếu…",
    safetyStops: [
      "Đau nhói, đau nhức hoặc đau buốt ở khớp (khác với mỏi cơ bình thường).",
      "Đau kéo dài hoặc nặng hơn hai ngày sau buổi tập.",
      "Tiếng lục cục, cảm giác kẹt hoặc như khớp sắp khuỵu.",
      "Tê hoặc ngứa ran ở bất cứ đâu trong hoặc sau khi tập.",
      "Bạn đơn giản là không cảm nhận được đúng cơ đang hoạt động, dù đã làm theo phần chuẩn bị.",
    ],
    safetyWorth: `<b>Đáng để làm</b>Một buổi với chuyên viên vật lý trị liệu hoặc huấn luyện viên để kiểm tra cách bạn chỉnh máy là một khoản đầu tư tuyệt vời, kể cả khi bạn tự tập phần còn lại.`,
    safetyCheck: `<b>Hãy hỏi bác sĩ trước nếu bạn có</b>bất kỳ khớp thay thế nào, vấn đề đĩa đệm, hoặc được chẩn đoán thiếu xương hoặc loãng xương, tốt nhất là trước khi bắt đầu chương trình này.`,
    safetyDisclaimer: "Ứng dụng này là một người bạn hướng dẫn thân thiện, không phải lời khuyên y tế. Bác sĩ và chuyên viên vật lý trị liệu hiểu bạn rõ nhất.",

    mediaAlt: (name) => `Cách thực hiện ${name}`,
    mediaPlaceholderTitle: "Video hướng dẫn động tác ở đây",
    mediaPlaceholderHint: "Để thay đổi, lưu một đoạn clip thành",
  },
};

/* ---------- language-aware accessors ---------- */
const C = () => CONTENT[LANG];
const T = () => UI[LANG];

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
  delete s.progress;                       // workout finished - nothing to resume
  saveStore(s);
}

// Remember where she is in the flow so an interruption (screen lock,
// a text, the tab being evicted) never drops her back to step 1.
function saveProgress(index) {
  const s = loadStore();
  s.progress = { dateKey: todayKey(), index };
  saveStore(s);
}
function clearProgress() {
  const s = loadStore();
  delete s.progress;
  saveStore(s);
}
// An in-progress workout worth resuming: from today, past the first step,
// and not already at the end. Returns { index, total } or null.
function inProgress() {
  const p = loadStore().progress;
  if (!p || p.dateKey !== todayKey()) return null;
  const total = buildSteps().length;
  if (p.index < 1 || p.index >= total) return null;
  return { index: p.index, total };
}

/* ---------- steps for the flow ---------- */
function buildSteps() {
  return [
    { type: "warmup" },
    ...C().EXERCISES.map((ex, i) => ({ type: "exercise", ex, exIndex: i })),
    { type: "cooldown" },
  ];
}

/* ---------- media (GIF with graceful placeholder) ---------- */
function mediaHTML(ex) {
  // Warm-up & cool-down GIFs come from ExerciseGymGifsDB; strength from ExerciseDB.
  const gym = ex.slug.startsWith("warmup-") || ex.slug.startsWith("cooldown-");
  const credit = gym ? "ExerciseGymGifsDB" : "ExerciseDB";
  return `
    <figure class="media" data-slug="${ex.slug}">
      <img alt="${T().mediaAlt(ex.name)}" src="assets/exercises/${ex.slug}.gif"
           onerror="this.remove(); this.closest('.media').classList.add('is-missing');" />
      <div class="media-placeholder" aria-hidden="true">
        <span class="mp-emoji">🎬</span>
        <b>${T().mediaPlaceholderTitle}</b>
        <small>${T().mediaPlaceholderHint}</small>
        <code>assets/exercises/${ex.slug}.gif</code>
      </div>
    </figure>
    <p class="media-credit">Demo: ${credit}</p>`;
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
let currentRoute = "home";

// Ephemeral, session-only UI state that must survive a same-view re-render
// (e.g. switching language mid-flow) instead of silently resetting.
const uiState = { checks: new Set(), accOpen: new Set() };

// Navigate and push a history entry, so the phone/browser Back button walks
// back through the flow instead of quietly leaving the site.
function go(route, opts = {}) {
  if (route === "flow") flowIndex = opts.index ?? 0;
  history.pushState({ route, index: route === "flow" ? flowIndex : 0 }, "");
  window.scrollTo(0, 0);
  render(route, opts);
}

function render(route, opts = {}) {
  currentRoute = route;
  if (route === "flow") saveProgress(flowIndex);   // remember her place on every step
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
  moveFocusToHeading(root);
}

// Send focus to the new screen's heading after each swap so keyboard and
// screen-reader users land on the fresh content instead of the page top.
function moveFocusToHeading(root) {
  const h = root.querySelector(".step-title, .home-hero h1, .page-header h1, .done h1");
  if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
}

// The phone/browser Back button (and Android's back gesture) restores the
// previous screen rather than trapping her or ejecting from the app.
window.addEventListener("popstate", (e) => {
  const st = e.state || { route: "home", index: 0 };
  if (st.route === "flow") flowIndex = st.index;
  window.scrollTo(0, 0);
  render(st.route, { index: st.index });
});

/* ============================================================
   VIEWS
   ============================================================ */

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return T().greetingMorning;
  if (h < 17) return T().greetingAfternoon;
  return T().greetingEvening;
}
function niceDate() {
  return new Date().toLocaleDateString(T().locale, { weekday: "long", day: "numeric", month: "long" });
}

function langToggle() {
  const opts = Object.keys(LANGS).map((code) =>
    `<button class="lang-opt ${LANG === code ? "on" : ""}" data-lang="${code}"
      aria-pressed="${LANG === code ? "true" : "false"}">${LANGS[code]}</button>`
  ).join("");
  return `
    <div class="lang-switch" role="group" aria-label="${T().langLabel}">
      <span class="lang-switch-label">${icon.globe}<span>${T().langLabel}</span></span>
      <div class="lang-opts">${opts}</div>
    </div>`;
}

function viewHome() {
  const done = doneToday();
  const prog = inProgress();
  return `
  <main class="view">
    ${langToggle()}
    <header class="home-hero">
      <div class="greeting">${greeting()} 🌸</div>
      <h1>${T().readyToday}</h1>
      <div class="home-date">${niceDate()}</div>
    </header>

    <section class="today-card">
      <span class="tag">${icon.calendar} ${T().todaysWorkout}</span>
      <h2>${T().workoutName}</h2>
      <div class="today-meta">
        <span>${icon.dumbbell} ${T().exercisesCount(C().EXERCISES.length)}</span>
        <span>${icon.clock} ${T().aboutMinutes}</span>
      </div>
      ${done ? `<div class="done-today">${icon.check} ${T().doneToday}</div>` : ``}
      ${prog ? `
      <div class="resume">
        <div class="resume-note">${T().onStepXofY(prog.index + 1, prog.total)}</div>
        <button class="btn btn-go" data-resume>${T().resumeWorkout} ${icon.chev}</button>
        <button class="btn btn-ghost btn-restart" data-restart>${T().startOver}</button>
      </div>
      ` : `
      <button class="btn btn-go" data-go="flow">${done ? T().doItAgain : T().startWorkout} ${icon.chev}</button>
      `}
    </section>

    <nav class="quick-links" aria-label="More">
      <button class="quick-link" data-go="plan">
        <span class="ql-icon">${icon.book}</span>
        <span class="ql-text"><b>${T().seePlanTitle}</b><small>${T().seePlanSub}</small></span>
        <span class="ql-chev">${icon.chev}</span>
      </button>
      <button class="quick-link" data-go="effort">
        <span class="ql-icon">${icon.gauge}</span>
        <span class="ql-text"><b>${T().howHardTitle}</b><small>${T().howHardSub}</small></span>
        <span class="ql-chev">${icon.chev}</span>
      </button>
      <button class="quick-link" data-go="safety">
        <span class="ql-icon">${icon.shield}</span>
        <span class="ql-text"><b>${T().stayingSafeTitle}</b><small>${T().stayingSafeSub}</small></span>
        <span class="ql-chev">${icon.chev}</span>
      </button>
    </nav>

    <p class="home-foot">${T().homeFoot}</p>
  </main>`;
}

function effortBars(level) {
  const e = C().EFFORT[level];
  let bars = "";
  for (let i = 0; i < 3; i++) bars += `<i class="${i < e.on ? "on" : ""}"></i>`;
  return { bars, word: e.word, note: e.note };
}

function stepChrome(index, total, inner) {
  const pct = Math.round(((index + 1) / total) * 100);
  return `
  <div class="flow-header">
    <div class="flow-header-row">
      <button class="icon-btn" data-go="home" aria-label="${T().closeWorkout}">${icon.close}</button>
      <div class="flow-progress">
        <div class="flow-step-label"><span>${T().stepXofY(index + 1, total)}</span></div>
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
      ${index > 0 ? `<button class="btn btn-ghost btn-back" data-flow="prev" aria-label="${T().back}">${icon.back}</button>` : ``}
      <button class="btn ${last ? "btn-go" : "btn-primary"} btn-next" data-flow="next">
        ${last ? `${T().finish} ${icon.check}` : `${T().next} ${icon.chev}`}
      </button>
    </div>
  </div>`;
}

function viewFlow(index) {
  const steps = buildSteps();
  const total = steps.length;
  const step = steps[index];
  let inner = "";

  if (step.type === "warmup") inner = warmupStep(C().WARMUP);
  else if (step.type === "cooldown") inner = cooldownStep(C().COOLDOWN);
  else inner = exerciseStep(step.ex, step.exIndex);

  return stepChrome(index, total, inner) + flowFooter(index, total);
}

// Cool-down: unlike the warm-up (one move per screen), the whole cool-down
// lives on a single scrollable page. Each stretch shows a real demo GIF
// (ExerciseGymGifsDB), can be ticked off (state persisted via uiState.checks,
// like the other checklists), and is followed by a balance hold and a short
// recovery note.
function cooldownStep(data) {
  // A tickable card: the corner button carries the check key; the whole card
  // highlights when ticked, and the state survives re-renders.
  const tick = (key) => {
    const on = uiState.checks.has(key);
    return { on, btn: `
      <button class="cool-tick" data-check data-key="${key}" aria-pressed="${on ? "true" : "false"}" aria-label="${T().markDone}">
        <span class="box">${icon.check}</span>
      </button>` };
  };

  const cards = data.moves.map((m, i) => {
    const cues = m.cues.map((c) => `<li>${c}</li>`).join("");
    const t = tick(`cd-move-${i}`);
    return `
    <article class="cool-card ${t.on ? "checked" : ""}">
      ${t.btn}
      <div class="cool-kicker">${i + 1} &middot; ${m.focus} &middot; ${m.hold}</div>
      <h3 class="cool-name">${m.name}</h3>
      <p class="cool-works">${m.works}</p>
      ${mediaHTML(m)}
      <section class="block do" style="margin-top:1rem">
        <div class="block-head">${icon.check} ${T().doThisHead}</div>
        <ul>${cues}</ul>
      </section>
    </article>`;
  }).join("");

  const b = data.balance;
  const bt = tick("cd-balance");
  const balanceCard = `
    <article class="cool-card cool-note ${bt.on ? "checked" : ""}">
      ${bt.btn}
      <div class="cool-note-icon">${icon.gauge}</div>
      <div class="cool-kicker">${b.focus} &middot; ${b.hold}</div>
      <h3 class="cool-name">${b.name}</h3>
      <p class="cool-works">${b.text}</p>
    </article>`;

  const r = data.recover;
  const rt = tick("cd-recover");
  const recoverCard = `
    <article class="cool-card cool-note ${rt.on ? "checked" : ""}">
      ${rt.btn}
      <div class="cool-note-icon">${icon.breath}</div>
      <h3 class="cool-name">${r.name}</h3>
      <p class="cool-works">${r.text}</p>
    </article>`;

  return `
    <div class="step-kicker">${data.kicker}</div>
    <h2 class="step-title">${data.title}</h2>
    <p class="works">${data.intro}</p>
    <div class="warm-overview-head" style="margin-top:1.4rem">${data.overviewTitle}</div>
    <div class="cool-list">
      ${cards}
      ${balanceCard}
      ${recoverCard}
    </div>
    <div class="callout info" style="margin-top:1.3rem">${data.tip}</div>`;
}

// Warm-up: like the cool-down, the whole warm-up lives on one scrollable page.
// Each move is a tickable card (state persisted via uiState.checks) carrying its
// demo GIF plus the same set-up / do-this / avoid guidance the exercises use, so
// nothing is lost by dropping the one-move-per-screen flow.
function warmupStep(data) {
  const exercises = C().WARMUP_EXERCISES || [];

  const tick = (key) => {
    const on = uiState.checks.has(key);
    return { on, btn: `
      <button class="cool-tick" data-check data-key="${key}" aria-pressed="${on ? "true" : "false"}" aria-label="${T().markDone}">
        <span class="box">${icon.check}</span>
      </button>` };
  };

  const cards = exercises.map((ex, i) => {
    const eff = effortBars(ex.effort);
    const setup = ex.setup.map((s) => `<li>${s}</li>`).join("");
    const doThis = ex.doThis.map((s) => `<li>${s}</li>`).join("");
    const avoid = ex.avoid.map((s) => `<li>${s}</li>`).join("");
    const t = tick(`wu-move-${i}`);
    return `
    <article class="cool-card ${t.on ? "checked" : ""}">
      ${t.btn}
      <div class="cool-kicker">${i + 1} &middot; ${ex.focus} &middot; ${ex.dose}</div>
      <h3 class="cool-name">${ex.name}</h3>
      <p class="cool-works">${ex.works}</p>
      ${mediaHTML(ex)}
      <div class="vitals" style="margin-top:1rem">
        <div class="vital">
          <div class="vlabel">${T().warmupAim}</div>
          <div class="vbig vbig-dose">${ex.dose}</div>
        </div>
        <div class="vital effort">
          <div class="vlabel">${T().howHardLabel}</div>
          <div class="meter" aria-hidden="true">${eff.bars}</div>
          <div class="vsub"><b style="font-weight:700">${eff.word}.</b> ${eff.note}</div>
        </div>
      </div>
      <section class="block setup" style="margin-top:1rem">
        <div class="block-head">${T().setUp}</div>
        <ol>${setup}</ol>
      </section>
      <section class="block do">
        <div class="block-head">${icon.check} ${T().doThisHead}</div>
        <ul>${doThis}</ul>
      </section>
      <section class="block avoid">
        <div class="block-head">${icon.alert} ${T().avoidHead}</div>
        <ul>${avoid}</ul>
      </section>
      <div class="breath">${icon.breath}<span>${ex.breath}</span></div>
      ${ex.note ? `<div class="callout info" style="margin-top:1rem">${ex.note}</div>` : ``}
    </article>`;
  }).join("");

  return `
    <div class="step-kicker">${data.kicker}</div>
    <h2 class="step-title">${data.title}</h2>
    <p class="works">${data.intro}</p>
    <div class="warm-overview-head" style="margin-top:1.4rem">${data.overviewTitle}</div>
    <div class="cool-list">${cards}</div>
    <div class="callout info" style="margin-top:1.3rem">${data.tip}</div>`;
}

function exerciseStep(ex, exIndex) {
  const eff = effortBars(ex.effort);
  const setup = ex.setup.map((s) => `<li>${s}</li>`).join("");
  const doThis = ex.doThis.map((s) => `<li>${s}</li>`).join("");
  const avoid = ex.avoid.map((s) => `<li>${s}</li>`).join("");
  return `
    <div class="step-kicker">${T().exerciseXofY(exIndex + 1, C().EXERCISES.length)}</div>
    <h2 class="step-title">${ex.name}</h2>
    <p class="works">${ex.works}</p>

    ${mediaHTML(ex)}

    <div class="vitals">
      <div class="vital">
        <div class="vlabel">${T().doLabel}</div>
        <div class="vbig">${ex.sets}</div>
        <div class="vsub">${T().ofReps(ex.reps)}</div>
      </div>
      <div class="vital effort">
        <div class="vlabel">${T().howHardLabel}</div>
        <div class="meter" aria-hidden="true">${eff.bars}</div>
        <div class="vsub"><b style="font-weight:700">${eff.word}.</b> ${eff.note}</div>
      </div>
    </div>

    <section class="block setup">
      <div class="block-head">${T().setUp}</div>
      <ol>${setup}</ol>
    </section>

    <section class="block do">
      <div class="block-head">${icon.check} ${T().doThisHead}</div>
      <ul>${doThis}</ul>
    </section>

    <section class="block avoid">
      <div class="block-head">${icon.alert} ${T().avoidHead}</div>
      <ul>${avoid}</ul>
    </section>

    <div class="breath">${icon.breath}<span>${ex.breath}</span></div>
    ${ex.note ? `<div class="callout info" style="margin-top:1rem">${ex.note}</div>` : ``}`;
}

function viewDone() {
  return `
  <main class="view done">
    <div class="burst">${icon.checkBig}</div>
    <h1>${T().allDone}</h1>
    <p>${T().doneText}</p>
    <button class="btn btn-primary" data-go="home">${T().backToStart}</button>
  </main>`;
}

/* ---------- Full plan ---------- */
// One accordion row. Warm-up moves carry a `dose`; strength moves carry
// `sets`/`reps` - the vitals adapt to whichever is present.
function planAccItem(ex, num) {
  const eff = effortBars(ex.effort);
  const doseVital = ex.dose
    ? `<div class="vital"><div class="vlabel">${T().warmupAim}</div><div class="vbig vbig-dose">${ex.dose}</div></div>`
    : `<div class="vital"><div class="vlabel">${T().doLabel}</div><div class="vbig" style="font-size:1.5rem">${ex.sets}</div><div class="vsub">${T().ofReps(ex.reps)}</div></div>`;
  const sub = ex.focus || ex.works;
  const open = uiState.accOpen.has(ex.slug);
  return `
    <div class="acc-item ${open ? "open" : ""}">
      <button class="acc-btn" data-acc data-key="${ex.slug}" aria-expanded="${open ? "true" : "false"}">
        <span class="acc-num">${num}</span>
        <span class="acc-name">${ex.name}<small>${sub}</small></span>
        <span class="acc-chev">${icon.chevDown}</span>
      </button>
      <div class="acc-panel">
        ${mediaHTML(ex)}
        <div class="vitals" style="margin-top:0.9rem">
          ${doseVital}
          <div class="vital effort"><div class="vlabel">${T().howHardLabel}</div><div class="meter">${eff.bars}</div><div class="vsub">${eff.word}</div></div>
        </div>
        <section class="block setup"><div class="block-head">${T().setUp}</div><ol>${ex.setup.map((s) => `<li>${s}</li>`).join("")}</ol></section>
        <section class="block do"><div class="block-head">${icon.check} ${T().doThisHead}</div><ul>${ex.doThis.map((s) => `<li>${s}</li>`).join("")}</ul></section>
        <section class="block avoid"><div class="block-head">${icon.alert} ${T().avoidHead}</div><ul>${ex.avoid.map((s) => `<li>${s}</li>`).join("")}</ul></section>
      </div>
    </div>`;
}

function viewPlan() {
  const warmAcc = (C().WARMUP_EXERCISES || []).map((ex, i) => planAccItem(ex, i + 1)).join("");
  const acc = C().EXERCISES.map((ex, i) => planAccItem(ex, i + 1)).join("");

  return `
  ${pageHeader(T().planTitle)}
  <main class="view">
    <p class="section-intro">${T().planIntro}</p>

    <div class="callout info">${icon.shield}${T().planBefore}</div>

    <h2 class="section-title">${T().planWarmup}</h2>
    <p class="section-intro">${T().planTapAny}</p>
    <div class="acc">${warmAcc}</div>

    <h2 class="section-title">${T().planExercises}</h2>
    <p class="section-intro">${T().planTapAny}</p>
    <div class="acc">${acc}</div>

    <h2 class="section-title">${T().planCooldown}</h2>
    <ul class="plan-list">
      ${C().COOLDOWN.moves.map((m) => `<li>${icon.dot}<span><strong>${m.name}.</strong> ${m.focus}, ${m.hold}.</span></li>`).join("")}
      <li>${icon.dot}<span><strong>${C().COOLDOWN.balance.name}.</strong> ${C().COOLDOWN.balance.hold}.</span></li>
      <li>${icon.dot}<span><strong>${C().COOLDOWN.recover.name}.</strong> ${C().COOLDOWN.recover.text}</span></li>
    </ul>

    <h2 class="section-title">${T().planStronger}</h2>
    <div class="prose">
      <p>${T().planStrongerP1}</p>
      <p>${T().planStrongerP2}</p>
    </div>

    <div class="callout warn">${T().planExtras}</div>

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
  ${pageHeader(T().howHardTitle)}
  <main class="view">
    <p class="section-intro">${T().effortIntro}</p>

    <h2 class="section-title">${T().effortTestTitle}</h2>
    <div class="prose"><p>${T().effortTestP}</p></div>

    <h2 class="section-title">${T().effortLevelsTitle}</h2>
    ${row("moderate")}
    ${row("steady")}
    ${row("easy")}

    <div class="callout warn" style="margin-top:1.2rem">${T().effortLighter}</div>

    <div class="callout danger" style="margin-top:1rem">${icon.alert}${T().effortSharp}</div>

    ${bdiscReturn()}
  </main>`;
}

/* ---------- Safety ---------- */
function viewSafety() {
  const stops = T().safetyStops;
  return `
  ${pageHeader(T().safetyTitle)}
  <main class="view">
    <p class="section-intro">${T().safetyIntro}</p>

    <div class="callout danger">${icon.alert}${T().safetyUnwell}</div>

    <h2 class="section-title">${T().safetyStopTitle}</h2>
    <div class="stop-list">
      ${stops.map((s) => `<div class="stop-item">${icon.alert}<span>${s}</span></div>`).join("")}
    </div>

    <div class="callout info" style="margin-top:1.4rem">${T().safetyWorth}</div>

    <div class="callout warn">${T().safetyCheck}</div>

    <p class="section-intro" style="margin-top:1.4rem">${T().safetyDisclaimer}</p>

    ${bdiscReturn()}
  </main>`;
}

function pageHeader(title) {
  return `
  <div class="page-header">
    <div class="page-header-row">
      <button class="icon-btn" data-go="home" aria-label="${T().backToStart}">${icon.back}</button>
      <h1>${title}</h1>
    </div>
  </div>`;
}
function bdiscReturn() {
  return `<button class="btn btn-primary btn-lg" data-go="home" style="margin-top:2rem">${T().backToStart}</button>`;
}

/* ============================================================
   EVENTS (single delegated listener)
   ============================================================ */
document.addEventListener("click", (e) => {
  const langEl = e.target.closest("[data-lang]");
  if (langEl) {
    const code = langEl.getAttribute("data-lang");
    if (code !== LANG) { setLang(code); render(currentRoute); }
    return;
  }

  const resumeEl = e.target.closest("[data-resume]");
  if (resumeEl) { const p = inProgress(); go("flow", { index: p ? p.index : 0 }); return; }

  const restartEl = e.target.closest("[data-restart]");
  if (restartEl) { clearProgress(); go("flow", { index: 0 }); return; }

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
      history.back();   // unified with the platform Back button
    }
    return;
  }

  const check = e.target.closest("[data-check]");
  if (check) {
    // Cool-down ticks live in a corner button; highlight the whole card.
    const target = check.closest(".cool-card") || check;
    const on = target.classList.toggle("checked");
    check.setAttribute("aria-pressed", on ? "true" : "false");
    const key = check.getAttribute("data-key");
    if (key) { on ? uiState.checks.add(key) : uiState.checks.delete(key); }
    return;
  }

  const acc = e.target.closest("[data-acc]");
  if (acc) {
    const item = acc.closest(".acc-item");
    const open = item.classList.toggle("open");
    acc.setAttribute("aria-expanded", open ? "true" : "false");
    const key = acc.getAttribute("data-key");
    if (key) { open ? uiState.accOpen.add(key) : uiState.accOpen.delete(key); }
    return;
  }
});

/* boot */
document.documentElement.lang = LANG;
history.replaceState({ route: "home", index: 0 }, "");
render("home");
