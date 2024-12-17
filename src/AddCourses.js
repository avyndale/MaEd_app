import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCourses.css';
import udmlogo from './udmlogo.png';

const AddCourses = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 'FREE',
    level: 'BEGINNER',
    status: 'Active',
    isTopCourse: false,
    teacher_id: '', // Now we'll use teacher_id based on the selected teacher
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [teachers, setTeachers] = useState([]); // Store the list of teachers

  // Fetch teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/teachers'); // Assuming an endpoint for fetching teachers
        if (!response.ok) throw new Error('Failed to fetch teachers');
        const data = await response.json();
        setTeachers(data); // Store the list of teachers
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token'); // Ensure the user is authenticated
      const response = await fetch('http://localhost:5000/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add Bearer token to the header
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add course');
      }

      setSuccessMessage('Course added successfully!');
      navigate('/admin/courses-dashboard'); // Redirect back to the dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="admin-dashboard22">
      <div className="sidebar">
        <div className="logo-section">
          <img src={udmlogo} alt="Logo" className="logo1" />
          <h2>MASTER OF EDUCATION</h2>
        </div>
        <ul className="sidebar-links0">
          <li className="active">DASHBOARD</li>
          <li onClick={() => navigate('/admin/manage-teachers')}>TEACHERS</li>
          <li>STUDENTS</li>
          <li>ADMIN</li>
          <li>REPORT</li>
          <li onClick={() => navigate('/login')}>LOG OUT</li>
        </ul>
      </div>

      <div className="form-content">
        <div className="header">
          <h2>Courses Adding Form</h2>
          <button className="back-button" onClick={() => navigate('/admin/courses-dashboard')}>
            &larr; Back to Course List
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Course Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </label>

          <label>
            Short Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
          </label>

          <label>
            Teacher:
            <select name="teacher_id" value={formData.teacher_id} onChange={handleChange} required>
              <option value="">Select a Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} {/* Adjust field name as needed */}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price:
            <select name="price" value={formData.price} onChange={handleChange} required>
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
          </label>

          <label>
            Level:
            <select name="level" value={formData.level} onChange={handleChange} required>
              <option value="BEGINNER">BEGINNER</option>
              <option value="HARD">HARD</option>
              <option value="EXPERT">EXPERT</option>
            </select>
          </label>

          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="isTopCourse"
              checked={formData.isTopCourse}
              onChange={handleChange}
            />
            Check if this is a top course
          </label>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;
