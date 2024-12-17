import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API calls
import './CourseList.css';
import udmlogo from './udmlogo.png';

const CourseList21 = () => {
  const [courses, setCourses] = useState([]); // State for courses
  const [page, setPage] = useState(1); // State for current page
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Entries per page
  const navigate = useNavigate();
  const teacherId = localStorage.getItem('teacherId'); // Assuming teacher ID is stored in localStorage

  // Fetch courses on component mount
  useEffect(() => {
    if (!teacherId) {
      alert('Teacher ID not found, please log in again');
      navigate('/login');
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses`, {
          params: { teacher_id: teacherId }, // Pass teacher_id as query parameter
        });
        setCourses(response.data); // Set fetched courses to state
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Failed to fetch courses. Please try again later.');
      }
    };

    fetchCourses();
  }, [teacherId, navigate]);

  // Pagination controls
  const handleNextPage = () => {
    if (page < Math.ceil(courses.length / entriesPerPage)) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleLogoutClick = () => {
    navigate('/login');
    localStorage.removeItem('teacherId');
  };

  // Update course state on input change
  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  // Save updates to backend
  const handleSave = async (course) => {
    try {
      const response = await axios.put('http://localhost:5000/courses', {
        course_id: course.course_id, // Match with backend's expected field names
        date: course.date,
        modality: course.modality,
        teacher_id: teacherId,
      });

      if (response.status === 200) {
        alert('Course updated successfully!');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course. Please try again.');
    }
  };

  // Pagination
  const startIndex = (page - 1) * entriesPerPage;
  const currentCourses = courses.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="course-list-container21">
      {/* Sidebar */}
      <div className="sidebar21">
        <img src={udmlogo} alt="Logo" className="logo-img21" />
        <h2 className="sidebar-title21">Master of Education</h2>
        <nav>
          <ul className="menu21">
            <li className="menu-item21 active21">Course List</li>
            <li className="menu-item21">Schedule</li>
            <li className="menu-item21" onClick={handleLogoutClick}>
              Log Out
            </li>
          </ul>
        </nav>
        <footer className="sidebar-footer21">All rights reserved</footer>
      </div>

      {/* Main Content */}
      <div className="main-content21">
        <h1 className="content-title21">Course List</h1>
        <div className="table-container21">
          {/* Controls for entries per page */}
          <div className="table-controls21">
            <label>
              Show
              <select value={entriesPerPage} onChange={handleEntriesChange}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              entries
            </label>
          </div>

          {/* Course Table */}
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Course Title</th>
                <th>Modality</th>
                <th>Save</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length === 0 ? (
                <tr>
                  <td colSpan="4">No courses available.</td>
                </tr>
              ) : (
                currentCourses.map((course, index) => (
                  <tr key={index}>
                    {/* Editable Date Field */}
                    <td>
                      <input
                        type="date"
                        value={course.date || ''}
                        onChange={(e) =>
                          handleCourseChange(startIndex + index, 'date', e.target.value)
                        }
                      />
                    </td>

                    {/* Non-editable Course Title */}
                    <td>{course.title}</td>

                    {/* Editable Dropdown for Modality */}
                    <td>
                      <select
                        value={course.modality || ''}
                        onChange={(e) =>
                          handleCourseChange(startIndex + index, 'modality', e.target.value)
                        }
                      >
                        <option value="FTF">FTF</option>
                        <option value="ONLINE">ONLINE</option>
                      </select>
                    </td>

                    {/* Save Button */}
                    <td>
                      <button onClick={() => handleSave(course)}>Save</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination21">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              &lt;
            </button>
            <button
              onClick={handleNextPage}
              disabled={page >= Math.ceil(courses.length / entriesPerPage)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList21;
