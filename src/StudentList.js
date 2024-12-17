import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentList.css'; // Import the updated CSS file
import udmlogo from './udmlogo.png'; // Ensure the path to the logo is correct

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:5000/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching student data:', error));
  }, []);

  const handleNextPage = () => {
    if (page < Math.ceil(students.length / entriesPerPage)) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLogoutClick = () => {
    // Handle logout and redirect to login page
    navigate('/login');
  };

  const startIndex = (page - 1) * entriesPerPage;
  const currentStudents = students.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="student-list-container20">
      <div className="sidebar20">
        <img src={udmlogo} alt="Logo" className="logo-img20" /> {/* Display the logo */}
        <h2 className="sidebar-title20">Master of Education</h2>
        <nav>
          <ul className="menu20">
            <li className="menu-item20 active20">Student List</li>
            <li className="menu-item20">Schedule</li>
            <li className="menu-item20">Modality</li>
            <li className="menu-item20" onClick={handleLogoutClick}>Log Out</li>
          </ul>
        </nav>
        <footer className="sidebar-footer20">All rights reserved</footer>
      </div>

      <div className="main-content20">
        <h1 className="content-title20">Student List</h1>
        <div className="table-container20">
          <div className="table-controls20">
            <label>
              Show
              <select>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              entries
            </label>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length === 0 ? (
                <tr>
                  <td colSpan="3">No data available.</td>
                </tr>
              ) : (
                currentStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination20">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              &lt;
            </button>
            <button
              onClick={handleNextPage}
              disabled={page >= Math.ceil(students.length / entriesPerPage)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
