import React from "react";
import "../components/TechNews.css";
import Picture1 from "../assets/tech-new/b1.webp";
import Picture2 from "../assets/tech-new/oneplus-buds-pro-2-1.webp";
import Picture3 from "../assets/tech-new/fdg.webp";
import Picture4 from "../assets/tech-new/techzones-lenovo.webp";
import Picture5 from "../assets/tech-new/tainghe.webp";
import Picture6 from "../assets/tech-new/b3.webp";

const TechNews = () => {
  const articles = [
    {
      title: "Phụ kiện này biến iPhone",
      date: "Thứ Ba, 10/01/2024",
      imageUrl: Picture1,
    },
    {
      title: "OnePlus Buds 3 lộ giá bán",
      date: "Thứ Sáu, 05/01/2024",
      imageUrl: Picture2,
    },
    {
      title: "macOS Sonoma 14.3 public beta 2",
      date: "Thứ Sáu, 05/01/2024",
      imageUrl: Picture3,
    },
    {
      title: "Cận cảnh HONOR 90 GT",
      date: "Thứ Sáu, 05/01/2024",
      imageUrl: Picture4,
    },
    {
      title: "Vivo ra mắt tai nghe iQOO TWS",
      date: "Thứ Sáu, 05/01/2024",
      imageUrl: Picture5,
    },
    {
      title: "Lenovo Xiaoxin Air 14 2023",
      date: "Thứ Sáu, 05/01/2024",
      imageUrl: Picture6,
    },
  ];

  return (
    <>
      <div className="tech-news-container">
        <div className="hearder-container">
          <h2 className="hearder-teach-new">TIN CÔNG NGHỆ</h2>
          <a href="#" className="view-all">
            Xem tất cả
          </a>
        </div>
        <div className="container">
          <div className="articles-container">
            <div className="article-first">
              <img src={articles[0].imageUrl} alt={articles[0].title} />
              <h3>{articles[0].title}</h3>
              <p>{articles[0].date}</p>
            </div>
          </div>
          <div className="container-news">
            {articles.map((article, index) => (
              <div className="article" key={index}>
                <div className="image-container">
                  <img src={article.imageUrl} alt={article.title} />
                </div>
                <div className="content-container">
                  <h3>{article.title}</h3>
                  <p>{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechNews;
