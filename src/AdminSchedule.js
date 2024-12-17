import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './AdminSchedule.css';
import udmlogo from './udmlogo.png';
import { useNavigate } from 'react-router-dom';

const AdminSchedule = () => {
  const [schedulesList, setSchedulesList] = useState([]); // List of schedules
  const [courses, setCourses] = useState([]); // Courses dropdown
  const [teachers, setTeachers] = useState([]); // Teachers dropdown
  const [newSchedule, setNewSchedule] = useState({
    course_id: '',
    teacher_id: '',
    day: '',
    time: '',
    room: '',
    modality: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch all schedules, courses, and teachers
  useEffect(() => {
    axios
      .get('http://localhost:5000/schedules') // Get schedules
      .then((response) => setSchedulesList(response.data))
      .catch((error) => {
        console.error('Error fetching schedules:', error);
        toast.error('Failed to fetch schedules');
      });

    axios
      .get('http://localhost:5000/courses') // Get courses
      .then((response) => setCourses(response.data))
      .catch((error) => {
        console.error('Error fetching courses:', error);
        toast.error('Failed to fetch courses');
      });

    axios
      .get('http://localhost:5000/teachers') // Get teachers (from `users` table with role='teacher')
      .then((response) => setTeachers(response.data))
      .catch((error) => {
        console.error('Error fetching teachers:', error);
        toast.error('Failed to fetch teachers');
      });
  }, []);

  // Handle form submission for adding a schedule
  const handleAddSchedule = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/schedules', newSchedule) // Add schedule
      .then(() => {
        toast.success('Schedule added successfully');
        setNewSchedule({
          course_id: '',
          teacher_id: '',
          day: '',
          time: '',
          room: '',
          modality: '',
        });
        return axios.get('http://localhost:5000/schedules'); // Refresh schedule list
      })
      .then((response) => setSchedulesList(response.data))
      .catch((error) => {
        console.error('Error adding schedule:', error);
        toast.error('Failed to add schedule');
      });
  };

  // Delete a schedule
  const handleDeleteSchedule = (id) => {
    axios
      .delete(`http://localhost:5000/schedules/${id}`) // Delete schedule
      .then(() => {
        toast.success('Schedule deleted successfully');
        return axios.get('http://localhost:5000/schedules'); // Refresh schedule list
      })
      .then((response) => setSchedulesList(response.data))
      .catch((error) => {
        console.error('Error deleting schedule:', error);
        toast.error('Failed to delete schedule');
      });
  };

  const handleDashboardClick = () => navigate('/admin/courses-dashboard');
  const handleTeachersClick = () => navigate('/admin/manage-teachers');
  const handleAdminsClick = () => navigate('/admin/manage-admins');
  const handleReportsClick = () => navigate('/admin/manage-reports');
  const handleStudentsClick = () => navigate('/admin/manage-students');
  const handleLogOutClick = () => navigate('/login');

  return (
    <div className="admin-dashboard10">
      {/* Sidebar */}
      <div className="sidebar10">
        <div className="logo-section10">
          <img src={udmlogo} alt="Logo" className="logo10" />
          <h2>MASTER OF EDUCATION</h2>
        </div>
        <ul className="sidebar-links10">
          <li onClick={handleDashboardClick}>DASHBOARD</li>
          <li onClick={handleTeachersClick}>TEACHERS</li>
          <li onClick={handleStudentsClick}>STUDENTS</li>
          <li onClick={handleAdminsClick}>ADMIN</li>
          <li className='active10'>SCHEDULE</li>
          <li onClick={handleReportsClick}>REPORT</li>
          <li onClick={handleLogOutClick}>LOG OUT</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content10">
        <header className="header10">
          <h1>Manage Schedules</h1>
          <button className="add-schedule-btn10" onClick={() => setIsModalOpen(true)}>
            + Add Schedule
          </button>
        </header>

        {/* Table Section */}
        <div className="schedules-table10">
          <h2>Schedules</h2>
          <div className="table-controls10">
            <label>
              Show
              <select>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              Entries
            </label>
          </div>

          <table className="table10">
            <thead>
              <tr>
                <th>Course</th>
                <th>Teacher</th>
                <th>Day</th>
                <th>Time</th>
                <th>Room</th>
                <th>Modality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedulesList.map((sched) => (
                <tr key={sched.id}>
                  <td>{sched.course}</td>
                  <td>{sched.teacher}</td>
                  <td>{sched.day}</td>
                  <td>{sched.time}</td>
                  <td>{sched.room}</td>
                  <td>{sched.modality}</td>
                  <td>
                    <button onClick={() => handleDeleteSchedule(sched.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for adding a schedule */}
        {isModalOpen && (
          <div className="modal-overlay10">
            <div className="modal-content10">
              <h2>Add Schedule</h2>
              <form onSubmit={handleAddSchedule} className="schedule-form10">
                {/* Course Select */}
                <label>
                  Course:
                  <select
                    name="course_id"
                    value={newSchedule.course_id}
                    onChange={(e) => setNewSchedule({ ...newSchedule, course_id: e.target.value })}
                    required
                  >
                    <option value="">Select a Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Teacher Select */}
                <label>
                  Teacher:
                  <select
                    name="teacher_id"
                    value={newSchedule.teacher_id}
                    onChange={(e) => setNewSchedule({ ...newSchedule, teacher_id: e.target.value })}
                    required
                  >
                    <option value="">Select a Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Other Fields */}
                <label>Day:</label>
                <input
                  type="text"
                  placeholder="Day"
                  value={newSchedule.day}
                  onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                  required
                />
                <label>Time:</label>
                <input
                  type="text"
                  placeholder="Time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  required
                />
                <label>Room:</label>
                <input
                  type="text"
                  placeholder="Room"
                  value={newSchedule.room}
                  onChange={(e) => setNewSchedule({ ...newSchedule, room: e.target.value })}
                  required
                />
                <label>Modality:</label>
                <select
                  value={newSchedule.modality}
                  onChange={(e) => setNewSchedule({ ...newSchedule, modality: e.target.value })}
                  required
                >
                  <option value="">Select Modality</option>
                  <option value="FTF">FTF</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
                <button type="submit">Submit</button>
              </form>
              <button className="close-modal-btn10" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSchedule;
