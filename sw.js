/* ══════════════════════════════════════════════════════════════
   Infinite Creative Web Design — Progressive Web App Service Worker
   Version: 3.0.0 (Network-First Instant Updates)
   ══════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'infiniteweb-cache-v6';

// Install Event: Activate immediately without waiting
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate Event: Wipe all previous caches completely
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-First with cache fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;
        if (request.mode === 'navigate') {
          return caches.match('./offline.html') || caches.match('/offline.html');
        }
      })
  );
});
