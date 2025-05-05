import React from 'react';
import './StartLife.css'; // Create a separate CSS file for styles

const StartLife = () => {
  const handleMissionClick = (message) => {
    alert(message);
  };

  return (
    <div>
      <header>
        <h1>💔 Hablu's Heartbreak Missions 💪</h1>
        <p>From heartbreak to hero — help Hablu complete his glow-up!</p>
      </header>

      <section className="missions">
        <div className="card">
          <h2>1. Save Your CGPA</h2>
          <p>Check your grades, attend classes (maybe), and aim for that 3.0+</p>
          <button className="btn" onClick={() => handleMissionClick('Study hard, Hablu! 📚')}>
            Start Mission
          </button>
        </div>

        <div className="card">
          <h2>2. Learn New Skills</h2>
          <p>Time to return those god-given talents to God—with interest.</p>
          <button className="btn" onClick={() => handleMissionClick('Enroll in a course today! 🎓')}>
            Start Mission
          </button>
        </div>

        <div className="card">
          <h2>3. Dress Better</h2>
          <p>Say goodbye to hackathon T-shirts. Hello fashion icon!</p>
          <button className="btn" onClick={() => handleMissionClick('Go shopping smartly! 👕')}>
            Start Mission
          </button>
        </div>

        <div className="card">
          <h2>4. Get a Job</h2>
          <p>If salary &lt; 70k: "Bhaag beta Hablu!" Else: "Baba bolo kobul!"</p>
          <button className="btn" onClick={() => handleMissionClick('Polish your resume and apply now! 💼')}>
            Start Mission
          </button>
        </div>

        <div className="card">
          <h2>5. Run Hablu, Run!</h2>
          <p>Start training for the marathon. No more 200m gasps.</p>
          <button className="btn" onClick={() => handleMissionClick('Lace up your shoes! 🏃‍♂️')}>
            Start Mission
          </button>
        </div>

        <div className="card">
          <h2>6. Find a Gym Friend</h2>
          <p>Don't lift alone. Find your gymbro and get shredded.</p>
          <button className="btn" onClick={() => handleMissionClick('Ask around or use the API! 💪')}>
            Start Mission
          </button>
        </div>

        <div className="card">
          <h2>7. Pick a Movie</h2>
          <p>Finish strong with a feel-good film. No heartbreak, just vibes.</p>
          <button className="btn" onClick={() => handleMissionClick('Grab popcorn! 🎬')}>
            Start Mission
          </button>
        </div>
      </section>
    </div>
  );
};

export default StartLife;