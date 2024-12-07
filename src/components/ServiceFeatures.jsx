import React from "react";
import "./ServiceFeatures.css";

const ServiceFeatures = () => {
  return (
    <div className="service-features">
      <div className="feature">
        <div className="icon">
          <i className="fas fa-check-circle"></i>{" "}
        </div>
        <h3 className="feature-title">Hàng chính hãng</h3>
        <p className="feature-description">Đa dạng và chuyên sâu</p>
      </div>
      <div className="feature">
        <div className="icon">
          <i className="fas fa-undo-alt"></i>{" "}
        </div>
        <h3 className="feature-title">Đổi trả trong 7 ngày</h3>
        <p className="feature-description">Kể từ ngày mua hàng</p>
      </div>
      <div className="feature">
        <div className="icon">
          <i className="fas fa-shield-alt"></i>{" "}
        </div>
        <h3 className="feature-title">Cam kết 100%</h3>
        <p className="feature-description">Chất lượng sản phẩm</p>
      </div>
      <div className="feature">
        <div className="icon">
          <i className="fas fa-truck"></i>
        </div>
        <h3 className="feature-title">Giao hàng 2H</h3>
        <p className="feature-description">Theo từng sản phẩm</p>
      </div>
    </div>
  );
};

export default ServiceFeatures;
