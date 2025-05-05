import React from 'react';
import './Therapist.css';

const Therapist = () => {
  return (
    <div className="therapist-page">
      <div className="therapist-container">
        <h2 className="therapist-title">AI Therapist</h2>
        <div className="iframe-wrapper">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/yeyk4uSehQgbhAc1ReW5L"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Hablu Therapist Chatbot"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Therapist;
