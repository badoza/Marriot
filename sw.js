self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('marriott-store').then((cache) => {
      // Updated paths for GitHub Pages sub-directory
      return cache.addAll([
        '/Marriot/', 
        '/Marriot/index.html', 
        '/Marriot/products.json'
      ]);
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
