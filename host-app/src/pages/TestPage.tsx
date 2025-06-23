import { useEffect, useState } from "react";
import { GetAllNews } from "../services/API";

const TestPage = () => {
  const [news, setNews] = useState<any>();

  useEffect(() => {
    GetAllNews()
      .then((res) => setNews(res.articles))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h1>Тестовая</h1>
      {news?.map((item: any, index: number) => (
        <div key={index} style={{ marginBottom: 50 }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TestPage;
