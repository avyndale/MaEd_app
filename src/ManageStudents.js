import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './ManageStudents.css';
import udmlogo from './udmlogo.png';
import { useNavigate } from 'react-router-dom';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch all students
  useEffect(() => {
    axios
      .get('http://localhost:5000/students')
      .then((response) => setStudents(response.data))
      .catch((error) => toast.error('Error fetching students!'));
  }, []);

  // Handle form submission for adding a student
  const handleAddStudent = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/students', newStudent)
      .then(() => {
        toast.success('Student added successfully!');
        setNewStudent({ name: '', email: '', mobile: '', password: '' });
        return axios.get('http://localhost:5000/students');
      })
      .then((response) => setStudents(response.data))
      .catch((error) => toast.error('Error adding student!'));
  };

  // Delete a student
  const handleDeleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        toast.success('Student deleted successfully!');
        return axios.get('http://localhost:5000/students');
      })
      .then((response) => setStudents(response.data))
      .catch((error) => toast.error('Error deleting student!'));
  };

  // Handle Logout with Toast Notification
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

  const handleDashboardClick = () => navigate('/admin/courses-dashboard');
  const handleTeachersClick = () => navigate('/admin/manage-teachers');
  const handleAdminsClick = () => navigate('/admin/manage-admins');
  const handleReportsClick = () => navigate('/admin/manage-reports');
  const handleSchedulesClick = () => navigate('/admin/admin-schedule');

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
          <li className="active3">STUDENTS</li>
          <li onClick={handleAdminsClick}>ADMIN</li>
          <li onClick={handleSchedulesClick}>SCHEDULE</li>
          <li onClick={handleReportsClick}>REPORT</li>
          <li onClick={handleLogout}>LOG OUT</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content3">
        <header className="header3">
          <h1>Manage Students</h1>
          <button className="add-teacher-btn3" onClick={() => setIsModalOpen(true)}>
            + Add Student
          </button>
        </header>

        {/* Table Section */}
        <div className="teachers-table3">
          <h2>Students</h2>
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
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.mobile}</td>
                  <td>{student.status}</td>
                  <td>
                    <button onClick={() => handleDeleteStudent(student.id)}>
                      Delete
                    </button>
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

        {/* Modal for adding a student */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add Student</h2>
              <form onSubmit={handleAddStudent} className="teacher-form">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  required
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={newStudent.password}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, password: e.target.value })
                  }
                  required
                />
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  required
                />
                <label>Mobile:</label>
                <input
                  type="text"
                  placeholder="Mobile"
                  value={newStudent.mobile}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, mobile: e.target.value })
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

export default ManageStudents;
