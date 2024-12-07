import React from "react";
import "../components/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Hỗ trợ khách hàng</h3>
          <a href="tel:19006035">Hotline: 1900-6035</a>
          <a href="#">(1000 đ/phút, 8-21h kể cả T7, CN)</a>
          <a href="#">Các câu hỏi thường gặp</a>
          <a href="#">Gửi yêu cầu hỗ trợ</a>
          <a href="#">Hướng dẫn đặt hàng</a>
          <a href="#">Phương thức vận chuyển</a>
          <a href="#">Chính sách kiểm hàng</a>
          <a href="#">Chính sách đổi trả</a>
          <a href="#">Hướng dẫn trả góp</a>
          <a href="#">Chính sách hàng nhập khẩu</a>
          <a href="mailto:hotro@tiki.vn">Hỗ trợ khách hàng: hotro@tiki.vn</a>
          <a href="mailto:security@tiki.vn">
            Báo lỗi bảo mật: security@tiki.vn
          </a>
        </div>
        <div className="footer-section">
          <h3>Về Gear</h3>
          <a href="#">Giới thiệu Tiki</a>
          <a href="#">Tiki Blog</a>
          <a href="#">Tuyển dụng</a>
          <a href="#">Chính sách bảo mật thanh toán</a>
          <a href="#">Chính sách bảo mật thông tin cá nhân</a>
          <a href="#">Chính sách giải quyết khiếu nại</a>
          <a href="#">Điều khoản sử dụng</a>
          <a href="#">Giới thiệu Tiki Xu</a>
          <a href="#">Hợp tác liên kết cùng Tiki</a>
          <a href="#">Bán hàng cùng Tiki</a>
        </div>
        <div className="footer-section">
          <h3>Phương thức thanh toán</h3>
          <div className="pay-container">
            <a href="#">
              <i className="fab fa-cc-visa"></i> Visa
            </a>
            <a href="#">
              <i className="fab fa-cc-mastercard"></i> MasterCard
            </a>
            <a href="#">
              <i className="fab fa-cc-jcb"></i> JCB
            </a>
            <a href="#">
              <i className="fas fa-credit-card"></i> ATM
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Kết nối với chúng tôi</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.youtube.com"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
                alt="YouTube"
              />
            </a>
            <a
              href="https://zalo.me"
              aria-label="Zalo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png"
                alt="Zalo"
              />
            </a>
          </div>
        </div>
        <div className="footer-section qr-code">
          <h3>Tải ứng dụng</h3>
          <img
            src="https://hocvien.tiki.vn/wp-content/uploads/2021/12/qr-code.png"
            alt="QR Code"
          />
          <div className="download-app-container">
            <a href="#">
              <img
                src="https://seeklogo.com/images/A/apple-app-store-logo-358417D563-seeklogo.com.png"
                alt="Download on the App Store"
              />
            </a>
            <a href="#">
              <img
                src="https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png"
                alt="Get it on Google Play"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
