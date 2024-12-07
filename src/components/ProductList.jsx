import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProductList.css";
import { getProducts } from "../components/ProductData";
import { CartContext } from "../components/CartContext";
const products = getProducts();

function ProductList() {
  const navigate = useNavigate();
  const { addToCart, cartItemCount } = useContext(CartContext);
  const [jumpingCount, setJumpingCount] = useState(false);
  const location = useLocation();
  const filteredProducts = location.state?.filteredProducts || [];
  const allProducts = getProducts();
  const productListRef = useRef(null);

  const productsToDisplay =
    filteredProducts.length > 0 ? filteredProducts : allProducts;

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    setJumpingCount(true);
    setTimeout(() => {
      setJumpingCount(false);
    }, 1000);
    navigate("/cart");
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  // Sử dụng useEffect để cuộn đến danh sách sản phẩm khi component được render
  useEffect(() => {
    if (filteredProducts.length > 0) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredProducts]);

  return (
    <>
      <h2 className="product-title">SẢN PHẨM</h2>
      <div className="product-list" ref={productListRef}>
        {productsToDisplay.length >= 0 ? (
          productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="productlist-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toLocaleString()}đ</p>
              <button
                className="buy-now-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(product);
                }}
              >
                <i className="fas fa-shopping-cart"></i>
                <span
                  className="buy-now-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(product);
                  }}
                >
                  Mua Ngay
                </span>
              </button>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào phù hợp.</p>
        )}
        <div className="cart-icon">
          <span className={`cart-count ${jumpingCount ? "jump" : ""}`}>
            {cartItemCount}
          </span>
        </div>
      </div>
    </>
  );
}

export default ProductList;
