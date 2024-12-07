import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Specifications.css";
import { getProducts } from "../components/ProductData";

Modal.setAppElement("#root");

function Specifications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        setProduct(products[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading product...</div>;
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const sections = {
    info: {
      "Xuất xứ": product.origin,
      "Thời điểm ra mắt": product.releaseDate,
      "Thời gian bảo hành (tháng)": product.warranty,
      "Hướng dẫn bảo quản": product.storageInstructions,
      "Hướng dẫn sử dụng": product.usageInstructions,
    },
    design: {
      "Kích thước": product.dimensions,
      "Trọng lượng sản phẩm": product.weight,
      "Chất liệu": product.material,
    },
    processors: {
      "Loại CPU": product.processor?.version,
      "Số nhân": product.processor?.cores,
      "Tốc độ CPU": product.processor?.details,
    },
    ram: {
      "Dung lượng RAM": product.ram,
    },
    display: {
      "Kích thước màn hình": product.display?.size,
      "Công nghệ màn hình": product.display?.technology,
      "Độ phân giải": product.display?.resolution,
    },
    graphics: {
      GPU: product.graphics?.gpu,
    },
    storage: {
      ROM: product.storage?.rom,
      "Hỗ trợ thẻ nhớ": product.storage?.expandable ? "Có" : "Không",
    },
    rearCamera: {
      "Số lượng camera": product.rearCamera?.count,
      "Độ phân giải": product.rearCamera?.resolutions.join(", "),
      "Tính năng": product.rearCamera?.features.join(", "),
    },
    selfieCamera: {
      "Độ phân giải": product.selfieCamera?.resolution,
      "Tính năng": product.selfieCamera?.features.join(", "),
    },
    security: {
      "Bảo mật": product.security.join(", "),
    },
    others: {
      "Tính năng đặc biệt": product.specialFeatures.join(", "),
    },
    communications: {
      "Kết nối": product.communications?.connector,
      Bluetooth: product.communications?.bluetooth,
      NFC: product.communications?.nfc ? "Có" : "Không",
    },
    battery: {
      "Loại pin": product.battery?.type,
      "Dung lượng pin": product.battery?.capacity,
    },
    os: {
      "Hệ điều hành": product.os?.name,
      "Phiên bản": product.os?.version,
    },
    boxContents: {
      "Phụ kiện trong hộp": product.boxContents.join(", "),
    },
  };

  const renderProductDetails = (section) => {
    return Object.entries(sections[section] || {}).map(([key, value]) => (
      <div key={key}>
        <strong>{key}:</strong> {value || "N/A"}
      </div>
    ));
  };

  return (
    <div className="specifications">
      <div className="spec-header">
        <h2>Thông số nổi bật</h2>
        <div>
          <strong>Display:</strong> {product.display?.size || "N/A"}
        </div>
        <div>
          <strong>Camera:</strong> {product.rearCamera?.resolutions[0] || "N/A"}
        </div>
        <div>
          <strong>RAM:</strong> {product.ram || "N/A"}
        </div>
        <button onClick={toggleModal} className="improve-button">
          Xem chi tiết
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Product Details"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <span className="close" onClick={toggleModal}>
          &times;
        </span>
        <h3>Thông tin chi tiết</h3>
        <div className="tabs">
          {Object.keys(sections).map((section) => (
            <div
              key={section}
              className={`tab ${activeTab === section ? "active" : ""}`}
              onClick={() => handleTabClick(section)}
            >
              {section}
            </div>
          ))}
        </div>

        {Object.keys(sections).map((section) => (
          <div
            key={section}
            className={`tab-content ${activeTab === section ? "active" : ""}`}
          >
            {renderProductDetails(section)}
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default Specifications;
