import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Schedule.css';
import { useNavigate } from 'react-router-dom';
import udmLogo from './udmlogo.png'; // Import the logo

const Schedule12 = () => {
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
        toast.error('Failed to load schedules!'); // Show error toast
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // Navigation functions with feedback
  const handleAnnouncementClick = () => {
    toast.info('Redirecting to Home...');
    navigate('/Announcement');
  };

  const handleUserCoursesClick = () => {
    toast.info('Redirecting to Courses...');
    navigate('/UserCourses');
  };

  const handleUserAboutClick = () => {
    toast.info('Redirecting to About...');
    navigate('/UserAbout');
  };

  const handleLogoutClick = () => {
    toast.success('Logging out...');
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Add a delay for user feedback
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
          <li className="menu-item12" onClick={handleAnnouncementClick}>
            HOME
          </li>
          <li className="menu-item12" onClick={handleUserCoursesClick}>COURSES</li>
          <li className="menu-item12 active12">SCHEDULE</li>
          <li className="menu-item12" onClick={handleUserAboutClick}>ABOUT</li>
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

export default Schedule12;
