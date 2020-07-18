const staticCachename = 'sites-static';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
];

self.addEventListener('install', (evt) => {
  // console.log('server worker has been installed');
  evt.waitUntil(
    caches.open(staticCachename).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (evt) => {
  // console.log('server work has been activated');
});

self.addEventListener('fetch', (evt) => {
  // console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheResponse) => {
      return cacheResponse || fetch(evt.request); // if not in the cache make the fetch call
    })
  );
});
