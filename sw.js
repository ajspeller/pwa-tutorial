const staticCachename = 'sites-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
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
  '/pages/fallback.html',
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

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
          .filter((key) => key !== staticCachename && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (evt) => {
  // console.log('fetch event', evt);
  // if (!(evt.request.url.indexOf('http') === 0)) return;
  // evt.respondWith(
  //   caches
  //     .match(evt.request)
  //     .then((cacheResponse) => {
  //       // if not in the cache make the fetch call
  //       return (
  //         cacheResponse ||
  //         fetch(evt.request).then((fetchResponse) => {
  //           return caches.open(dynamicCacheName).then((cache) => {
  //             cache.put(evt.request.url, fetchResponse.clone());
  //             limitCacheSize(dynamicCacheName, 15);
  //             return fetchResponse;
  //           });
  //         })
  //       );
  //     })
  //     .catch(() => {
  //       if (evt.request.url.includes('.html')) {
  //         return caches.match('/pages/fallback.html');
  //       }
  //     })
  // );
});
