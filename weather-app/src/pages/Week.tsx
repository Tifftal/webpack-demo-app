import React, { useEffect, useState } from "react";
import { GetForecastWeather } from "../services/API";

const Week = () => {
  const [forecast, setForecast] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      GetForecastWeather()
        .then((res) => {
          setForecast(res.forecast);
        })
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false));
    }, 1000);
  }, []);

  return (
    <div>
      <h2>Неделя</h2>
      {isLoading && <div>Загрузка...</div>}
      {forecast?.forecastday &&
        forecast.forecastday.map((item: any, index: number) => (
          <div className="today_container" key={index}>
            <div className="today_content">
              <img
                src={`https:${item.day.condition.icon}`}
                alt={item.day.condition.text}
              />
              <p>{item.day.condition.text}</p>
            </div>
            <div className="today_content">
              <p>Макс: {item.day.maxtemp_c} °C</p>
              <p>Мин: {item.day.mintemp_c} °C</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Week;
