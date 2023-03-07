const staticCV = "curriculum-vitae-site-v1"

const assets = [
    "/curriculum/",
    "/curriculum/index.html",
    "/curriculum/estilo.css",
    "/curriculum/js/app.js",
    "/curriculum/ui.js",
    "/curriculum/img/contact_bg.png",
    "/curriculum/img/fondo.jpg",
    "/curriculum/img/favicon.png",
    "/curriculum/img/curso1.PNG",
    "/curriculum/img/curso2.PNG",
    "/curriculum/img/curso3.PNG",
    "/curriculum/img/hack1.jpg",
    "/curriculum/img/hack2.jpg",
    "/curriculum/img/hack3.PNG",
    "/curriculum/img/ntaxi1.PNG",
    "/curriculum/img/ntaxi2.PNG",
    "/curriculum/img/ntaxi3.PNG",
    "/curriculum/img/ntaxi4.PNG",
    "/curriculum/img/ntaxi5.PNG",
    "/curriculum/img/ntaxi6.jpg",
    "/curriculum/img/Tacuche.PNG",
    "/curriculum/pdf/curriculum.pdf"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCV).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})