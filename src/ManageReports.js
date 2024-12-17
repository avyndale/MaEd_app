import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx'; // Import XLSX for Excel export
import 'react-toastify/dist/ReactToastify.css';
import './ManageReports.css';
import udmlogo from './udmlogo.png';

const ManageReports = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10); // State to handle number of entries
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, []);

  // Function to export table data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(courses); // Convert data to sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Courses');
    XLSX.writeFile(workbook, 'Courses_Report.xlsx'); // Save as file
  };

  // Handle pagination and slicing of data
  const handlePagination = (direction) => {
    const totalPages = Math.ceil(courses.length / entriesToShow);
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const displayedCourses = courses.slice(
    (currentPage - 1) * entriesToShow,
    currentPage * entriesToShow
  );

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing entries
  };

  const handleLogoutClick = () => {
    toast.success('Log-out successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });

    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <img src={udmlogo} alt="Logo" className="logo" />
          <h2>MASTER OF EDUCATION</h2>
        </div>
        <ul className="sidebar-links">
          <li onClick={() => navigate('/admin/courses-dashboard')}>DASHBOARD</li>
          <li onClick={() => navigate('/admin/manage-teachers')}>TEACHERS</li>
          <li onClick={() => navigate('/admin/manage-students')}>STUDENTS</li>
          <li onClick={() => navigate('/admin/manage-admins')}>ADMIN</li>
          <li onClick={() => navigate('/admin/admin-schedule')}>SCHEDULE</li>
          <li className="active">REPORT</li>
          <li onClick={handleLogoutClick}>LOG OUT</li>
        </ul>
        <footer className="sidebar-footer">All rights reserved</footer>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>Manage Reports</h1>
          <div className="header-buttons">
            <button className="excel-btn" onClick={exportToExcel}>
              EXCEL
            </button>
            <button className="print-btn" onClick={() => window.print()}>
              PRINT
            </button>
          </div>
        </header>

        <div className="reports-section">
          <h2>Summary Report</h2>
          {error && <p className="error">{error}</p>}
          <div className="table-controls">
            <label>
              Show
              <select onChange={handleEntriesChange} value={entriesToShow}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              Entries
            </label>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedCourses.length > 0 ? (
                displayedCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.price}</td>
                    <td>{course.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No data available in the table</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePagination('prev')}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span>
              Page {currentPage} of {Math.ceil(courses.length / entriesToShow)}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePagination('next')}
              disabled={currentPage === Math.ceil(courses.length / entriesToShow)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageReports;
