import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAbout.css';
import Udmlogo from './udmlogo.png'; // Import the logo

const UserAbout = () => {
  const navigate = useNavigate();

  const handleAnnouncementClick = () => {
    navigate('/Announcement');
  };

  const handleScheduleClick = () => {
    navigate('/Schedule');
  };

  const handleUserCoursesClick = () => {
    navigate('/UserCourses');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  return (
    <div className="user-about-container14">
      <div className="sidebar14">
        <img src={Udmlogo} alt="University Logo" className="logo-img14" /> {/* Use imported logo */}
        <h2 className="sidebar-title14">MASTER OF EDUCATION</h2>
        <ul className="menu14">
          <li className="menu-item14" onClick={handleAnnouncementClick}>HOME</li>
          <li className="menu-item14" onClick={handleUserCoursesClick}>COURSES</li>
          <li className="menu-item14" onClick={handleScheduleClick}>SCHEDULE</li>
          <li className="menu-item14 active14">ABOUT</li>
          <li className="menu-item14" onClick={handleLogoutClick}>LOG OUT</li>
        </ul>
        <footer className="sidebar-footer14">All rights reserved</footer>
      </div>
      <div className="content14">
        <h1 className="content-title14">About us</h1>
        <h2 className="about-title14">Master of Education</h2>
        <p className="about-text14">
          Greetings from the Master of Education Learning System, your reliable resource for promoting learning and career development. The Master of Education (MaEd) with a concentration in Educational Leadership and Management is one of the graduate programs that our system is made to offer easy access to.
        </p>
        <p className="about-text14">
          Our goal is to empower leaders and educators by providing an easy-to-use platform that encourages continuous education. Whether pursuing thesis or non-thesis tracks, the system provides a centralized location for students to interact with their selected programs, browse courses, and access learning resources.
        </p>
        <p className="about-text14">
          Our dedication to innovation and quality education is the cornerstone of our educational system, guaranteeing that each graduate has the means to succeed. Come along with us as we create the educational future, one student at a time.
        </p>
      </div>
    </div>
  );
};

export default UserAbout;
