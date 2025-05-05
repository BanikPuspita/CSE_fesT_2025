import React from 'react';

const Home = () => {
    return (
        <div className="homepage">
          {/* Hero Section */}
          <section className="hero">
            <h1>Welcome to Hablu’s Comeback Journey</h1>
            <p>
              Join Hablu as he works to improve his CGPA, learn new skills, and transform his life!
            </p>
            <button className="start-missions-btn">Start Missions</button>
          </section>
    
          {/* Timeline Section */}
          <section className="timeline">
            <h2>Transformation Timeline</h2>
            <ul>
              <li>🎯 Checked his CGPA and made a study plan</li>
              <li>💻 Started learning web development</li>
              <li>👕 Upgraded his wardrobe for interviews</li>
              <li>🏃‍♂️ Started training for the campus marathon</li>
            </ul>
          </section>
    
          {/* Motivational Quotes */}
          <section className="quotes">
            <h2>Motivational Quotes from Sokhina</h2>
            <blockquote>“Even senior bhaiyas have CGPAs of 3.9…”</blockquote>
            <blockquote>“You have god-given talents. Please now return them to God.”</blockquote>
          </section>
        </div>
      );
    };

export default Home;