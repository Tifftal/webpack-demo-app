import React from "react";
import { createRoot } from "react-dom/client";
import News from "./News";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/service-worker.js").then(
//       () => console.log("SW registered"),
//       (err) => console.error("SW registration failed:", err)
//     );
//   });
// }

root.render(
  <BrowserRouter>
    <News baseUrl="" />
  </BrowserRouter>
);
