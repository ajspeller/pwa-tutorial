self.addEventListener('install', (evt) => {
  console.log('server worker has been installed');
});

self.addEventListener('activate', (evt) => {
  console.log('server work has been activated');
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch event', evt);
});
