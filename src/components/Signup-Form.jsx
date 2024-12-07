import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Họ tên là bắt buộc";

    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Email không hợp lệ, phi có @ và tên miền hợp lệ";
    }

    if (!phone) newErrors.phone = "Số điện thoại là bắt buộc";
    if (!username) newErrors.username = "Tên đăng nhập là bắt buộc";

    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Mật khẩu phải có ít nhất một ký tự hoa";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Mật khẩu phải có ít nhất một số";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Mật khẩu phải có ít nhất một ký tự đặc biệt";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Vui lòng nhập chính xác mật khẩu";
    }

    if (!birthDate) newErrors.birthDate = "Ngày sinh là bắt buộc";
    if (!address) newErrors.address = "Địa chỉ là bắt buộc";
    if (!securityQuestion)
      newErrors.securityQuestion = "Câu hỏi bảo mật là bắt buộc";
    if (!captcha) newErrors.captcha = "Mã xác nhận là bắt buộc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSignup = () => {
    const validationPassed = validateFields();
    if (!validationPassed) {
      alert("Vui lòng điền đầy đủ thông tin và kiểm tra các lỗi.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    // Prepare user data
    const newUser = {
      username,
      password,
      fullName,
      email,
      phone,
      birthDate,
      gender,
      address,
      securityQuestion,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Dữ liệu đã được cập nhật vào users.json.");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <button className="close-button" onClick={() => navigate("/#")}>
        <i className="bi bi-x"></i>
      </button>
      <h1 className="signup-title">Đăng Ký</h1>
      <input
        className="signup-input"
        type="text"
        name="fullName"
        placeholder="Tên đầy đủ của bạn"
        value={fullName}
        onChange={handleInputChange(setFullName)}
        onBlur={validateFields}
      />
      {errors.fullName && (
        <div className="error-message">{errors.fullName}</div>
      )}

      <input
        className="signup-input"
        type="email"
        name="email"
        placeholder="Địa chỉ email"
        value={email}
        onChange={handleInputChange(setEmail)}
        onBlur={validateFields}
      />
      {errors.email && <div className="error-message">{errors.email}</div>}

      <input
        className="signup-input"
        type="text"
        name="phone"
        placeholder="Số điện thoại"
        value={phone}
        onChange={handleInputChange(setPhone)}
        onBlur={validateFields}
      />
      {errors.phone && <div className="error-message">{errors.phone}</div>}

      <input
        className="signup-input"
        type="text"
        name="username"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={handleInputChange(setUsername)}
        onBlur={validateFields}
      />
      {errors.username && (
        <div className="error-message">{errors.username}</div>
      )}

      <input
        className="signup-input"
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={handleInputChange(setPassword)}
        onBlur={validateFields}
      />
      {errors.password && (
        <div className="error-message">{errors.password}</div>
      )}

      <input
        className="signup-input"
        type="password"
        name="confirmPassword"
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChange={handleInputChange(setConfirmPassword)}
        onBlur={validateFields}
      />
      {errors.confirmPassword && (
        <div className="error-message">{errors.confirmPassword}</div>
      )}

      <input
        className="signup-input"
        type="date"
        name="birthDate"
        placeholder="Ngày sinh"
        value={birthDate}
        onChange={handleInputChange(setBirthDate)}
        onBlur={validateFields}
      />
      {errors.birthDate && (
        <div className="error-message">{errors.birthDate}</div>
      )}

      <select
        name="gender"
        value={gender}
        onChange={handleInputChange(setGender)}
        onBlur={validateFields}
      >
        <option value="">Giới tính (không bắt buộc)</option>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
        <option value="other">Khác</option>
      </select>

      <input
        className="signup-input"
        type="text"
        name="address"
        placeholder="Địa chỉ"
        value={address}
        onChange={handleInputChange(setAddress)}
        onBlur={validateFields}
      />
      {errors.address && <div className="error-message">{errors.address}</div>}

      <input
        className="signup-input"
        type="text"
        name="securityQuestion"
        placeholder="Câu hỏi bảo mật"
        value={securityQuestion}
        onChange={handleInputChange(setSecurityQuestion)}
        onBlur={validateFields}
      />
      {errors.securityQuestion && (
        <div className="error-message">{errors.securityQuestion}</div>
      )}

      <input
        className="signup-input"
        type="text"
        name="captcha"
        placeholder="Mã xác nhận/CAPTCHA"
        value={captcha}
        onChange={handleInputChange(setCaptcha)}
        onBlur={validateFields}
      />
      {errors.captcha && <div className="error-message">{errors.captcha}</div>}

      <button className="signup-button" onClick={handleSignup}>
        ĐĂNG KÝ
      </button>
    </div>
  );
};

export default SignupForm;
