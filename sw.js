/* Lets Holeshot open with no internet once it has been opened online.
   Pages come from the network when it answers quickly, so updates reach the boys straight away.
   build.mjs fills in the version and the file list. */
const CACHE = 'holeshot-a790edf2a1';
const FILES = ["./","manifest.webmanifest","img/bike-enduro.webp","img/bike-factory.webp","img/bike-hard.webp","img/bike-mini.webp","img/bike-mx.webp","img/enduro-boots.webp","img/enduro-boots2.webp","img/enduro-chest.webp","img/enduro-gloves.webp","img/enduro-helmet.webp","img/enduro-jersey.webp","img/enduro-knee.webp","img/enduro-lens.webp","img/enduro-pants.webp","img/enduro-peak.webp","img/enduro-plastic.webp","img/enduro-shade.webp","img/factory-boots.webp","img/factory-boots2.webp","img/factory-chest.webp","img/factory-gloves.webp","img/factory-helmet.webp","img/factory-jersey.webp","img/factory-knee.webp","img/factory-lens.webp","img/factory-pants.webp","img/factory-peak.webp","img/factory-plastic.webp","img/factory-shade.webp","img/finish.webp","img/hard-boots.webp","img/hard-boots2.webp","img/hard-chest.webp","img/hard-gloves.webp","img/hard-helmet.webp","img/hard-jersey.webp","img/hard-knee.webp","img/hard-lens.webp","img/hard-pants.webp","img/hard-peak.webp","img/hard-plastic.webp","img/hard-shade.webp","img/hero-jump.webp","img/icon-180.png","img/icon-192.png","img/icon-512.png","img/main-event.webp","img/mini-boots.webp","img/mini-boots2.webp","img/mini-chest.webp","img/mini-gloves.webp","img/mini-helmet.webp","img/mini-jersey.webp","img/mini-knee.webp","img/mini-lens.webp","img/mini-pants.webp","img/mini-peak.webp","img/mini-plastic.webp","img/mini-shade.webp","img/mx-boots.webp","img/mx-boots2.webp","img/mx-chest.webp","img/mx-gloves.webp","img/mx-helmet.webp","img/mx-jersey.webp","img/mx-knee.webp","img/mx-lens.webp","img/mx-pants.webp","img/mx-peak.webp","img/mx-plastic.webp","img/mx-shade.webp","img/photo-enduro.webp","img/photo-factory.webp","img/photo-hard.webp","img/photo-mini.webp","img/photo-mx.webp","img/stop-bends.webp","img/stop-berm.webp","img/stop-climb.webp","img/stop-gate.webp","img/stop-log.webp","img/stop-mud.webp","img/stop-river.webp","img/stop-rocks.webp","img/stop-table.webp","img/stop-whoops.webp"];

self.addEventListener('install', (e) => {
  // Fresh from the site, not the browser's own short-term copies, because a picture can change while keeping its name.
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
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
  // The page asks this to find out whether a newer version is live, so the answer must never be a saved one.
  if (new URL(e.request.url).pathname.endsWith('version.json')) return;
  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const key = e.request.mode === 'navigate' ? './' : e.request;
      const saved = await cache.match(key);
      // Pictures don't change between versions, so a saved copy is always good.
      if (saved && e.request.destination === 'image') return saved;
      const network = fetch(e.request.mode === 'navigate' ? new Request(e.request.url, { cache: 'no-cache' }) : e.request).then((res) => {
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
