import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./Cart.css";
import Header from "./Header";
import Footer from "./Footer";

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleQuantityChange = (index, event) => {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      updateQuantity(index, quantity);
    }
  };

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleCheckboxChange = (index) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((_, index) => index));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product, index) => {
      if (selectedItems.includes(index)) {
        return total + product.price * product.quantity;
      }
      return total;
    }, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <div className="cart-header">
          <h2>Giỏ Hàng</h2>
          <button className="select-all" onClick={handleSelectAll}>
            {selectedItems.length === cart.length
              ? "Bỏ chọn tất cả"
              : "Chọn tất cả"}{" "}
            ({cart.length})
          </button>
        </div>
        <div className="cart-content">
          {cart.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            cart.map((product, index) => (
              <div key={index} className="cart-item">
                <input
                  type="checkbox"
                  className="cart-item-checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>Màu: {product.color}</p>
                  <p>Đơn giá: {product.price.toLocaleString()} ₫</p>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(index, product.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      className="remove-button"
                    >
                      Xóa
                    </button>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(index, e)}
                      min="1"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(index, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Thành tiền:{" "}
                    {(product.price * product.quantity).toLocaleString()} ₫
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <h3>Thông tin đơn hàng</h3>
          <p>Tổng tiền: {calculateTotal().toLocaleString()} ₫</p>
          <button onClick={handleCheckout} className="checkout-button">
            Xác nhận đơn
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
