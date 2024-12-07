import React, { useState } from "react";
import "./EmployeeManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    customerName: "",
    orderDate: "",
    status: "",
  });
  const [currentOrder, setCurrentOrder] = useState(null);
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
    if (currentOrder) {
      const updatedOrders = orders.map((order) =>
        order.id === currentOrder.id ? formData : order
      );
      setOrders(updatedOrders);
    } else {
      const newOrder = {
        ...formData,
        id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
      };
      setOrders([...orders, newOrder]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      customerName: "",
      orderDate: "",
      status: "",
    });
    setCurrentOrder(null);
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setFormData(order);
  };

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredOrders = orders
    .filter((order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.orderDate.localeCompare(b.orderDate);
      } else if (sortOrder === "desc") {
        return b.orderDate.localeCompare(a.orderDate);
      } else {
        return a.customerName.localeCompare(b.customerName);
      }
    });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
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
      <h2>Quản lý đơn đặt hàng</h2>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khách hàng"
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
        {showForm ? "Ẩn form" : "Thêm đơn hàng"}
      </button>
      {showForm && (
        <div className="employee-management">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Tên khách hàng"
              required
            />
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="canceled">Đã hủy</option>
            </select>
            <button type="submit">
              {currentOrder ? "Cập nhật" : "Thêm đơn hàng"}
            </button>
          </form>
        </div>
      )}
      <div className="employee-list">
        <h3>Danh sách đơn hàng</h3>
        {currentOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên khách hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                  <td>
                    <button onClick={() => handleEdit(order)}>Sửa</button>
                    <button onClick={() => handleDelete(order.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có đơn hàng nào.</p>
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

export default OrderManagement;
