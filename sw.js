// Scout Tap: funziona anche senza rete in palestra. Cambia la versione per forzare l'aggiornamento.
const CACHE='scout-tap-v9';
const CORE=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
const put=(req,res)=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp));return res};
self.addEventListener('fetch',e=>{
  const req=e.request,u=new URL(req.url);
  if(req.method!=='GET')return;
  if(/google\.com$|googleusercontent\.com$/.test(u.hostname))return; // salvataggio online: sempre in rete
  if(u.origin===location.origin){
    // prima la rete (per ricevere gli aggiornamenti), dopo 3 secondi la copia salvata
    const net=fetch(req).then(r=>put(req,r));
    const late=new Promise(r=>setTimeout(r,3000)).then(()=>caches.match(req));
    e.respondWith(Promise.race([net,late]).then(r=>r||net).catch(()=>caches.match(req).then(r=>r||caches.match('index.html'))));
    return;
  }
  if(/fonts\.(googleapis|gstatic)\.com$|cdnjs\.cloudflare\.com$|cdn\.jsdelivr\.net$/.test(u.hostname)){
    e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>put(req,res))));
  }
});
