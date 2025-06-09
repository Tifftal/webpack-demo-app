import React, { useEffect, useState } from "react";
import { GetTopHeadlines } from "../../services/API";

const HotNews = () => {
  const [news, setNews] = useState<any>();

  useEffect(() => {
    GetTopHeadlines()
      .then((res) => setNews(res.articles))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h1>Горячие новости</h1>
      {news?.map((item: any, index: number) => (
        <div key={index} style={{ marginBottom: 50 }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HotNews;
