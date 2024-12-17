import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAbout.css';
import Udmlogo from './udmlogo.png'; // Import the logo

const TeacherAbout22 = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the other pages

  const handleTeacherScheduleClick = () => {
    navigate('/teacher/teacher-schedule');
  };


  const handleLogoutClick = () => {
    navigate('/login');
  };

  return (
    <div className="teacher-about-container22">
      {/* Sidebar */}
      <div className="sidebar22">
        <div className="sidebar-logo22">
          <img src={Udmlogo} alt="University Logo" className="logo-img22" />
        </div>
        <h2 className="sidebar-title22">MASTER OF EDUCATION</h2>
        <ul className="menu22">
          <li className="menu-item22" onClick={handleTeacherScheduleClick}>SCHEDULE</li>
          <li className="menu-item22 active22">ABOUT</li>
          <li className="menu-item22" onClick={handleLogoutClick}>LOG OUT</li>
        </ul>
        <footer className="sidebar-footer22">All rights reserved</footer>
      </div>

      {/* Main Content */}
      <div className="content22">
        <h1 className="content-title22">About us</h1>
        <h2 className="about-title22">Master of Education for Educators</h2>
        <p className="about-text22">
          Welcome to the Teacher Learning System, designed specifically to support educators in their continuous professional development. The Master of Education (MaEd) with a concentration in Educational Leadership and Management is crafted to provide teachers with the tools and resources necessary to thrive in their teaching careers.
        </p>
        <p className="about-text22">
          Our platform empowers teachers by offering an easy-to-navigate environment that facilitates access to courses, resources, and essential tools for effective teaching and learning management. Whether you are seeking to advance your teaching credentials or gain leadership expertise, we offer tailored tracks to help you achieve your professional goals.
        </p>
        <p className="about-text22">
          By integrating innovation and practical solutions into our curriculum, we ensure that our teachers are equipped with the skills needed to foster a transformative educational experience for their students. Join us as we lead the way in educator excellence and impact education positively, one teacher at a time.
        </p>
      </div>
    </div>
  );
};

export default TeacherAbout22;
