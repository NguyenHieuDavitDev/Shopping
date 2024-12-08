import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/Login.css";
import ForgotPassword from "./Forgot-password";
import SignupForm from "./Signup-Form";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value === "") {
      setUsernameError("Username is required");
    } else if (!/^[a-zA-Z]/.test(value)) {
      setUsernameError("Username must start with a letter");
    } else if (/[^a-zA-Z0-9]/.test(value)) {
      setUsernameError("Username cannot contain special characters");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let hasError = false;
    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      alert("Vui lòng điền tất cả các trường thông tin.");
      return;
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      alert("Đăng nhập thành công!");
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);

      const fromCart =
        location.state?.from === "/cart" && location.state?.orderPlaced;
      navigate(fromCart ? "/order-success" : "/product-list", {
        state: { name: username },
      });
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackToProductList = () => {
    setIsHidden(true);
    navigate("/product-list");
  };

  const handleSignup = (newUsername, newPassword) => {
    users.push({ username: newUsername, password: newPassword });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
  };

  return (
    <div
      className={`login-container ${isBlurred ? "blurred" : ""} ${
        isHidden ? "hidden" : ""
      }`}
    >
      <i className="bi bi-x" onClick={handleBackToProductList}></i>

      <h1 className="login-title">Login</h1>
      <div className="input-form-name">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        <input
          type="text"
          placeholder="Type your username"
          value={username}
          onChange={handleUsernameChange}
          onMouseEnter={() =>
            username === "" && setUsernameError("Username is required")
          }
          onMouseLeave={() => setUsernameError("")}
        />

        {usernameError && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
          >
            {usernameError}
          </div>
        )}
      </div>
      <div className="input-form-name">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-lock"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
        </svg>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Type your password"
          value={password}
          onChange={handlePasswordChange}
          onMouseEnter={() =>
            password === "" && setPasswordError("Password is required")
          }
          onMouseLeave={() => setPasswordError("")}
        />
        <a href="###" onClick={togglePasswordVisibility}>
          {" "}
          <i
            className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
          ></i>{" "}
        </a>
        {passwordError && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "12px" }}
          >
            {passwordError}
          </div>
        )}
      </div>

      <a
        href=""
        className="forgot-password"
        onClick={handleForgotPasswordClick}
      >
        Forgot password?
      </a>
      <div className="container-login-button">
        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
      <div className="social-signup">
        <p className="social-signup-text">Or Sign Up Using</p>
        <div className="social-icons">
          <div className="icon-facebook">
            <div className="icon-facebook">
              <img
                className="facebook-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                alt=""
              />
            </div>
            <div className="icon-facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="white"
                className="bi bi-twitter facebook-icon-picture"
                viewBox="0 0 16 16"
                style={{
                  backgroundColor: "#1DA1F2",
                  borderRadius: "50%",
                  padding: "8px",
                }}
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
              </svg>
            </div>
            <div className="icon-facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="white"
                className="bi bi-google facebook-icon-picture"
                viewBox="0 0 16 16"
                style={{
                  backgroundColor: "#DB4437",
                  borderRadius: "50%",
                  padding: "8px",
                }}
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="content-sign-up">Or Sign Up Using</p>
      <a href="#" className="sign-up" onClick={handleSignupClick}>
        SIGN UP
      </a>
    </div>
  );
};

export default Login;
