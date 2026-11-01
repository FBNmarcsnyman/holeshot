/* Lets Holeshot open with no internet once it has been opened online.
   Pages come from the network when it answers quickly, so updates reach the boys straight away.
   build.mjs fills in the version and the file list. */
const CACHE = 'holeshot-53f304de50';
const FILES = ["./","manifest.webmanifest","img/bike-enduro.webp","img/bike-factory.webp","img/bike-hard.webp","img/bike-mini.webp","img/bike-mx.webp","img/finish.webp","img/hero-jump.webp","img/icon-180.png","img/icon-192.png","img/icon-512.png","img/main-event.webp","img/stop-bends.webp","img/stop-berm.webp","img/stop-climb.webp","img/stop-gate.webp","img/stop-log.webp","img/stop-mud.webp","img/stop-river.webp","img/stop-rocks.webp","img/stop-table.webp","img/stop-whoops.webp"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const key = e.request.mode === 'navigate' ? './' : e.request;
      const saved = await cache.match(key);
      // Pictures don't change between versions, so a saved copy is always good.
      if (saved && e.request.destination === 'image') return saved;
      const network = fetch(e.request).then((res) => {
        if (res.ok || res.type === 'opaque') cache.put(key, res.clone());
        return res;
      });
      if (!saved) return network;
      // On slow wifi, don't keep a child waiting: fall back to the saved copy after 3 seconds.
      const slow = new Promise((resolve) => setTimeout(() => resolve(saved), 3000));
      return Promise.race([network.catch(() => saved), slow]);
    })(),
  );
});
