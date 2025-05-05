import React, { useState } from 'react';
import axios from 'axios';
import './Marathon.css';
const API_KEY = "";

const Marathon = () => {
    const [marathonData, setMarathonData] = useState([]);
    const [error, setError] = useState(null);
    const lat = 23.8103;
    const lon = 90.4125;

    const fetchMarathonInfo = async () => {
        try {
            const response = await axios.get(
                `https://csefest.srejon.com/api/v1/marathon?lat=${lat}&lon=${lon}`,
                {
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );

            // Assuming API returns: { data: [marathonObject] }
            setMarathonData(response.data.data || []);
            setError(null);
        } catch (error) {
            setError('Error fetching marathon data');
            console.error('Error fetching marathon data:', error);
        }
    };

    return (
        <div>
            <h2>Marathon Opportunities for Enthusiasts</h2>
            <p>
                Hablu dreams of crossing finish lines, feeling the rush of victory, but doesn’t know where to begin. 
                Participating in a marathon could be the breakthrough he needs for both physical and mental strength. 
                Let’s help him find the right event to start his journey.
            </p>
            <button onClick={fetchMarathonInfo}>"Discover Upcoming Marathons"</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {marathonData.length > 0 && (
                <div>
                    <h3>Upcoming Marathons</h3>
                    {marathonData.map((marathon, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', margin: '10px 0' }}>
                            <h4>{marathon.name}</h4>
                            <p><strong>Date:</strong> {marathon.date}</p>
                            <p><strong>Location:</strong> {marathon.location}</p>
                            <p><strong>Distance:</strong> {marathon.distance}</p>

                            <h5>Participants:</h5>
                            {marathon.participants && marathon.participants.length > 0 ? (
                                <ul>
                                    {marathon.participants.map((participant, idx) => (
                                        <li key={idx}>
                                            <strong>{participant.rank}. {participant.name}</strong> ({participant.category}) - Time: {participant.time}, Age: {participant.age}, Gender: {participant.gender}, Nationality: {participant.nationality}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No participants yet.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Marathon;
