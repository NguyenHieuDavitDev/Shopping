import React from "react";
import "../components/NotificationButton.css";

const NotificationButton = () => {
  const handleClick = () => {
    alert("Thông báo!");
  };

  return (
    <div className="notification-button" onClick={handleClick}>
      <i className="bi bi-bell shake-icon"></i>
    </div>
  );
};

export default NotificationButton;
