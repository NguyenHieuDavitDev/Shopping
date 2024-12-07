import React, { useState } from "react";
import "./EmployeeManagement.css";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    contractStartDate: "",
    contractEndDate: "",
  });
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEmployee) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === currentEmployee.id ? formData : employee
      );
      setEmployees(updatedEmployees);
    } else {
      const newEmployee = {
        ...formData,
        id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
      };
      setEmployees([...employees, newEmployee]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      contractStartDate: "",
      contractEndDate: "",
    });
    setCurrentEmployee(null);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setFormData(employee);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredEmployees = employees
    .filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortOrder === "desc") {
        return b.firstName.localeCompare(a.firstName);
      } else {
        return 0;
      }
    });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
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
      <h2>Quản lý nhân viên</h2>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mã nhân viên"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <i className="fas fa-search"></i>
        <button onClick={() => handleSortChange("asc")}>
          <i className="fas fa-sort-alpha-up"></i> Tăng dần
        </button>
        <button onClick={() => handleSortChange("desc")}>
          <i className="fas fa-sort-alpha-down"></i> Giảm dần
        </button>
      </div>
      <button onClick={toggleForm}>
        {showForm ? "Ẩn form" : "Thêm nhân viên"}
      </button>
      {showForm && (
        <div className="employee-management">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Họ"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Tên"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Địa chỉ"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <button type="submit">
              {currentEmployee ? "Cập nhật" : "Thêm nhân viên"}
            </button>
          </form>
        </div>
      )}
      <div className="employee-list">
        <h3>Danh sách nhân viên</h3>
        {currentEmployees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ</th>
                <th>Tên</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.address}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)}>Sửa</button>
                    <button onClick={() => handleDelete(employee.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có nhân viên nào.</p>
        )}
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

export default EmployeeManagement;
