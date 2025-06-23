import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";

function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return React.lazy(() =>
    factory().catch((err) => {
      console.error("Module loading failed:", err);
      // window.location.href = "/offline.html";
      return new Promise<never>(() => {});
    })
  );
}

const News = lazyWithRetry(
  () =>
    import("news/News") as Promise<{ default: React.FC<{ baseUrl: string }> }>
);
const Weather = lazyWithRetry(
  () =>
    import("weather/Weather") as Promise<{
      default: React.FC<{ baseUrl: string }>;
    }>
);

export const App = () => {
  return (
    <>
      <nav style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <Link to="/">Главная</Link>
        <Link to="/test">Тестовая</Link>
        <Link to="/news">Новости</Link>
        <Link to="/weather">Погода</Link>
      </nav>

      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/news/*" element={<News baseUrl="/news" />} />
          <Route path="/weather/*" element={<Weather baseUrl="/weather" />} />
        </Routes>
      </Suspense>
    </>
  );
};
