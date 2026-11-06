/* Lets Holeshot open with no internet once it has been opened online.
   Pages come from the network when it answers quickly, so updates reach the boys straight away.
   build.mjs fills in the version and the file list. */
const CACHE = 'holeshot-c73775deee';
const FILES = ["./","manifest.webmanifest","img/bike-electric.webp","img/bike-enduro.webp","img/bike-factory.webp","img/bike-hard.webp","img/bike-mini.webp","img/bike-mx.webp","img/bike-pit.webp","img/bike-rally.webp","img/bike-two.webp","img/electric-boots.webp","img/electric-boots2.webp","img/electric-chest.webp","img/electric-gloves.webp","img/electric-helmet.webp","img/electric-jersey.webp","img/electric-knee.webp","img/electric-lens.webp","img/electric-pants.webp","img/electric-peak.webp","img/electric-plastic.webp","img/electric-shade.webp","img/enduro-boots.webp","img/enduro-boots2.webp","img/enduro-chest.webp","img/enduro-gloves.webp","img/enduro-helmet.webp","img/enduro-jersey.webp","img/enduro-knee.webp","img/enduro-lens.webp","img/enduro-pants.webp","img/enduro-peak.webp","img/enduro-plastic.webp","img/enduro-shade.webp","img/factory-boots.webp","img/factory-boots2.webp","img/factory-chest.webp","img/factory-gloves.webp","img/factory-helmet.webp","img/factory-jersey.webp","img/factory-knee.webp","img/factory-lens.webp","img/factory-pants.webp","img/factory-peak.webp","img/factory-plastic.webp","img/factory-shade.webp","img/finish.webp","img/hard-boots.webp","img/hard-boots2.webp","img/hard-chest.webp","img/hard-gloves.webp","img/hard-helmet.webp","img/hard-jersey.webp","img/hard-knee.webp","img/hard-lens.webp","img/hard-pants.webp","img/hard-peak.webp","img/hard-plastic.webp","img/hard-shade.webp","img/hero-jump.webp","img/icon-180.png","img/icon-192.png","img/icon-512.png","img/main-event.webp","img/mini-boots.webp","img/mini-boots2.webp","img/mini-chest.webp","img/mini-gloves.webp","img/mini-helmet.webp","img/mini-jersey.webp","img/mini-knee.webp","img/mini-lens.webp","img/mini-pants.webp","img/mini-peak.webp","img/mini-plastic.webp","img/mini-shade.webp","img/mx-boots.webp","img/mx-boots2.webp","img/mx-chest.webp","img/mx-gloves.webp","img/mx-helmet.webp","img/mx-jersey.webp","img/mx-knee.webp","img/mx-lens.webp","img/mx-pants.webp","img/mx-peak.webp","img/mx-plastic.webp","img/mx-shade.webp","img/photo-electric.webp","img/photo-enduro.webp","img/photo-factory.webp","img/photo-hard.webp","img/photo-mini.webp","img/photo-mx.webp","img/photo-pit.webp","img/photo-rally.webp","img/photo-two.webp","img/pit-boots.webp","img/pit-boots2.webp","img/pit-chest.webp","img/pit-gloves.webp","img/pit-helmet.webp","img/pit-jersey.webp","img/pit-knee.webp","img/pit-lens.webp","img/pit-pants.webp","img/pit-peak.webp","img/pit-plastic.webp","img/pit-shade.webp","img/rally-boots.webp","img/rally-boots2.webp","img/rally-chest.webp","img/rally-gloves.webp","img/rally-helmet.webp","img/rally-jersey.webp","img/rally-knee.webp","img/rally-lens.webp","img/rally-pants.webp","img/rally-peak.webp","img/rally-plastic.webp","img/rally-shade.webp","img/side-electric.webp","img/side-enduro.webp","img/side-factory.webp","img/side-hard.webp","img/side-mini.webp","img/side-mx.webp","img/side-pit.webp","img/side-rally.webp","img/side-two.webp","img/stop-bends.webp","img/stop-berm.webp","img/stop-climb.webp","img/stop-gate.webp","img/stop-log.webp","img/stop-mud.webp","img/stop-river.webp","img/stop-rocks.webp","img/stop-table.webp","img/stop-whoops.webp","img/two-boots.webp","img/two-boots2.webp","img/two-chest.webp","img/two-gloves.webp","img/two-helmet.webp","img/two-jersey.webp","img/two-knee.webp","img/two-lens.webp","img/two-pants.webp","img/two-peak.webp","img/two-plastic.webp","img/two-shade.webp","audio/vDad/0.mp3","audio/vDad/1.mp3","audio/vDad/2.mp3","audio/vDad/3.mp3","audio/vDad/4.mp3","audio/vDad/5.mp3","audio/vDad/6.mp3","audio/vDad/7.mp3","audio/vDave/0.mp3","audio/vDave/1.mp3","audio/vDave/2.mp3","audio/vDave/3.mp3","audio/vDave/4.mp3","audio/vDave/5.mp3","audio/vDave/6.mp3","audio/vDave/7.mp3","audio/vPiet/0.mp3","audio/vPiet/1.mp3","audio/vPiet/2.mp3","audio/vPiet/3.mp3","audio/vPiet/4.mp3","audio/vPiet/5.mp3","audio/vPiet/6.mp3","audio/vPiet/7.mp3","audio/vRik/0.mp3","audio/vRik/1.mp3","audio/vRik/2.mp3","audio/vRik/3.mp3","audio/vRik/4.mp3","audio/vRik/5.mp3","audio/vRik/6.mp3","audio/vRik/7.mp3","audio/vSpanner/0.mp3","audio/vSpanner/1.mp3","audio/vSpanner/2.mp3","audio/vSpanner/3.mp3","audio/vSpanner/4.mp3","audio/vSpanner/5.mp3","audio/vSpanner/6.mp3","audio/vSpanner/7.mp3","audio/vSpanner/8.mp3","audio/vStock/0.mp3","audio/vTurbo/0.mp3","audio/vTurbo/1.mp3","audio/vTurbo/2.mp3","audio/vTurbo/3.mp3","audio/vTurbo/4.mp3","audio/vTurbo/5.mp3","audio/vTurbo/6.mp3"];

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
      // Pictures and recorded lines don't change between versions, so a saved copy is always good.
      if (saved && (e.request.destination === 'image' || /\.mp3$/.test(new URL(e.request.url).pathname))) return saved;
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
