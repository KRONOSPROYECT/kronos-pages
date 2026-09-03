const CACHE_NAME = 'kronos-pages-v1';
const APP_SHELL = [
 './',
 './index.html',
 './manifest.json',
 './css/style.css',
 './js/vault.js',
 './js/quantum-seal.js',
 './js/sync.js'
];
self.addEventListener('install', event => {
 event.waitUntil(
 caches.open(CACHE_NAME)
 .then(cache => cache.addAll(APP_SHELL))
 .then(() => self.skipWaiting())
 );
});
self.addEventListener('activate', event => {
 event.waitUntil(
 caches.keys()
 .then(keys => Promise.all(
 keys
 .filter(key => key !== CACHE_NAME)
 .map(key => caches.delete(key))
 ))
 .then(() => self.clients.claim())
 );
});
self.addEventListener('fetch', event => {
 const request = event.request;
 if (request.method !== 'GET') return;
 event.respondWith(
 caches.match(request)
 .then(cachedResponse => {
 const networkRequest = fetch(request)
 .then(networkResponse => {
 if (networkResponse && networkResponse.ok) {
 const responseCopy = networkResponse.clone();
 caches.open(CACHE_NAME)
 .then(cache => cache.put(request, responseCopy));
 }
 return networkResponse;
 })
 .catch(() => cachedResponse);
 return cachedResponse || networkRequest;
 })
 );
});
self.addEventListener('message', event => {
 if (event.data?.type === 'SKIP_WAITING') {
 self.skipWaiting();
 }
});
if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('./sw.js')
 .then(() => console.log('Kronos Pages: modo offline activo'))
 .catch(error => console.warn('No se pudo registrar el Service Worker', error));
}
