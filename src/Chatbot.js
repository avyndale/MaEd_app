import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa'; // Chatbot icon
import { AiOutlineSend } from 'react-icons/ai'; // Send icon
import axios from 'axios'; // For API requests
import './ChatbotComponent.css'; // Custom styles for the chatbot

function ChatbotComponent() {
  const [message, setMessage] = useState(''); // State for the current message
  const [chatHistory, setChatHistory] = useState([]); // State for the chat history
  const [showChat, setShowChat] = useState(false); // State to toggle chat visibility

  // Function to format the courses list
  const formatCourses = (courses) => {
    return courses
      .map(course => `${course.title}\nLevel: ${course.level}\nModality: ${course.modality}\n`)
      .join("\n====================\n"); // Add a separator between courses
  };

  // Function to fetch all courses from the backend
  const fetchAllCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      const formattedCourses = formatCourses(response.data);
      return formattedCourses || "No courses available.";
    } catch (error) {
      console.error('Error fetching courses:', error);
      return "Sorry, I couldn't fetch the courses.";
    }
  };

  // Function to handle user messages
  const handleUserMessage = async (msg) => {
    // Add the user message to chat history
    const userMessage = { sender: 'user', text: msg };
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);

    // Simulate bot response based on the user message
    let botResponse = "I'm not sure about that. Can you rephrase?";

    // Check if the user asks about courses
    if (msg.toLowerCase().includes("course")) {
      botResponse = await fetchAllCourses();
    }
    // Check if the user asks for "about us"
    else if (msg.toLowerCase().includes("about us")) {
      botResponse = `
        MASTER OF EDUCATION
        Greetings from the Master of Education Learning System, your reliable resource for promoting learning and career development.
        The Master of Arts in Education (MaEd) with a concentration in Educational Leadership and Management is one of the graduate programs that our system is made to offer easy access to.
        Our goal is to empower leaders and educators by providing an easy-to-use platform that encourages continuous education.
        Whether pursuing thesis or non-thesis tracks, the system provides a centralized location for students to interact with their selected programs, browse courses, and access learning resources.
        Our dedication to innovation and quality education is the cornerstone of our educational system, guaranteeing that each graduate has the means to succeed.
        Come along with us as we create the educational future, one student at a time.
      `;
    }
    // Check if the user says "thank you" or "thanks"
    else if (msg.toLowerCase().includes("thank you") || msg.toLowerCase().includes("thanks")) {
      botResponse = "You're welcome! 😊";
    }

    // Add bot's response to chat history
    const botMessage = { sender: 'bot', text: botResponse };
    setChatHistory((prevHistory) => [...prevHistory, botMessage]);
  };

  // Toggle the chat visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // Set the initial bot message when the chat opens
  useEffect(() => {
    if (showChat) {
      const initialBotMessage = { sender: 'bot', text: 'How can I help you today?' };
      setChatHistory([initialBotMessage]); // Initialize the chat history with the bot's greeting
    }
  }, [showChat]);

  // Handle the send button click or Enter key press
  const handleSendMessage = () => {
    if (message.trim()) {
      handleUserMessage(message); // Send the message if it's not empty
      setMessage(''); // Clear the input after sending
    }
  };

  // Handle the input field change
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle the key press for Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Trigger send message function on Enter key press
    }
  };

  return (
    <div>
      {/* Circular Button to open/close the chatbot */}
      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        <FaRobot size={24} color="#fff" /> {/* Chatbot icon */}
      </button>

      {/* Chatbot Window */}
      {showChat && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>CHAT EDUMASTER</h3>
            <button className="close-btn" onClick={toggleChat}>X</button>
          </div>
          <div className="chatbot-messages">
            {chatHistory.map((msg, index) => (
              <div key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <div className="input-container">
              <input
                type="text"
                placeholder="Type a message"
                value={message} // Bind the input value to the message state
                onChange={handleChange} // Handle input change
                onKeyDown={handleKeyPress} // Handle Enter key press
              />
              <button className="send-btn" onClick={handleSendMessage}>
                <AiOutlineSend /> {/* Send icon */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotComponent;
