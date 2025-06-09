import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AllNews from "./pages/AllNews";
import HotNews from "./pages/HotNews";

type NewsProps = {
  baseUrl?: string;
};

const News: React.FC<NewsProps> = ({ baseUrl }) => {
  return (
    <div>
      <h2>News</h2>
      <ul>
        <li>🌍 New open-source tools released</li>
        <li>💻 JavaScript tops language rankings again</li>
      </ul>
      <nav style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <Link to={`${baseUrl}`}>Все новости</Link>
        <Link to={`${baseUrl}/hot`}>Горячие новости</Link>
      </nav>
      <Routes>
        <Route path="" element={<AllNews />} />
        <Route path="/hot" element={<HotNews />} />
      </Routes>
    </div>
  );
};

export default News;
