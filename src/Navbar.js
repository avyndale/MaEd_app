import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';
import logo from './udmlogo.png';

function Navbar() {
  const [menuActive, setMenuActive] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setMenuActive(!menuActive); // Toggle the visibility of the menu
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span>UNIVERSIDAD DE MANILA</span>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu} aria-label="Toggle Navigation">
        <span>☰</span> {/* Hamburger icon */}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
        </li>
        <li>
          <Link to="/About" style={{ textDecoration: 'none', color: 'white' }}>About Us</Link>
        </li>
        <li>
          <Link to="/courses" style={{ textDecoration: 'none', color: 'white' }}>Courses</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
