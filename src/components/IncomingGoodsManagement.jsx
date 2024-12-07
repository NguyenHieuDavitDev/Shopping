import React, { useState } from "react";
import "./EmployeeManagement.css";

const IncomingGoodsManagement = () => {
  const [goods, setGoods] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    quantity: "",
    supplier: "",
    dateReceived: "",
  });
  const [currentGoods, setCurrentGoods] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of items per page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGoods) {
      const updatedGoods = goods.map((item) =>
        item.id === currentGoods.id ? formData : item
      );
      setGoods(updatedGoods);
    } else {
      const newGoods = {
        ...formData,
        id: goods.length > 0 ? goods[goods.length - 1].id + 1 : 1,
      };
      setGoods([...goods, newGoods]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      productName: "",
      quantity: "",
      supplier: "",
      dateReceived: "",
    });
    setCurrentGoods(null);
  };

  const handleEdit = (item) => {
    setCurrentGoods(item);
    setFormData(item);
  };

  const handleDelete = (id) => {
    const updatedGoods = goods.filter((item) => item.id !== id);
    setGoods(updatedGoods);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredGoods = goods
    .filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.dateReceived.localeCompare(b.dateReceived);
      } else if (sortOrder === "desc") {
        return b.dateReceived.localeCompare(a.dateReceived);
      } else {
        return a.productName.localeCompare(b.productName);
      }
    });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredGoods.length / itemsPerPage);
  const indexOfLastGoods = currentPage * itemsPerPage;
  const indexOfFirstGoods = indexOfLastGoods - itemsPerPage;
  const currentGoodsList = filteredGoods.slice(
    indexOfFirstGoods,
    indexOfLastGoods
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

  return (
    <>
      <h2>Quản lý nhập hàng</h2>
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
      <button onClick={toggleForm}>
        {showForm ? "Ẩn form" : "Thêm hàng nhập"}
      </button>
      {showForm && (
        <div className="employee-management">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Tên sản phẩm"
              required
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Số lượng"
              required
            />
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Nhà cung cấp"
              required
            />
            <input
              type="date"
              name="dateReceived"
              value={formData.dateReceived}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {currentGoods ? "Cập nhật" : "Thêm hàng nhập"}
            </button>
          </form>
        </div>
      )}
      <div className="employee-list">
        <h3>Danh sách hàng nhập</h3>
        {currentGoodsList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Nhà cung cấp</th>
                <th>Ngày nhận</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentGoodsList.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.supplier}</td>
                  <td>{item.dateReceived}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Sửa</button>
                    <button onClick={() => handleDelete(item.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có hàng nhập nào.</p>
        )}
      </div>

      {/* Pagination Controls */}
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
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          <i className="fas fa-angle-right"></i>
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </>
  );
};

export default IncomingGoodsManagement;
