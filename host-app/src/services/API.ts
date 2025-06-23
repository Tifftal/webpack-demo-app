import axios from "axios";

const BASE_URL = "https://newsapi.org/v2";

const variables = {
  apiKey: "a31c6fb914ec40a3aa95acd50311b59d",
};

export const GetTopHeadlines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { ...variables, country: "us" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении новостей:", error);
    throw error;
  }
};

export const GetAllNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: { ...variables, q: "bitcoin" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении прогноза:", error);
    throw error;
  }
};
