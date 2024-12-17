import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './ManageAdmins.css';
import udmlogo from './udmlogo.png';
import { useNavigate } from 'react-router-dom'; // Added this to fix navigation issue

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch all admins
  useEffect(() => {
    axios
      .get('http://localhost:5000/admins') // Fetch from backend API
      .then((response) => setAdmins(response.data))
      .catch((error) => console.error('Error fetching admins:', error));
  }, []);

  // Handle form submission for adding a new admin
  const handleAddAdmin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/admins', newAdmin) // POST request to backend
      .then(() => {
        toast.success('Admin added successfully!');
        setNewAdmin({ name: '', email: '', mobile: '', password: '' });
        return axios.get('http://localhost:5000/admins');
      })
      .then((response) => setAdmins(response.data))
      .catch((error) => toast.error('Error adding admin!'));
  };

  // Delete an admin
  const handleDeleteAdmin = (id) => {
    axios
      .delete(`http://localhost:5000/admins/${id}`) // DELETE request to backend
      .then(() => {
        toast.success('Admin deleted successfully!');
        return axios.get('http://localhost:5000/admins');
      })
      .then((response) => setAdmins(response.data))
      .catch((error) => toast.error('Error deleting admin!'));
  };

  // Navigation functions
  const handleDashboardClick = () => navigate('/admin/courses-dashboard');
  const handleTeachersClick = () => navigate('/admin/manage-teachers');
  const handleStudentsClick = () => navigate('/admin/manage-students');
  const handleReportsClick = () => navigate('/admin/manage-reports');
  const handleSchedulesClick = () => navigate('/admin/admin-schedule');

  // Handle logout with toast notification
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });

    setTimeout(() => {
      navigate('/login');
    }, 3000); // Redirect after 3 seconds
  };

  return (
    <div className="admin-dashboard3">
      {/* Sidebar */}
      <div className="sidebar3">
        <div className="logo-section3">
          <img src={udmlogo} alt="Logo" className="logo3" />
          <h2>MASTER OF EDUCATION</h2>
        </div>
        <ul className="sidebar-links3">
          <li onClick={handleDashboardClick}>DASHBOARD</li>
          <li onClick={handleTeachersClick}>TEACHERS</li>
          <li onClick={handleStudentsClick}>STUDENTS</li>
          <li className="active3">ADMIN</li>
          <li onClick={handleSchedulesClick}>SCHEDULE</li>
          <li onClick={handleReportsClick}>REPORT</li>
          <li onClick={handleLogout}>LOG OUT</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content3">
        <header className="header3">
          <h1>Manage Admins</h1>
          <button className="add-teacher-btn3" onClick={() => setIsModalOpen(true)}>
            + Add Admin
          </button>
        </header>

        <div className="teachers-table3">
          <h2>Admins</h2>
          <div className="table-controls3">
            <label>
              Show
              <select>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              Entries
            </label>
          </div>

          <table className="table3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.mobile}</td>
                  <td>{admin.status}</td>
                  <td>
                    <button onClick={() => handleDeleteAdmin(admin.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination3">
            <button className="pagination-btn3">&lt;</button>
            <button className="pagination-btn3">&gt;</button>
          </div>
        </div>
      </div>

      {/* Modal for adding Admin */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>ADMIN INFORMATION</h2>
            <form onSubmit={handleAddAdmin} className="teacher-form">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
                required
              />
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                required
              />
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
                required
              />
              <label>Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={newAdmin.mobile}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, mobile: e.target.value })
                }
                required
              />
              <button type="submit">Submit</button>
            </form>
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
