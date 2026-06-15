// sw.js
const CACHE_NAME = "Pegi-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  "/icons.svg"
];
// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        return cache.addAll(urlsToCache).catch((error) => {
          console.log("Cache addAll error:", error);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("Service Worker: Clearing Old Cache", cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Claiming clients");
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip chrome-extension requests
  if (event.request.url.startsWith("chrome-extension://")) return;

  // Skip external URLs (non-same-origin)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if exists
      if (response) {
        console.log("Service Worker: Serving from cache", event.request.url);
        return response;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Add to cache for future visits
            console.log("Service Worker: Caching new resource", event.request.url);
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          console.log("Service Worker: Fetch failed, serving fallback", error);
          // If both cache and network fail, show offline page
          // For navigation requests, return cached index.html
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          // For CSS and JS, return cached versions
          if (event.request.url.includes(".css")) {
            return caches.match("./style.css");
          }

          // For other requests, return generic offline response
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          });
        });
    })
  );
});

