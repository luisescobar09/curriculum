if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
        console.log('Service Worker registrado con éxito: ', registration.scope);
      }, function(err) {
        console.log('Error al registrar el Service Worker: ', err);
      });
    });
  }