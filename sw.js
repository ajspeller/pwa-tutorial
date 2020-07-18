const staticCachename = 'sites-static-v2';
const dynamicCache = 'site-dynamic-v1';
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
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCachename)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (evt) => {
  // console.log('fetch event', evt);
  if (!(evt.request.url.indexOf('http') === 0)) return;
  evt.respondWith(
    caches.match(evt.request).then((cacheResponse) => {
      // if not in the cache make the fetch call
      return (
        cacheResponse ||
        fetch(evt.request).then((fetchResponse) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    })
  );
});
