import { precacheAndRoute, matchPrecache } from "workbox-precaching";
import {
  registerRoute,
  setCatchHandler,
  NavigationRoute,
} from "workbox-routing";
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
  NetworkOnly,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

// 📦 Предварительное кэширование (включая offline.html!)
precacheAndRoute(self.__WB_MANIFEST);

// 🔹 Навигация для SPA с fallback на offline.html
// const navigationRoute = new NavigationRoute(
//   new NetworkFirst({
//     cacheName: "pages",
//     plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
//   })
//   //   {
//   //     denylist: [
//   //       new RegExp("^/weather/"),
//   //       new RegExp("^/news/"),
//   //       new RegExp("\\.(js|css|png|jpg|svg|webp|woff2?)$"),
//   //       new RegExp("^/sw\\.js$"),
//   //       new RegExp("^/manifest\\.json$"),
//   //       new RegExp("^/favicon\\..*$"),
//   //     ],
//   //   }
// );
// registerRoute(navigationRoute);

registerRoute(
  new NavigationRoute(
    new NetworkOnly() // пробуем всегда сеть, иначе — ошибка
  )
);

setCatchHandler(async ({ event }) => {
  if (event.request.destination === "document") {
    const cached = await matchPrecache("/offline.html");
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

// 🔹 Fallback на offline.html при ошибке навигации
setCatchHandler(async ({ event }) => {
  if (event.request.destination === "document") {
    const cached = await matchPrecache("/offline.html");
    return cached || new Response("Offline page not found", { status: 503 });
  }

  return new Response("Not found", { status: 404 });
});
