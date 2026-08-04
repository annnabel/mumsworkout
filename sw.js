/* ============================================================
   Mum's Workout - service worker

   The gym is where this app is used and where the connection tends to give
   up: a basement, thick walls, no signal. So the whole app is kept on the
   phone. Nothing here is required for the app to work - if registration or a
   cache write fails, every request simply falls through to the network.

   Bump CACHE on any release so the old one is cleared out.
   ============================================================ */

const CACHE = "mums-workout-v1";

// The app itself. Small enough to fetch on install, and the reason she can
// open the app at all with no signal.
const SHELL = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "assets/fonts/figtree-latin.woff2",
  "assets/fonts/figtree-latin-ext.woff2",
  "assets/fonts/mulish-latin.woff2",
  "assets/fonts/mulish-latin-ext.woff2",
  "assets/fonts/mulish-vietnamese.woff2",
];

// Cache one URL at a time: a single missing file must not fail the whole install.
async function cacheAllSettled(cache, urls) {
  await Promise.all(urls.map((url) => cache.add(url).catch(() => { /* skip it */ })));
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => cacheAllSettled(cache, SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// The demo GIFs are ~4 MB in total, too much to hold up the first load, so the
// page asks for them once it's settled and on a connection she hasn't asked us
// to spare. After that, an offline workout still has its form videos - the
// part that actually keeps her safe.
self.addEventListener("message", (e) => {
  const { type, urls } = e.data || {};
  if (type !== "warm-media" || !Array.isArray(urls)) return;
  e.waitUntil(caches.open(CACHE).then((cache) => cacheAllSettled(cache, urls)));
});

// Demos and fonts never change under a given name: serve them from the cache
// and only reach for the network on a miss.
const isImmutable = (url) => /\/assets\/(exercises|fonts)\//.test(url.pathname);

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(request);
  if (res.ok) caches.open(CACHE).then((c) => c.put(request, res.clone())).catch(() => {});
  return res;
}

// The app shell goes network-first, so a new version she loads at home lands
// straight away instead of waiting a release behind.
async function networkFirst(request) {
  try {
    const res = await fetch(request);
    if (res.ok) caches.open(CACHE).then((c) => c.put(request, res.clone())).catch(() => {});
    return res;
  } catch (err) {
    const cached = await caches.match(request, { ignoreSearch: true })
      || (request.mode === "navigate" ? await caches.match("index.html") : null);
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;   // nothing third-party to cache

  e.respondWith(isImmutable(url) ? cacheFirst(request) : networkFirst(request));
});
