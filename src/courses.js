import React, { useEffect, useState } from "react";
import axios from "axios";
import "./courses.css"; // Import CSS for styling

function Courses() {
  const [courses, setCourses] = useState([]); // State to store courses
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  // Fetch courses data from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Use axios to fetch data
        const response = await axios.get("http://localhost:5000/courses");

        // If response is successful, set the courses data
        setCourses(response.data);
      } catch (error) {
        // If there is an error, update the error state
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        // Set loading to false when data is fetched or an error occurs
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="loading">Loading courses...</div>; // Show loading state
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error message
  }

  return (
    <div className="courses34-container">
      <h1 className="courses34-title">Courses</h1>
      {courses.map((course, index) => (
        <div className="course34-card" key={index}>
          <div className="course34-info">
            <h3 className="course34-title">
              <strong>{course.title}:</strong>
            </h3>
            <p className="course34-description">{course.description}</p>
          </div>
          <div className="course34-meta">
            <p className="course34-price">{course.price}</p>
            <p className="course34-level">
              <strong>LEVEL: </strong>
              <em>{course.level}</em>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Courses;
