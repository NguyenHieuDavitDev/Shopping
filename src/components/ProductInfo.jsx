import React from "react";
import "../components/ProductInfo.css";
import "semantic-ui-css/semantic.min.css";
import "semantic-ui-css/semantic.min.js";
import imac from "../assets/imac.jpeg";
import iphone from "../assets/iphone.jpg";
import macbook from "../assets/macbook.jpeg";

function ProductInfo() {
  return (
    <div className="product-info-container">
      <div className="product-description">
        <h2>Thông tin sản phẩm</h2>
        <p>Mô tả sản phẩm</p>
        <img src={imac} alt="Product" className="product-image" />
        <div className="button-container">
          <button className="read-more-button">Đọc thêm</button>
        </div>
      </div>
      <div className="related-articles">
        <h2>Bài viết liên quan</h2>
        <div className="article">
          <img src={iphone} alt="Article" className="article-image" />
          <div className="article-content">
            <p>iPhone là chưa đủ, Indonesia tiếp tục...</p>
          </div>
        </div>
        <div className="article">
          <img src={macbook} alt="Article" className="article-image" />
          <div className="article-content">
            <p>Canalys: Samsung vượt mặt Apple tro...</p>
          </div>
        </div>
        <a href="#" className="view-all-link">
          Xem tất cả
        </a>
      </div>
    </div>
  );
}

export default ProductInfo;
