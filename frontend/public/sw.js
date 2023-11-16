// sw.js
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const options = {
    body: payload.notification.body,
  };
  event.waitUntil(
    self.registration.showNotification(payload.notification.title, options)
  );
});