import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LoginAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginAdmin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      navigate("/admin");
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <button
        className="btn-close"
        onClick={handleClose}
        aria-label="Close"
      ></button>
      <h1>Đăng Nhập Quản Trị Viên</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="btn-login-admin" onClick={handleLogin}>
        Đăng Nhập
      </button>
    </div>
  );
};

export default LoginAdmin;
