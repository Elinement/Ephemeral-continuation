importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.sw.js');
const uv = new UVServiceWorker();

async function handleRequest(event) {
	if (uv.route(event)) {
		return uv.fetch(event);
	}

	return fetch(event.request);
}

self.addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event));
});
