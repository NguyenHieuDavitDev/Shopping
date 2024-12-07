import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import ForgotPassword from "./components/Forgot-password";
import Header from "./components/Header";
import Login from "./components/Login";
import OrderSuccess from "./components/OrderSuccess";
import PaymentInfo from "./components/PaymentInfo";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import SignupForm from "./components/Signup-Form";
import Checkout from "./components/Checkout";
import { SearchProvider } from "./components/SearchContext";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Banner from "./components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FlashSale from "./components/FlashSale";
import TechNews from "./components/TechNews";
import FloatingButtons from "./components/FloatingButtons";
import NotificationButton from "./components/NotificationButton";
import ProductListSale from "./components/ProductListSale";
import ServiceFeatures from "./components/ServiceFeatures";
import Specifications from "./components/Specifications";
import CategoryProductList from "./components/CategoryProductList";
import LoginAdmin from "./components/LoginAdmin";
import Admin from "./components/Admin";

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <AppContent />
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hiddenRoutes = [
      "/product/:id",
      "/login",
      "/cart",
      "/forgot-password",
      "/signup",
      "/order-success",
      "/payment-info",
      "/checkout",
      "/admin",
      "/login-admin",
    ];

    const isHidden = hiddenRoutes.some((route) => {
      return (
        location.pathname === route ||
        (route.includes(":") &&
          location.pathname.startsWith(route.split(":")[0]))
      );
    });

    setIsVisible(!isHidden);
  }, [location]);

  const isAdminOrLoginPage =
    location.pathname === "/admin" || location.pathname === "/login-admin";

  return (
    <>
      {isVisible && !isAdminOrLoginPage && (
        <>
          <FloatingButtons />
          <NotificationButton />
          <Header />
          <Menu />
          <Banner />
          <FlashSale />
        </>
      )}
      <Routes>
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/" element={<ProductList />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/payment-info" element={<PaymentInfo />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/products/:categoryName"
          element={<CategoryProductList />}
        />
        <Route
          path="/product-specifications/:id"
          element={<Specifications />}
        />
        <Route path="/admin" element={<Admin isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login-admin"
          element={<LoginAdmin setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
      {isVisible && !isAdminOrLoginPage && (
        <>
          <ProductListSale />
          <TechNews />
          <ServiceFeatures />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
