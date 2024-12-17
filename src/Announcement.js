import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Announcement.css';
import udmlogo from './udmlogo.png'; // Import the logo

function Announcements() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation to UserCourses
  const handleUserCoursesClick = () => {
    navigate('/UserCourses'); // Navigate to the Courses page
  };

  const handleScheduleClick = () => {
    navigate('/Schedule');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  const handleUserAboutClick = () => {
    navigate('/UserAbout');
  };

  return (
    <div className="announcements-page11">
      {/* Sidebar */}
      <div className="sidebar111">
        <div className="sidebar-logo11">
          <img src={udmlogo} alt="UDM Logo" className="sidebar-logo-image11" />
          <h3>MASTER OF EDUCATION</h3>
        </div>
        <ul className="sidebar-links11">
          <li className="active11">HOME</li>
          <li onClick={handleUserCoursesClick}>COURSES</li> {/* Add onClick */}
          <li onClick={handleScheduleClick}>SCHEDULE</li>
          <li onClick={handleUserAboutClick}>ABOUT</li>
          <li onClick={handleLogoutClick}>LOG OUT</li>
        </ul>
        <footer className="sidebar-footer11">All rights reserved</footer>
      </div>

      {/* Main Content */}
      <div className="main-content11">
        <h2 className="announcements-title11">Announcements</h2>
        <div className="classes-table-container11">
          <table className="classes-table11">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AUGUST</td>
                <td>STARTING OF CLASSES</td>
              </tr>
              <tr>
                <td>SEPTEMBER</td>
                <td>MIDTERM EXAMINATION</td>
              </tr>
              <tr>
                <td>JANUARY</td>
                <td>FINAL EXAMINATION</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
