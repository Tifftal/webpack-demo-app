import React, { useEffect, useState } from "react";
import { GetAllNews } from "../../services/API";

const AllNews = () => {
  const [news, setNews] = useState<any>();

  useEffect(() => {
    GetAllNews()
      .then((res) => setNews(res.articles))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h1>Все новости про биток</h1>
      {news?.map((item: any, index: number) => (
        <div key={index} style={{ marginBottom: 50 }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllNews;
