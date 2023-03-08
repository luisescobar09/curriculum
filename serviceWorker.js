const CACHE_NAME = 'curriculum-vitae-site-v1';

const urlsToCache = [
    "/",
    "/index.html",
    "/estilo.css",
    "/js/app.js",
    "/ui.js",
    "/img/contact_bg.png",
    "/img/fondo.jpg",
    "/img/favicon.png",
    "/img/curso1.PNG",
    "/img/curso2.PNG",
    "/img/curso3.PNG",
    "/img/hack1.jpg",
    "/img/hack2.jpg",
    "/img/hack3.PNG",
    "/img/ntaxi1.PNG",
    "/img/ntaxi2.PNG",
    "/img/ntaxi3.PNG",
    "/img/ntaxi4.PNG",
    "/img/ntaxi5.PNG",
    "/img/ntaxi6.jpg",
    "/img/Tacuche.PNG",
    "/pdf/curriculum.pdf"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request to avoid modifying the original request object.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response to avoid modifying the original response object.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
