import React from "react";
import { getProducts } from "../components/ProductData";
import "../components/ProductComparison.css";

const ProductComparison = () => {
  const products = getProducts().slice(0, 5);

  return (
    <div className="product-comparison">
      <h2 className="product-comparison-title">So sánh sản phẩm tương tự</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3 className="product-name">{product.name}</h3>
            <p className="price">{product.price.toLocaleString()} đ</p>
            <button>So sánh chi tiết</button>
            <div className="product-details">
              <p>Trọng lượng: {product.weight}</p>
              <p>Chất liệu: {product.material}</p>
              <p>Phiên bản CPU: {product.processor?.version}</p>
              <p>Số nhân: {product.processor?.cores}</p>
              <p>RAM: {product.ram}</p>
              <p>Kích thước màn hình: {product.display?.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComparison;
