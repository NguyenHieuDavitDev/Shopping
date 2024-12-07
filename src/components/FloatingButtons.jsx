import React from "react";
import "../components/FloatingButtons.css";

const FloatingButtons = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-buttons">
      <div className="button scroll-up" onClick={scrollToTop}>
        <span>&#8593;</span>
      </div>
      <div className="button phone">
        <i className="bi bi-telephone"></i>
      </div>
      <div className="button zalo">
        <img
          className="image-zalo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png"
          alt="Zalo"
        />
      </div>
    </div>
  );
};

export default FloatingButtons;
