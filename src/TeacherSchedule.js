import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';
import { useNavigate } from 'react-router-dom';
import udmLogo from './udmlogo.png'; // Import the logo from the 'src' folder

const TeacherSchedule12 = () => {
  const [schedules, setSchedules] = useState([]); // State to hold fetched schedule data
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch schedules data from backend API
  useEffect(() => {
    axios
      .get('http://localhost:5000/schedules') // Make a GET request to fetch schedules
      .then((response) => {
        setSchedules(response.data); // Store the fetched schedules in state
      })
      .catch((error) => {
        console.error('Error fetching schedules:', error);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // Function to handle navigation to the other pages

  const handleTeacherAboutClick = () => {
    navigate('/teacher/teacher-about');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  return (
    <div className="schedule-container12">
      {/* Sidebar */}
      <div className="sidebar12">
        <div className="sidebar-logo12">
          <img src={udmLogo} alt="Logo" className="logo-img12" />
        </div>
        <h2 className="sidebar-title12">MASTER OF EDUCATION</h2>
        <ul className="menu12">
          <li className="menu-item12 active12">SCHEDULE</li>
          <li className="menu-item12" onClick={handleTeacherAboutClick}>ABOUT</li>
          <li className="menu-item12" onClick={handleLogoutClick}>LOG OUT</li>
        </ul>
        <footer className="sidebar-footer12">All rights reserved</footer>
      </div>

      {/* Main Content */}
      <div className="content12">
        <h1 className="schedule-title12">Schedule</h1>
        <div className="schedule-table-container12">
          <table className="schedule-table12">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Day</th>
                <th>Time</th>
                <th>Room</th>
                <th>Teacher</th>
                <th>Modality</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the fetched schedules and display them in the table */}
              {schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.course}</td>
                    <td>{schedule.day}</td>
                    <td>{schedule.time}</td>
                    <td>{schedule.room}</td>
                    <td>{schedule.teacher}</td>
                    <td>{schedule.modality}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No schedules available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedule12;
