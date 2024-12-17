import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function LandingPage() {
  const navigate = useNavigate(); 

  // Function to handle button click
  const handleGetStarted = () => {
    navigate('/home'); 
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Master of Education</h1>
      <p>Start your journey with us</p>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;
