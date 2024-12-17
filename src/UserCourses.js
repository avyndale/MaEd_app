import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserCourses.css";
import udmLogo from "./udmlogo.png"; // Import the logo from the 'src' folder

const UserCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // State to store the fetched courses
  const [videos, setVideos] = useState([]); // State to store videos of selected course
  const [error, setError] = useState(""); // State to handle any errors
  const [selectedCourse, setSelectedCourse] = useState(null); // State to handle the selected course
  const [currentVideoUrl, setCurrentVideoUrl] = useState(""); // Store the currently playing video URL
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  // Fetch videos for the selected course
  const fetchVideosForCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/videos/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const videoData = await response.json();
      setVideos(videoData);

      // Automatically set the first video URL to play
      if (videoData.length > 0) {
        setCurrentVideoUrl(videoData[0].video_url);
        setIsModalOpen(true); // Open the modal
      } else {
        setCurrentVideoUrl("");
        setIsModalOpen(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle course card click to show its videos in a modal
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    fetchVideosForCourse(course.id);
  };

  // Handle video click to play it in the modal
  const handleVideoClick = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl("");
  };

  return (
    <div className="courses-container9">
      {/* Sidebar */}
      <div className="sidebar9">
        <div className="logo9">
          <img src={udmLogo} alt="Logo" className="logo-img9" />
        </div>
        <h2 className="sidebar-title9">MASTER OF EDUCATION</h2>
        <ul className="menu9">
          <li className="menu-item9" onClick={() => navigate("/Announcement")}>
            HOME
          </li>
          <li className="menu-item9 active9">COURSES</li>
          <li className="menu-item9" onClick={() => navigate("/Schedule")}>
            SCHEDULE
          </li>
          <li className="menu-item9" onClick={() => navigate("/UserAbout")}>
            ABOUT
          </li>
          <li className="menu-item9" onClick={() => navigate("/login")}>
            LOG OUT
          </li>
        </ul>
        <footer className="sidebar-footer9">All rights reserved</footer>
      </div>

      {/* Content */}
      <div className="content9">
        <h1 className="content-title9">Courses</h1>

        {/* Display error if there is any */}
        {error && <div className="error-message9">{error}</div>}

        {/* Display courses dynamically */}
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="course-card9"
              onClick={() => handleCourseClick(course)}
            >
              <div className="course-info9">
                <h3 className="course-title9">{course.title}</h3>
                <p className="course-description9">{course.description}</p>
              </div>
              <div className="course-details9">
                <p className="course-price9">{course.price}</p>
                <p className="course-level9">LEVEL: {course.level}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            <h4>{selectedCourse.title} - Videos</h4>

            {/* Video Player */}
            {currentVideoUrl ? (
              <iframe
                src={
                  currentVideoUrl.includes("watch?v=")
                    ? currentVideoUrl.replace("watch?v=", "embed/")
                    : currentVideoUrl
                }
                width="560"
                height="315"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
              ></iframe>
            ) : (
              <p>No video selected.</p>
            )}

            {/* Video List */}
            <div className="video-list">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="video-item"
                  onClick={() => handleVideoClick(video.video_url)}
                >
                  Part {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCourses;
