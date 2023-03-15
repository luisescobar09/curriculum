if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
        console.log('Service Worker registrado con éxito: ', registration.scope);
      }, function(err) {
        console.log('Error al registrar el Service Worker: ', err);
      });
    });
  }

  var contador_views = 0;
  window.onload=function(){

    if(localStorage.getItem("contador_views") == null){
      localStorage.setItem("contador_views", contador_views);
    }else{
      contador_views = parseInt(localStorage.getItem("contador_views"));
      contador_views += 1;
      localStorage.setItem("contador_views", contador_views);
    }
  }

  var timer;
  var timerStart;
  var timeSpentOnSite = getTimeSpentOnSite();
  
  function getTimeSpentOnSite(){
      timeSpentOnSite = parseInt(localStorage.getItem('timeSpentOnSite'));
      timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
      return timeSpentOnSite;
  }
  
  function startCounting(){
      timerStart = Date.now();
      timer = setInterval(function(){
          timeSpentOnSite = getTimeSpentOnSite()+(Date.now()-timerStart);
          localStorage.setItem('timeSpentOnSite',(timeSpentOnSite));
          timerStart = parseInt(Date.now());
      },1000);
  }
  startCounting();

  var db;

  function startDatabase() {
      //...
  
      const request = indexedDB.open('curriculum_db', 1);
  
      request.addEventListener("error", showError);
      request.addEventListener("success", Starting);
      request.addEventListener("upgradeneeded", CreateData);
  
      function showError(event) {
          console.log("Error cargando la base de datos");
      }
      function Starting(event) {
          db = event.target.result;
          AddData();
      }
      function CreateData(event) {
          db = event.target.result;
          var storage = db.createObjectStore("Views", {keyPath: "id", autoIncrement: true});
          storage.createIndex("browser", "browser", {unique: false});
          storage.createIndex("date", "date", {unique: false});
          storage.createIndex("time", "time", {unique: false});
      }
      function AddData(event) {
        var transaction = db.transaction(["Views"], "readwrite").objectStore("Views");
        var sBrowser, sUsrAg = navigator.userAgent;
        if(sUsrAg.indexOf("Firefox") > -1) {
            sBrowser = "Mozilla Firefox";
          } else if (sUsrAg.indexOf("Chrome") > -1) {
              sBrowser = "Google Chrome";
          } else if (sUsrAg.indexOf("Opera") > -1) {  
              sBrowser = "Opera";
          } else if (sUsrAg.indexOf("Safari") > -1) {
              sBrowser = "Apple Safari";
          } else if (sUsrAg.indexOf("MSIE") > -1) {
              sBrowser = "Microsoft Internet Explorer";
          } else {
              sBrowser = "unknown";
          }
        transaction.add({browser: sBrowser, date: new Date(), time: parseInt(timeSpentOnSite/1000)});

      }
  }
  window.addEventListener('load', startDatabase);