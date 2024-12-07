import React, { useEffect, useState } from "react";
import "../components/FlashSale.css";
import Flash_1 from "../assets/Flash1.webp";
import Flash_2 from "../assets/Flash2.png";
import Flash_3 from "../assets/Flash3.png";
import Flash_4 from "../assets/Flas4.png";
import Flash_5 from "../assets/Flash5.png";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(3600); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return { hours, minutes, remainingSeconds };
  };

  const { hours, minutes, remainingSeconds } = formatTime(timeLeft);

  return (
    <div className="flash-sale-container">
      <h1 className="flash-sale-title">FLASH SALE</h1>
      <div className="flash-sale-timer">
        <span className="timer-block">{String(hours).padStart(2, "0")}</span>
        <span className="timer-separator">:</span>
        <span className="timer-block">{String(minutes).padStart(2, "0")}</span>
        <span className="timer-separator">:</span>
        <span className="timer-block">
          {String(remainingSeconds).padStart(2, "0")}
        </span>
      </div>
      <button className="view-all-button">Xem tất cả &gt;</button>
      <div className="flash-sale-items">
        <div className="flash-sale-item">
          <div className="item-label">Mall</div>
          <img src={Flash_1} alt="CeraVe" />
          <div className="item-discount">-5%</div>
          <div className="item-price">₫483.000</div>
          <div className="item-status">ĐANG BÁN CHẠY</div>
          <div className="item-flash-sale">FLASH SALE NỮA ĐÊM</div>
        </div>
        <div className="flash-sale-item">
          <div className="item-label">Mall</div>
          <img src={Flash_2} alt="Dove" />
          <div className="item-discount">-27%</div>
          <div className="item-price">₫145.000</div>
          <div className="item-status">ĐANG BÁN CHẠY</div>
          <div className="item-flash-sale">FLASH SALE NỮA ĐÊM</div>
        </div>
        <div className="flash-sale-item">
          <div className="item-label">Mall</div>
          <img src={Flash_3} alt="LEGO" />
          <div className="item-discount">-35%</div>
          <div className="item-price">₫825.000</div>
          <div className="item-status">CHỈ CÒN 3</div>
          <div className="item-flash-sale">FLASH SALE NỮA ĐÊM</div>
        </div>
        <div className="flash-sale-item">
          <div className="item-label">Mall</div>
          <img src={Flash_4} alt="Pants" />
          <div className="item-discount">-26%</div>
          <div className="item-price">₫368.000</div>
          <div className="item-status">CHỈ CÒN 4</div>
          <div className="item-flash-sale">FLASH SALE NỮA ĐÊM</div>
        </div>
        <div className="flash-sale-item">
          <div className="item-label">Mall</div>
          <img src={Flash_5} alt="Product 6" />
          <div className="item-discount">-55%</div>
          <div className="item-price">₫109.000</div>
          <div className="item-status">ĐANG BÁN CHẠY</div>
          <div className="item-flash-sale">FLASH SALE NỮA ĐÊM</div>
        </div>
        <div className="flash-sale-item">
          <div className="item-label">Mall</div>
          <img src={Flash_5} alt="Product 6" />
          <div className="item-discount">-55%</div>
          <div className="item-price">₫109.000</div>
          <div className="item-status">ĐANG BÁN CHẠY</div>
          <div className="item-flash-sale">FLASH SALE NỮA ĐÊM</div>
        </div>
        <div className="flash-sale-item">
          <div className="item-label">Mall</div>
          <img src={Flash_5} alt="Product 6" />
          <div className="item-discount">-55%</div>
          <div className="item-price">₫109.000</div>
          <div className="item-status">ĐANG BÁN CHẠY</div>
          <div className="item-flash-sale">FLASH SALE NỮA ĐÊM</div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
