import React, { useContext, useState, useEffect } from "react";
import { useSearch } from "../components/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FaBars } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { getProducts } from "../components/ProductData";
import "../components/Header.css";

const Header = () => {
  const { setSearchTerm } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItemCount } = useContext(CartContext);
  const [jumpingCount, setJumpingCount] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [productCategoryModalIsOpen, setProductCategoryModalIsOpen] =
    useState(false);

  useEffect(() => {
    if (cartItemCount > 0) {
      setJumpingCount(true);
      const timer = setTimeout(() => {
        setJumpingCount(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  const handleMenuToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const products = getProducts();
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setSearchTerm(searchInput);
    navigate("/product-list", { state: { filteredProducts: filtered } });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    if (value.length >= 1) {
      const products = getProducts();
      const filteredSuggestions = products.filter((product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.name);
    setSuggestions([]);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo" onClick={() => navigate("/product-list")}>
        <span className="gear">GEAR</span>
      </div>
      <div className="menu-bar" onClick={handleMenuToggle}>
        <FaBars />
      </div>

      <Modal show={modalIsOpen} onHide={handleMenuToggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li
              onMouseEnter={() => setShowSubMenu(true)}
              onMouseLeave={() => setShowSubMenu(false)}
              onClick={() => setProductCategoryModalIsOpen(true)}
            >
              Danh mục sản phẩm
            </li>
            <li
              onMouseEnter={() => setShowSubMenu(true)}
              onMouseLeave={() => setShowSubMenu(false)}
              onClick={() => {}}
            >
              Khuyến mãi
              <ul className={`sub-menu ${showSubMenu ? "visible" : ""}`}></ul>
            </li>
            <li onClick={() => {}}>Dịch vụ</li>
            <li onClick={() => {}}>Tin tức</li>
            <li onClick={() => {}}>Kiểm tra đơn hàng</li>
            <li onClick={() => {}}>Hệ thống cửa hàng</li>
          </ul>
        </Modal.Body>
      </Modal>

      <Modal
        show={productCategoryModalIsOpen}
        onHide={() => {
          setProductCategoryModalIsOpen(false);
          setModalIsOpen(true);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Danh mục sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li onClick={() => {}}>Laptop</li>
            <li onClick={() => {}}>Bàn phím</li>
            <li onClick={() => {}}>Chuột</li>
            <li onClick={() => {}}>Tai nghe</li>
            <li onClick={() => {}}>Loa bluetooth</li>
            <li onClick={() => {}}>Phụ kiện máy tính</li>
            <li onClick={() => {}}>Phụ kiện điện thoại</li>
            <li onClick={() => {}}>Thiết bị ngoại vi</li>
            <li onClick={() => {}}>Phần mềm điện tử</li>
          </ul>
        </Modal.Body>
      </Modal>

      <form className="search-bar" onSubmit={handleSearch}>
        <select value={selectedCategory} onChange={handleChange}>
          <option value="" disabled>
            Danh mục sản phẩm
          </option>
          <option value="electronics">Điện tử</option>
          <option value="clothing">Thời trang</option>
          <option value="home_appliances">Đồ gia dụng</option>
          <option value="books">Sách</option>
          <option value="toys">Đồ chơi</option>
          <option value="sports">Thể thao</option>
        </select>
        <input
          className="input-search"
          type="text"
          placeholder="Tìm theo tên sản phẩm..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <div className="input-search">
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img
                src={suggestion.image}
                alt={suggestion.name}
                className="suggestion-image"
              />
              <span>{suggestion.name}</span>
            </div>
          ))}
        </div>
      )}
      <ul className="nav-links">
        <li className="nav-item" onClick={handleLoginClick}>
          <FontAwesomeIcon icon={faUser} /> Đăng nhập
        </li>
        <li className="nav-item" onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span
            className={`cart-count ${jumpingCount ? "jump" : ""}`}
            style={{ color: "red" }}
          >
            {cartItemCount}
          </span>{" "}
          Giỏ hàng
        </li>
      </ul>
    </div>
  );
};

export default Header;
