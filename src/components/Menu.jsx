import React, { useState } from "react";
import "../components/Menu.css";
import Modal from "react-modal";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openPromoModal = () => {
    setIsPromoOpen(true);
  };

  const closePromoModal = () => {
    setIsPromoOpen(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const navigateToCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div>
      <div className="menu-container">
        <div className="menu-item">
          <div className="menu-icon" onClick={toggleModal}>
            <i className="fa-solid fa-bars"></i>{" "}
          </div>
          <div className="menu-content" onClick={openModal}>
            <FaBars className="menu-icon-bars" />
            Danh mục sản phẩm
          </div>
        </div>
        <div className="menu-item item-down" onClick={openPromoModal}>
          Khuyến mãi
          <i className="fa-solid fa-caret-down"></i>
        </div>
        <div className="menu-item">Dịch vụ</div>
        <div className="menu-item">Tin Tức</div>
        <div className="menu-item">Liên hệ</div>
        <div className="menu-item">Kiểm tra đơn hàng</div>
        <div className="menu-item">Hệ thống cửa hàng</div>
        <div className="menu-item hotline">Hotline: 0999999998</div>
      </div>

      <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false}>
        <button className="close-button" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>Danh mục sản phẩm</h2>
        <ul className="category-product">
          <li onClick={() => navigateToCategory("Laptop")}>Laptop</li>
          <li onClick={() => navigateToCategory("Bàn phím")}>Bàn phím</li>
          <li onClick={() => navigateToCategory("Chuột")}>Chuột</li>
          <li onClick={() => navigateToCategory("Tai nghe")}>Tai nghe</li>
          <li onClick={() => navigateToCategory("Loa Bluetooth")}>
            Loa Bluetooth
          </li>
          <li onClick={() => navigateToCategory("Phụ kiện máy tính")}>
            Phụ kiện máy tính
          </li>
        </ul>
      </Modal>

      <Modal
        isOpen={isPromoOpen}
        onRequestClose={closePromoModal}
        ariaHideApp={false}
      >
        <button className="close-button" onClick={closePromoModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>Khuyến mãi</h2>
        <ul className="promotion-product">
          <li>Giảm giá 20% cho sản phẩm đầu tiên</li>
          <li>Mua 1 tặng 1 cho các sản phẩm chọn lọc</li>
          <li>Miễn phí vận chuyển cho đơn hàng trên 500.000đ</li>
          <li>Khuyến mãi đặc biệt vào cuối tuần</li>
        </ul>
      </Modal>

      {modalVisible && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={toggleModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <ul>
              <li>Danh mục sản phẩm</li>
              <li>Khuyến mãi</li>
              <li>Dịch vụ</li>
              <li>Tin tức</li>
              <li>Liên hệ</li>
              <li>Kiểm đơn hàng</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
