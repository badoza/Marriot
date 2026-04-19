self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('marriott-store').then((cache) => {
      // Caching core files for offline fallback
      return cache.addAll(['/', '/index.html', '/products.json']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
