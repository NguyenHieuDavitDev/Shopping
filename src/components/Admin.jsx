import React, { useState } from "react";
import {
  getProducts,
  addProduct as addProductToData,
} from "../components/ProductData";
import { Navigate } from "react-router-dom";
import "../components/Admin.css";
import { FaBox, FaUsers, FaWarehouse, FaClipboardList } from "react-icons/fa";
import EmployeeManagement from "./EmployeeManagement";
import OrderManagement from "./OrderManagement";
import IncomingGoodsManagement from "./IncomingGoodsManagement";
import OutgoingGoodsManagement from "./OutgoingGoodsManagement";

const Admin = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const [products, setProducts] = useState(getProducts());
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    origin: "",
    releaseDate: "",
    warranty: "",
    storageInstructions: "",
    usageInstructions: "",
    dimensions: "",
    weight: "",
    material: "",
    processor: {
      version: "",
      type: "",
      details: "",
      cores: "",
    },
    ram: "",
    display: {
      size: "",
      technology: "",
      resolution: "",
      colors: "",
      refreshRate: "",
      brightness: "",
    },
    graphics: {
      gpu: "",
    },
    storage: {
      rom: "",
      expandable: false,
    },
    rearCamera: {
      count: "",
      features: [],
      video: "",
      resolutions: [],
    },
    selfieCamera: {
      features: [],
      resolution: "",
    },
    security: [],
    specialFeatures: [],
    communications: {
      simSlots: "",
      connector: "",
      wifi: "",
      gps: "",
      bluetooth: "",
      nfc: false,
    },
    battery: {
      type: "",
      capacity: "",
    },
    os: {
      name: "",
      version: "",
    },
    boxContents: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState("products");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    } else if (
      name.startsWith("processor.") ||
      name.startsWith("display.") ||
      name.startsWith("graphics.") ||
      name.startsWith("storage.") ||
      name.startsWith("rearCamera.") ||
      name.startsWith("selfieCamera.") ||
      name.startsWith("communications.") ||
      name.startsWith("battery.") ||
      name.startsWith("os.")
    ) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Current Product:", currentProduct);
    console.log("Form Data:", formData);

    if (currentProduct) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id
          ? { ...formData, id: currentProduct.id }
          : product
      );
      setProducts(updatedProducts);
      console.log("Updated Products:", updatedProducts);
    } else {
      // Add new product
      const newProduct = { ...formData, id: products.length + 1 };
      addProductToData(newProduct);
      const updatedProducts = getProducts();
      setProducts(updatedProducts);
      console.log("New Product Added:", newProduct);
      console.log("Updated Products:", updatedProducts);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      image: "",
      origin: "",
      releaseDate: "",
      warranty: "",
      storageInstructions: "",
      usageInstructions: "",
      dimensions: "",
      weight: "",
      material: "",
      processor: {
        version: "",
        type: "",
        details: "",
        cores: "",
      },
      ram: "",
      display: {
        size: "",
        technology: "",
        resolution: "",
        colors: "",
        refreshRate: "",
        brightness: "",
      },
      graphics: {
        gpu: "",
      },
      storage: {
        rom: "",
        expandable: false,
      },
      rearCamera: {
        count: "",
        features: [],
        video: "",
        resolutions: [],
      },
      selfieCamera: {
        features: [],
        resolution: "",
      },
      security: [],
      specialFeatures: [],
      communications: {
        simSlots: "",
        connector: "",
        wifi: "",
        gps: "",
        bluetooth: "",
        nfc: false,
      },
      battery: {
        type: "",
        capacity: "",
      },
      os: {
        name: "",
        version: "",
      },
      boxContents: [],
    });
    setShowForm(false);
    setCurrentProduct(null);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log("Product Deleted:", id);
    console.log("Updated Products:", updatedProducts);
  };

  const handleUpdate = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log("Product Updated:", updatedProduct);
    console.log("Updated Products:", updatedProducts);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return (
          <>
            <h2>Quản lý sản phẩm</h2>
            <div className="search-filter-container">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên sản phẩm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i className="fas fa-search"></i>
              <button onClick={() => handleSortChange("asc")}>
                <i className="fas fa-sort-amount-up"></i> Tăng dần
              </button>
              <button onClick={() => handleSortChange("desc")}>
                <i className="fas fa-sort-amount-down"></i> Giảm dần
              </button>
              <button onClick={() => handleSortChange("alpha")}>
                <i className="fas fa-sort-alpha-down"></i> A-Z
              </button>
            </div>
            <button onClick={() => setShowForm(true)}>Thêm Sản Phẩm</button>
            {showForm && (
              <form className="admin-form" onSubmit={handleSubmit}>
                <input
                  className="admin-form-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                />
                <input
                  className="admin-form-input"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Product Price"
                  required
                />
                <input
                  className="admin-form-input"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Product"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <input
                  className="admin-form-input"
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="Origin"
                  required
                />
                <input
                  className="admin-form-input"
                  type="text"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  placeholder="Release Date"
                  required
                />
                <input
                  className="admin-form-input"
                  type="number"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                  placeholder="Warranty (months)"
                  required
                />
                <input
                  className="admin-form-input"
                  type="text"
                  name="storageInstructions"
                  value={formData.storageInstructions}
                  onChange={handleChange}
                  placeholder="Storage Instructions"
                  required
                />
                <input
                  className="admin-form-input"
                  type="text"
                  name="usageInstructions"
                  value={formData.usageInstructions}
                  onChange={handleChange}
                  placeholder="Usage Instructions"
                  required
                />
                <input
                  className="admin-form-input"
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="Dimensions"
                  required
                />
                <input
                  className="admin-form-input"
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  required
                />
                <input
                  className="admin-form-input"
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="Material"
                  required
                />
                <button type="submit">Thêm Sản Phẩm</button>
              </form>
            )}
            <div className="product-list-admin">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá (VND)</th>
                    <th>Hình ảnh</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </td>
                      <td>
                        <div className="button-container">
                          <button
                            onClick={() => handleEdit(product)}
                            className="edit"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="delete"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button onClick={goToFirstPage} disabled={currentPage === 1}>
                <i className="fas fa-angle-double-left"></i>
              </button>
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                <i className="fas fa-angle-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-angle-right"></i>
              </button>
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
          </>
        );
      case "employees":
        return <EmployeeManagement />;
      case "orders":
        return <OrderManagement />;
      case "inventory-in":
        return <IncomingGoodsManagement />;
      case "inventory-out":
        return <OutgoingGoodsManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h3>Menu Quản lý</h3>
        <ul>
          <li
            className={activeSection === "products" ? "active" : ""}
            onClick={() => setActiveSection("products")}
          >
            <FaBox /> Quản lý sản phẩm
          </li>
          <li
            className={activeSection === "employees" ? "active" : ""}
            onClick={() => setActiveSection("employees")}
          >
            <FaUsers /> Quản lý nhân viên
          </li>
          <li
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => setActiveSection("orders")}
          >
            <FaClipboardList /> Quản lý đơn đặt hàng
          </li>
          <li
            className={activeSection === "inventory-in" ? "active" : ""}
            onClick={() => setActiveSection("inventory-in")}
          >
            <FaWarehouse /> Quản lý nhập hàng
          </li>
          <li
            className={activeSection === "inventory-out" ? "active" : ""}
            onClick={() => setActiveSection("inventory-out")}
          >
            <FaWarehouse /> Quản lý xuất hàng
          </li>
        </ul>
      </div>
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default Admin;
