import React, { useState } from 'react';

const AdminMarathon = () => {
    const [distance, setDistance] = useState(null);

    const calculateDistance = () => {
        const lat1 = 23.8103;
        const lon1 = 90.4125;
        const lat2 = 22.3569;
        const lon2 = 91.7832;
        const toRadians = (degrees) => degrees * Math.PI / 180;
        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        setDistance(distance.toFixed(2));
    };

    return (
        <div>
            <h2>Admin Marathon</h2>
            <button onClick={calculateDistance}>Calculate Distance</button>
            {distance && <p>Distance: {distance} km</p>}
            <h3>Map View</h3>
            <iframe
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d589182.5612344992!2d91.09785!3d23.0836!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7f4b293267f%3A0x4b0f3cfc0b9a4fbb!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1683110810234!5m2!1sen!2sbd"
            ></iframe>
        </div>
    );
};

export default AdminMarathon;
