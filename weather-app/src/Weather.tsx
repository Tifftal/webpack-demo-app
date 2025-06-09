import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Today from "./pages/TodayPage/Today";
import Week from "./pages/Week";

type WeatherProps = {
  baseUrl?: string;
};

const Weather: React.FC<WeatherProps> = ({ baseUrl }) => {
  return (
    <div className="weather_container">
      <h2>Погода</h2>
      <nav style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <Link to={`${baseUrl}`}>Неделя</Link>
        <Link to={`${baseUrl}/today`}>Сегодня</Link>
      </nav>
      <Routes>
        <Route path="" element={<Week />} />
        <Route path="today" element={<Today />} />
      </Routes>
    </div>
  );
};

export default Weather;
