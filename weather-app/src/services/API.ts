import axios from "axios";

const BASE_URL = "https://api.weatherapi.com/v1";

const variables = {
  key: "4fcd81f263f043ffaeb100029250306",
  lang: "ru",
  q: "Moscow",
};

export const GetCurrentWeather = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: variables,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении погоды:", error);
    throw error;
  }
};

export const GetForecastWeather = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: { ...variables, days: 7 },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении прогноза:", error);
    throw error;
  }
};
