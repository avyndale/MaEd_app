import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';
import ChatbotComponent from './Chatbot'; // Import the Chatbot component

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, role: 'user' };

      const response = await axios.post('http://localhost:5000/register', updatedFormData);
      if (response.status === 201) {
        setSuccessMessage('User registered successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setFormData({
          name: '',
          email: '',
          password: '',
          mobile: '',
        });
      } else {
        setSuccessMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('An error occurred during registration.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="Home">
      <div className="content">
        {/* Heading Section */}
        <div className="main-section1">
          <h1 className="main-heading1">Master of <br />Education</h1>
        </div>

        {/* Form Section */}
        <div className="form-container">
          <h2 className="form-title">Registration Form</h2>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="inquiry-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
          <p className="login-prompt">
            Already have an account?{' '}
            <a href="/login" style={{ textDecoration: 'none', color: 'teal' }}>
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Chatbot Component */}
      <ChatbotComponent /> {/* Ensure that this is a valid React component */}
    </div>
  );
}

export default Home;
