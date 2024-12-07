import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = () => {
    try {
      throw new Error("Simulated error");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password-container blur">
      <h1 className="forgot-password-title">Forgot Password</h1>
      {error && <p className="error-message">{error}</p>}
      <p>Please enter your email address to reset your password.</p>
      <input
        type="email"
        placeholder="Type your email"
        className="email-input"
      />
      <button className="reset-button" onClick={handleResetPassword}>
        Reset Password
      </button>
      <p className="back-to-login">
        Remembered your password?{" "}
        <a href="#" onClick={() => navigate("/")}>
          Back to Login
        </a>{" "}
      </p>
    </div>
  );
};

export default ForgotPassword;
