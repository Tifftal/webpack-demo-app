import { precacheAndRoute, matchPrecache } from "workbox-precaching";
import {
  registerRoute,
  setCatchHandler,
  NavigationRoute,
} from "workbox-routing";
import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkOnly,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

precacheAndRoute([...self.__WB_MANIFEST]);

registerRoute(({ request }) => request.mode === "navigate", new NetworkOnly());

setCatchHandler(async ({ event }) => {
  console.log("⚠️ [SW] Catch triggered for", event.request.url);

  if (event.request.destination === "document") {
    const cached = await matchPrecache("/offline.html");
    console.log("📄 [SW] Returning offline.html:", !!cached);
    return cached || new Response("Offline page not found", { status: 503 });
  }

  return Response.error();
});

// 🔹 Кэширование локальных изображений
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// 🔹 Кэширование картинок с localhost:3001
registerRoute(
  /^https?:\/\/localhost:3001\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  new CacheFirst({
    cacheName: "remote-weather-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// 🔹 Кэширование запросов к newsapi.org
registerRoute(
  /^https:\/\/newsapi\.org\/v2\/.*$/,
  new StaleWhileRevalidate({
    cacheName: "remote-news-requests",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
