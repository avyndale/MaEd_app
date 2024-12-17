import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './ManageTeachers.css';
import udmlogo from './udmlogo.png';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigation function

  // Fetch all teachers
  useEffect(() => {
    axios
      .get('http://localhost:5000/teachers')
      .then((response) => setTeachers(response.data))
      .catch((error) => toast.error('Error fetching teachers!'));
  }, []);

  // Handle form submission for adding a teacher
  const handleAddTeacher = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/teachers', newTeacher)
      .then(() => {
        toast.success('Teacher added successfully!');
        setNewTeacher({ name: '', email: '', mobile: '', password: '' });
        return axios.get('http://localhost:5000/teachers');
      })
      .then((response) => setTeachers(response.data))
      .catch((error) => toast.error('Error adding teacher!'));
  };

  // Delete a teacher
  const handleDeleteTeacher = (id) => {
    axios
      .delete(`http://localhost:5000/teachers/${id}`)
      .then(() => {
        toast.success('Teacher deleted successfully!');
        return axios.get('http://localhost:5000/teachers');
      })
      .then((response) => setTeachers(response.data))
      .catch((error) => toast.error('Error deleting teacher!'));
  };

  // Navigation functions
  const handleDashboardClick = () => navigate('/admin/courses-dashboard');
  const handleStudentsClick = () => navigate('/admin/manage-students');
  const handleAdminsClick = () => navigate('/admin/manage-admins');
  const handleReportsClick = () => navigate('/admin/manage-reports');
  const handleSchedulesClick = () => navigate('/admin/admin-schedule');

  // Logout with Toast Notification
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
          <li className="active3">TEACHERS</li>
          <li onClick={handleStudentsClick}>STUDENTS</li>
          <li onClick={handleAdminsClick}>ADMIN</li>
          <li onClick={handleSchedulesClick}>SCHEDULE</li>
          <li onClick={handleReportsClick}>REPORT</li>
          <li onClick={handleLogout}>LOG OUT</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content3">
        <header className="header3">
          <h1>Manage Teachers</h1>
          <button className="add-teacher-btn3" onClick={() => setIsModalOpen(true)}>
            + Add Teacher
          </button>
        </header>

        {/* Table Section */}
        <div className="teachers-table3">
          <h2>Teachers</h2>
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
                <th>Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.mobile}</td>
                  <td>{teacher.status}</td>
                  <td>
                    <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination3">
            <button className="pagination-btn3">&lt;</button>
            <button className="pagination-btn3">&gt;</button>
          </div>
        </div>

        {/* Modal for adding a teacher */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add Teacher</h2>
              <form onSubmit={handleAddTeacher} className="teacher-form">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  required
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={newTeacher.password}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, password: e.target.value })
                  }
                  required
                />
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, name: e.target.value })
                  }
                  required
                />
                <label>Mobile:</label>
                <input
                  type="text"
                  placeholder="Mobile"
                  value={newTeacher.mobile}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, mobile: e.target.value })
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
    </div>
  );
};

export default ManageTeachers;
