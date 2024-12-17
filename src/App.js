import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Home from './Home';
import Courses from './courses';
import About from './About';
import Events from './events';
import Login from './login';
import Announcement from './Announcement';
import CoursesDashboard from './CoursesDashboard'; // Admin Dashboard
import AddCourses from './AddCourses'; // Add Courses form
import UpdateCourses from './UpdateCourses'; // Correct Import
import ManageTeachers from './ManageTeachers';
import ManageStudents from './ManageStudents';
import ManageAdmins from './ManageAdmin';
import ManageReports from './ManageReports';
import UserCourses from './UserCourses';
import Schedule from './Schedule';
import UserAbout from './UserAbout';
import TeacherSchedule12 from './TeacherSchedule';
import AdminSchedule from './AdminSchedule';
import TeacherAbout from './TeacherAbout';
import './App.css';

// Admin Route Guard
function AdminRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists
  const userRole = localStorage.getItem('userRole'); // Get the user role
  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children;
}

// Teacher Route Guard
function TeacherRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists
  const userRole = localStorage.getItem('userRole'); // Get the user role
  if (!isAuthenticated || userRole !== 'teacher') {
    return <Navigate to="/login" />;
  }
  return children;
}

// Main Section Component
function MainSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="content1">
      <div className="main-section">
        <h1 className="main-heading">Master of Education</h1>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  const [courses, setCourses] = useState([]);

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  return (
    <Router>
      <div className="App">
        {/* Toast Notifications */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />

        {/* Application Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><MainSection /></>} />
          <Route path="/home" element={<><Navbar /><Home /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/courses" element={<><Navbar /><Courses /></>} />
          <Route path="/events" element={<><Navbar /><Events /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/usercourses" element={<UserCourses />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/userabout" element={<UserAbout />} />

          {/* Admin Routes */}
          <Route path="/admin/courses-dashboard" element={<AdminRoute><CoursesDashboard /></AdminRoute>} />
          <Route path="/admin/add-courses" element={<AdminRoute><AddCourses addCourse={addCourse} /></AdminRoute>} />
          <Route path="/admin/update-courses/:courseId" element={<AdminRoute><UpdateCourses /></AdminRoute>} />
          <Route path="/admin/manage-teachers" element={<AdminRoute><ManageTeachers /></AdminRoute>} />
          <Route path="/admin/manage-students" element={<AdminRoute><ManageStudents /></AdminRoute>} />
          <Route path="/admin/manage-admins" element={<AdminRoute><ManageAdmins /></AdminRoute>} />
          <Route path="/admin/manage-reports" element={<AdminRoute><ManageReports /></AdminRoute>} />
          <Route path="/admin/admin-schedule" element={<AdminRoute><AdminSchedule /></AdminRoute>} />

          {/* Teacher Routes */}
          <Route path="/teacher/teacher-schedule" element={<TeacherRoute><TeacherSchedule12 /></TeacherRoute>} />
          <Route path="/teacher/teacher-about" element={<TeacherRoute><TeacherAbout /></TeacherRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
