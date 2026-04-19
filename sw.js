self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('marriott-store-v2').then((cache) => {
      return cache.addAll([
        '/Marriot/', 
        '/Marriot/index.html', 
        '/Marriot/products.json'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== 'marriott-store-v2') {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
