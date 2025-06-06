import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <div className="homepage">
          <section className="hero">
            <h1>Welcome to Hablu’s Comeback Journey</h1>
            <button className="start-missions-btn" onClick={handleButtonClick}>
              Let’s Fix Hablu’s Life
            </button>
          </section>
    
          <section className="timeline">
            <h2>Transformation Timeline</h2>
            <ul>
              <li>🎯 Checked his CGPA and made a study plan</li>
              <li>💻 Started learning web development</li>
              <li>👕 Upgraded his wardrobe for interviews</li>
              <li>🏃‍♂️ Started training for the campus marathon</li>
            </ul>
          </section>
    
          <section className="quotes">
            <h2>Motivational Quotes from Sokhina</h2>
            <blockquote>“Even senior bhaiyas have CGPAs of 3.9…”</blockquote>
            <blockquote>“You have god-given talents. Please now return them to God.”</blockquote>
          </section>
        </div>
    );
};

export default Home;