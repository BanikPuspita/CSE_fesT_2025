import React, { useState } from 'react';
import axios from 'axios';

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
            setMarathonData(response.data.data || []); // Ensure you access `.data.data` if response format is like `{ data: [...] }`
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
            <button onClick={fetchMarathonInfo}>Fetch Marathon Info</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {marathonData.length > 0 && (
                <div>
                    <h3>Upcoming Marathons</h3>
                    <ul>
                        {marathonData.map((marathon, index) => (
                            <li key={index} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', margin: '10px 0' }}>
                                <h4>{marathon.title}</h4>
                                <p><strong>Date:</strong> {marathon.date}</p>
                                <p><strong>Location:</strong> {marathon.location}</p>
                                <p><strong>Description:</strong> {marathon.description}</p>
                                {marathon.registrationLink && (
                                    <p>
                                        <a href={marathon.registrationLink} target="_blank" rel="noopener noreferrer">
                                            Register Here
                                        </a>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Marathon;
