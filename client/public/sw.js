const CACHE_NAME = "educore-v2";
const urlsToCache = ["/", "/index.html", "/logo.PNG"];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
      self.skipWaiting(),
    ]),
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    new URL(event.request.url).origin !== self.location.origin
  )
    return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/index.html")),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request);
    }),
  );
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      ).then(() => self.clients.claim());
    }),
  );
});
