import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import "../components/ProductDetail.css";
import "semantic-ui-css/semantic.min.css";
import "semantic-ui-css/semantic.min.js";
import { getProducts } from "../components/ProductData";
import Specifications from "./Specifications";
import StoreList from "./StoreList";
import ProductInfo from "./ProductInfo";
import ProductComparison from "./ProductComparison";
import CustomerReviews from "./CustomerReviews";
import Header from "./Header";
import Footer from "./Footer";

const products = getProducts();

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div>
        <h2>Sản phẩm không tồn tại</h2>
        <button onClick={() => navigate("/")}>Quay về trang chủ</button>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="product-detail">
        <div className="product-image-detail">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()}đ</p>

          <div className="actions">
            <button className="buy-now" onClick={handleBuyNow}>
              Mua Ngay
            </button>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Thêm vào Giỏ Hàng
            </button>
            <button className="back-button" onClick={handleGoBack}>
              Quay Lại
            </button>
          </div>
        </div>
      </div>
      <div className="product-detail-specifications">
        <Specifications product={product} />
      </div>
      <div className="store-list">
        <StoreList />
      </div>
      <div className="product-info">
        <ProductInfo />
      </div>
      <div className="product-comparison">
        <ProductComparison />
      </div>
      <div className="customer-reviews">
        <CustomerReviews />
      </div>
      <Footer className="footer" />
    </>
  );
}

export default ProductDetail;
