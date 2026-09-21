/* ══════════════════════════════════════════════════════════════
   Infinite Creative Web Design — Progressive Web App Service Worker
   Version: 1.0.0 (BestWeb.lk Certified PWA)
   ══════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'infiniteweb-cache-v1';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './css/main.css?v=2026',
  './css/additions.css?v=2026',
  './js/components.js',
  './js/main.js?v=17',
  './images/logo-100w.webp',
  './images/logo-200w.webp',
  './images/logo.webp',
  './manifest.json'
];

// Install Event: Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Offline-first with network fallback & offline page for navigations
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip browser extensions and chrome-extension schemes
  if (!url.protocol.startsWith('http')) return;

  // HTML Page Navigation: Network first, fall back to cache, then offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const offlineFallback = await caches.match('./offline.html');
          return offlineFallback || caches.match('/offline.html');
        })
    );
    return;
  }

  // Static Assets (CSS, JS, WebP images, fonts): Cache-first with background network update
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Asynchronously update cache in background
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse);
            });
          }
        }).catch(() => { /* silent offline fallback */ });

        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});
