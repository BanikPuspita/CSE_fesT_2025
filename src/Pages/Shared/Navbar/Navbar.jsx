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
        <li><a href="/cgpa">CGPA Overview</a></li>
        <li><a href="/skills">Find Your Skill</a></li>
        <li><a href="/job">Find Job</a></li>
        <li><a href="/marathon">Runner Hablu</a></li>
        <li><a href="/gymbuddy">GymBuddy</a></li>
        <li><a href="/movie">Movies</a></li> 
        <li><a href="/therapist">Emotional support</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;