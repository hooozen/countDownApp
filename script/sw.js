var VERSION = 'v1';

// 缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll([
        './index.html',
        './app.bundle.js',
      ]);
    })
  );
});

// 缓存更新
self.addEventListener('activate', event => {
  console.debug('enter active event: ', event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            caches.delete(cacheName);
          }
        }));
    }));
});

// 监听 fetch 事件
self.addEventListener('fetch', event => {
  event.respondWith(
    // 检查缓存
    caches.open(VERSION).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});