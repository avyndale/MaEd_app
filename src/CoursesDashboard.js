import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './CoursesDashboard.css';
import udmlogo from './udmlogo.png';

function CoursesDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    title: '',
    status: '',
    price: '',
  });

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/courses', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  // Navigate to update course page
  const handleUpdateCourses = (courseId) => {
    navigate(`/admin/update-courses/${courseId}`); // Correctly pass courseId
  };

  // Navigate to add courses page
  const handleAddCourses = () => {
    navigate('/admin/add-courses');
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Apply filters to courses
  const filteredCourses = courses.filter((course) => {
    return (
      (filters.title ? course.title === filters.title : true) &&
      (filters.status ? course.status === filters.status : true) &&
      (filters.price ? course.price === filters.price : true)
    );
  });

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
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar1">
        <div className="logo-sections">
          <img src={udmlogo} alt="Logo" className="logo2" />
          <h2>MASTER OF EDUCATION</h2>
        </div>
        <ul className="sidebar-links1">
          <li className="active">DASHBOARD</li>
          <li onClick={() => navigate('/admin/manage-teachers')}>TEACHERS</li>
          <li onClick={() => navigate('/admin/manage-students')}>STUDENTS</li>
          <li onClick={() => navigate('/admin/manage-admins')}>ADMIN</li>
          <li onClick={() => navigate('/admin/admin-schedule')}>SCHEDULE</li>
          <li onClick={() => navigate('/admin/manage-reports')}>REPORT</li>
          <li onClick={handleLogout}>LOG OUT</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Courses</h1>
          <button className="add-courses-btn" onClick={handleAddCourses}>
            + Add Courses
          </button>
        </header>

        {/* Statistics */}
        <div className="stats">
          <div className="stat-box">
            {courses.filter((course) => course.status === 'Active').length} <br /> Active Courses
          </div>
          <div className="stat-box">
            {courses.filter((course) => course.price === 'Free').length} <br /> Free Courses
          </div>
          <div className="stat-box">
            {courses.filter((course) => course.price === 'Paid').length} <br /> Paid Courses
          </div>
        </div>

        {/* Course List Section */}
        <div className="course-list">
          <h2>Course List</h2>
          <div className="filters">
            <select name="title" value={filters.title} onChange={handleFilterChange}>
              <option value="">All Titles</option>
              {courses.map((course) => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select name="price" value={filters.price} onChange={handleFilterChange}>
              <option value="">Price</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* Display filtered courses */}
          <div className="course-items">
            {error && <div className="error-message">{error}</div>}
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="course-item">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <p>
                    <strong>Status:</strong> {course.status}
                  </p>
                  <p>
                    <strong>Level:</strong> {course.level}
                  </p>
                  <p>
                    <strong>Price:</strong> {course.price}
                  </p>
                  <button
                    className="update-course-btn"
                    onClick={() => handleUpdateCourses(course.id)} // Correct function call
                  >
                    Update
                  </button>
                </div>
              ))
            ) : (
              <p>No courses available. Click "Add Courses" to add a new course.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesDashboard;
