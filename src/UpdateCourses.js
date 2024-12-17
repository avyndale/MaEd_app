import React, { useState, useEffect } from "react";
import "./UpdateCourses.css";
import udmlogo from "./udmlogo.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourses = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    price: "Free",
    status: "Active",
    videoLinks: [""],
  });
  const [errors, setErrors] = useState({ videoLinks: [] });

  const { courseId } = useParams(); // Fetch the course ID from the URL
  const navigate = useNavigate();

  // Fetch course data when the component mounts
  useEffect(() => {
    if (courseId) {
      // Fetch course data
      axios
        .get(`http://localhost:5000/api/courses/${courseId}`)
        .then((response) => {
          setCourseDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
          alert("Failed to fetch course details");
        });
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoChange = (index, value) => {
    const updatedLinks = [...courseDetails.videoLinks];
    updatedLinks[index] = value;
    setCourseDetails((prev) => ({
      ...prev,
      videoLinks: updatedLinks,
    }));
  };

  const addVideoPart = () => {
    if (courseDetails.videoLinks.length < 10) {
      setCourseDetails((prev) => ({
        ...prev,
        videoLinks: [...prev.videoLinks, ""],
      }));
    } else {
      alert("You can only add up to 10 parts.");
    }
  };

  const removeVideoPart = (index) => {
    const updatedLinks = [...courseDetails.videoLinks];
    updatedLinks.splice(index, 1);
    setCourseDetails((prev) => ({
      ...prev,
      videoLinks: updatedLinks,
    }));
  };

  // Valid YouTube URL regex updated to support both full and shortened YouTube links
  const isValidYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=[a-zA-Z0-9_-]+|youtu\.be\/[a-zA-Z0-9_-]+)$/;
    return youtubeRegex.test(url);
  };

  const renderVideoPreview = (url) => {
    const youtubeMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
    );

    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return (
        <div>
          <iframe
            width="200"
            height="150"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video preview"
          ></iframe>
        </div>
      );
    }

    return <div style={{ color: "red" }}>Invalid YouTube URL</div>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate video links before submitting
    const invalidLinks = courseDetails.videoLinks.filter(
      (link) => !link.trim() || !isValidYouTubeUrl(link)
    );

    if (invalidLinks.length > 0) {
      setErrors({
        ...errors,
        videoLinks: invalidLinks.map((link) =>
          !link.trim() ? "Video link is required" : "Invalid YouTube URL"
        ),
      });
      alert("Please add valid YouTube video links.");
      return;
    }

    // Proceed to submit the course update
    axios
      .put(`http://localhost:5000/api/courses/${courseId}`, courseDetails)
      .then(() => {
        alert("Course updated successfully!");
        navigate("/admin/courses-dashboard"); // Redirect to course dashboard
      })
      .catch((error) => {
        console.error("Error updating the course:", error);
        alert("Failed to update course. Please try again.");
      });
  };

  const handleCancel = () => {
    navigate("/admin/courses-dashboard"); // Navigate back to the courses dashboard
  };

  return (
    <div className="admin-dashboard30">
      <div className="sidebar30">
        <div className="logo-section30">
          <img src={udmlogo} alt="Logo" className="logo130" />
          <h2>MASTER OF EDUCATION</h2>
        </div>
        <ul className="sidebar-links30">
          <li onClick={() => navigate("/admin/courses-dashboard")}>DASHBOARD</li>
          <li onClick={() => navigate("/admin/manage-teachers")}>TEACHERS</li>
          <li onClick={() => navigate("/admin/manage-students")}>STUDENTS</li>
          <li onClick={() => navigate("/admin/manage-admins")}>ADMIN</li>
          <li onClick={() => navigate("/admin/manage-reports")}>REPORT</li>
          <li
            onClick={() => {
              localStorage.removeItem("token");
              alert("Logged out successfully");
              navigate("/login");
            }}
          >
            LOG OUT
          </li>
        </ul>
      </div>

      <div className="form-content30">
        <div className="header30">
          <h2>Update Course Form</h2>
        </div>

        <form className="form30" onSubmit={handleSubmit}>
          <label className="form-label30">
            Course Title:
            <input
              type="text"
              name="title"
              value={courseDetails.title}
              onChange={handleChange}
              required
              className="form-input30"
            />
          </label>

          <label className="form-label30">
            Description:
            <textarea
              name="description"
              value={courseDetails.description}
              onChange={handleChange}
              required
              className="form-textarea30"
            />
          </label>

          <label className="form-label30">
            Status:
            <select
              name="status"
              value={courseDetails.status}
              onChange={handleChange}
              className="form-select30"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

          <label className="form-label30">
            Price:
            <select
              name="price"
              value={courseDetails.price}
              onChange={handleChange}
              className="form-select30"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </label>

          <label className="form-label30">
            Attach Videos:
            {courseDetails.videoLinks.map((link, index) => (
              <div key={index} className="video-input-container30">
                <input
                  type="text"
                  placeholder={`Video Part ${index + 1} URL`}
                  value={link}
                  onChange={(e) => handleVideoChange(index, e.target.value)}
                  required
                  className="video-input30"
                />
                {renderVideoPreview(link)} {/* Show preview for valid YouTube URLs */}
                {errors.videoLinks[index] && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.videoLinks[index]}
                  </div>
                )}
                {courseDetails.videoLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVideoPart(index)}
                    className="remove-button30"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {courseDetails.videoLinks.length < 10 && (
              <button type="button" onClick={addVideoPart} className="add-button30">
                Add Video
              </button>
            )}
          </label>

          <div className="button-container30">
            <button type="button" onClick={handleCancel} className="cancel-button30">
              Cancel
            </button>
            <button type="submit" className="submit-button30">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourses;
