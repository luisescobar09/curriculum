const staticCV = "curriculum-vitae-site-v1"

const assets = [
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