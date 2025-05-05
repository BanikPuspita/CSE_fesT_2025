import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Hablu the Stupid</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/skills">Find Your Skill</a></li>
        <li><a href="/job">Find Job</a></li>
        <li><a href="/movie">Movies</a></li> 
        <li><a href="/therapist">Emotional support</a></li>
        <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <a href="#improve-studies">Improve Studies</a>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li><a href="#study-tips">Study Tips</a></li>
              <li><a href="#resources">Resources</a></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;