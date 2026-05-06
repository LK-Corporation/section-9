/* Section 9 // Service Worker
 * Cache-first for own assets · network for everything else.
 * Bumps cache version on script edits — change CACHE_VERSION to invalidate.
 */
const CACHE_VERSION = 'v1.1.0';
const CACHE_NAME = 'section-9-' + CACHE_VERSION;

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './pages/page.css',
  './pages/tachikomas.html',
  './pages/codex.html',
  './pages/foxhound.html',
  './pages/instrumentality.html',
  './pages/puppetmaster.html',
  './pages/about.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Same-origin: NETWORK-FIRST so updates land immediately, fallback to cache when offline.
  // Previously cache-first kept serving stale code after deploys.
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Cross-origin (Google Fonts, Three.js CDN): network-first, fall back to cache.
  event.respondWith(
    fetch(req)
      .then((resp) => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return resp;
      })
      .catch(() => caches.match(req))
  );
});
