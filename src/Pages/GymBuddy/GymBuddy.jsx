
import React, { useState } from 'react';
import axios from 'axios';
import './GymBuddy.css'; // Import the CSS file

const API_KEY = "";

const GymBuddy = () => {
    const [gymData, setGymData] = useState(null);
    const [buddyData, setBuddyData] = useState(null);
    const [error, setError] = useState(null);
    const [showGyms, setShowGyms] = useState(false);
    const [showBuddies, setShowBuddies] = useState(false);
    const lat = 23.8103; 
    const lon = 90.4125; 

    const fetchGymInfo = async () => {
        try {
            const gymResponse = await axios.get(`https://csefest.srejon.com/api/v1/gyms?lat=${lat}&lon=${lon}`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
            setGymData(gymResponse.data);
            setError(null); 
        } catch (error) {
            setError('Error fetching gym data');
            console.error('Error fetching gym data:', error);
        }
    };

    const fetchGymBuddies = async () => {
        try {
            const buddyResponse = await axios.get(`https://csefest.srejon.com/api/v1/gymbros?lat=${lat}&lon=${lon}`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
            setBuddyData(buddyResponse.data);
            setError(null); 
        } catch (error) {
            setError('Error fetching gym buddies data');
            console.error('Error fetching gym buddies data:', error);
        }
    };

    const handleFetchGyms = () => {
        fetchGymInfo();
        setShowGyms(true);
        setShowBuddies(false); // Hide gym buddies
    };

    const handleFetchBuddies = () => {
        fetchGymBuddies();
        setShowBuddies(true);
        setShowGyms(false); // Hide gyms
    };

    return (
        <div>
            <h2>Find a Gym Friend</h2>
            <button onClick={handleFetchGyms}>Fetch Gym Info</button>
            <button onClick={handleFetchBuddies}>Fetch Gym Buddies</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {showGyms && gymData && (
                <div className="card-container">
                    <h3>Nearby Gyms</h3>
                    {gymData.data.map(gym => (
                        <div className="card" key={gym.id}>
                            <h4>{gym.name}</h4>
                            <p>Location: {gym.location}</p>
                            <p>Rating: {gym.rating}</p>
                            <p>Monthly Fee: {gym.monthlyFee} BDT</p>
                            <p>Facilities: {gym.facilities.join(', ')}</p>
                            <p>Opening Hours: {gym.openingHours}</p>
                            <p>Trainers: {gym.trainers.map(trainer => trainer.name).join(', ')}</p>
                            <a href={gym.socialMedia.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href={gym.socialMedia.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    ))}
                </div>
            )}
            {showBuddies && buddyData && (
                <div className="card-container">
                    <h3>Nearby Gym Buddies</h3>
                    {buddyData.data.map(buddy => (
                        <div className="card" key={buddy.id}>
                            <h4>{buddy.name}</h4>
                            <p>Age: {buddy.age}</p>
                            <p>Experience: {buddy.experience}</p>
                            <p>Specialties: {buddy.specialties.join(', ')}</p>
                            <p>Availability: {buddy.availability.join(', ')}</p>
                            <p>Bio: {buddy.bio}</p>
                            <p>Preferred Gym: {buddy.preferredGym}</p>
                            <p>Fitness Goals: {buddy.fitnessGoals.join(', ')}</p>
                            <p>Experience Level: {buddy.experienceLevel}</p>
                            <p>Achievements:</p>
                            <ul>
                                {buddy.achievements.map((achievement, index) => (
                                    <li key={index}>
                                        <strong>{achievement.title}</strong> - {achievement.date}: {achievement.description}
                                    </li>
                                ))}
                            </ul>
                            <p>Languages: {buddy.languages.join(', ')}</p>
                            <p>Certifications:</p>
                            <ul>
                                {buddy.certifications.map((cert, index) => (
                                    <li key={index}>
                                        {cert.name} (Issued by: {cert.issuer}, Year: {cert.year})
                                    </li>
                                ))}
                            </ul>
                            <h4>Connect with {buddy.name}</h4>
                            <p>
                                <a href={buddy.socialMedia.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> | 
                                <a href={buddy.socialMedia.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> | 
                                <a href={buddy.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GymBuddy;