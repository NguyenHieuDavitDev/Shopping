import React, { useState } from "react";
import { getProducts } from "../components/ProductData";
import "../components/ProductListSale.css";

const ProductListSale = () => {
  const [cart, setCart] = useState([]);
  const products = getProducts();

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <>
      <h2 className="product-sale-title">SẢN PHẨM GIẢM GIÁ</h2>
      <div className="product-list-sale">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => addToCart(product)}
          >
            <div className="discount-badge">Giảm 10%</div>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="current-price">{product.price.toLocaleString()}₫</p>
            <p className="old-price">
              {(product.price * 0.1).toLocaleString()}₫
            </p>
            <p className="delivery-info">Giao siêu tốc 2H</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductListSale;
