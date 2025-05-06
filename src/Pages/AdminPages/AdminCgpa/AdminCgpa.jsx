import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AdminCgpa.css';

const AdminCgpa = () => {
    const [cgpas, setCgpas] = useState([1.95, 3.02, 2.98, 3.05, 3.00]);

    const generateGraphData = (upToSemester) => {
        const data = [];
        for (let i = 0; i < upToSemester; i++) {
            const sum = cgpas.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0);
            const avg = sum / (i + 1);
            data.push({
                semester: `Sem ${i + 1}`,
                averageCgpa: avg.toFixed(3)
            });
        }
        return data;
    };

    return (
        <div className="admin-cgpa-container">
            <h2>Hablu's Average CGPA Monitor</h2>
            <div className="chart-container">
                {cgpas.map((_, index) => (
                    <div key={index} className="chart-wrapper">
                        <h3>Graph for Semester {index + 1}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={generateGraphData(index + 1)}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="semester" />
                                <YAxis domain={[2.5, 4.0]} />
                                <Tooltip />
                                <Legend />
                                <Line type="step" dataKey="averageCgpa" stroke="#8884d8" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCgpa;
