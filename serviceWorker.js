self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('curriculum-vitae-site-v1').then(function(cache) {
        cache.add('/');
        cache.add('/index.html');
        cache.add('/estilo.css');
        cache.add('/js/app.js');
        cache.add('/ui.js');
        cache.add('/img/contact_bg.png');
        cache.add('/img/fondo.jpg');
        cache.add('/img/favicon.png');
        cache.add('/img/curso1.PNG');
        cache.add('/img/curso2.PNG');
        cache.add('/img/curso3.PNG');
        cache.add('/img/hack1.jpg');
        cache.add('/img/hack2.jpg');
        cache.add('/img/hack3.PNG');
        cache.add('/img/ntaxi1.PNG');
        cache.add('/img/ntaxi2.PNG');
        cache.add('/img/ntaxi3.PNG');
        cache.add('/img/ntaxi4.PNG');
        cache.add('/img/ntaxi5.PNG');
        cache.add('/img/ntaxi6.jpg');
        cache.add('/img/Tacuche.PNG');
        cache.add('/pdf/Curriculum.pdf');
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  });