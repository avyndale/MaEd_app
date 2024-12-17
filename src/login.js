import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.status === 200) {
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });

        const { token, user } = response.data;

        // Save the token and user details to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('teacherId', user.id);  // Storing teacher ID if available

        // Redirect based on the user role
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/admin/courses-dashboard');
          } else if (user.role === 'teacher') {
            navigate('/teacher/teacher-schedule');
          } else if (user.role === 'student') {
            navigate('/announcement');
          } else {
            toast.error('Unknown role. Please contact admin.');
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Login Error:', error.response || error.message);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error('Incorrect password!');
            break;
          case 404:
            toast.error('User not found!');
            break;
          default:
            toast.error('Server error. Please try again later.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Log In</button>
      </form>
      <p>
        Don't have an account?{' '}
        <a href="/home" style={{ color: 'teal', textDecoration: 'none' }}>Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
