import React from 'react';
import './VideoCourses.css'; // Import the corresponding CSS file
import udmlogo from './udmlogo.png'; // Replace with the correct path for the logo image

const VideoCourses = () => {
  return (
    <div className="video-courses-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <img src={udmlogo} alt="Logo" className="logo" />
          <h2>MASTER OF EDUCATION</h2>
        </div>
        <ul className="sidebar-links">
          <li>HOME</li>
          <li className="active">COURSES</li>
          <li>SCHEDULE</li>
          <li>ABOUT</li>
          <li>LOG OUT</li>
        </ul>
        <footer className="footer">All rights reserved</footer>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="title">Courses</h1>

        {/* Video Placeholder */}
        <div className="video-placeholder">
          <div className="play-button">&#9654;</div> {/* Unicode for play button */}
        </div>

        {/* Course Parts */}
        <div className="course-parts">
          <div className="course-part">PART 1</div>
          <div className="course-part">PART 2</div>
          <div className="course-part">PART 3</div>
          <div className="course-part">PART 4</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCourses;
