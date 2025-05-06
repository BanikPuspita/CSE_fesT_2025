import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
    const navigate = useNavigate();

    const navigateToJobPage = () => {
        navigate('/admin/adminjob');
    };

    const navigateToMoviePage = () => {
        navigate('/admin/adminmovie');
    };

    const navigateToRunPage = () => {
        navigate('/admin/adminrun');
    };

    const navigateToCgpaPage = () => {
        navigate('/admin/admincgpa');
    };

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            setCurrentTime(currentDate.toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="admin-home">
            <h2>Admin Dashboard</h2>
            <div className="widgets">
                <div className="widget" onClick={navigateToJobPage}>
                    <div className="widget-title">Manage Jobs</div>
                    <div className="widget-description">Click here to manage job listings</div>
                </div>

                <div className="widget" onClick={navigateToMoviePage}>
                    <div className="widget-title">Manage Movies</div>
                    <div className="widget-description">Click here to manage movie listings</div>
                </div>

                <div className="widget" onClick={navigateToRunPage}>
                    <div className="widget-title">Admin Run</div>
                    <div className="widget-description">Click here to manage marathon details</div>
                </div>

                <div className="widget" onClick={navigateToCgpaPage}>
                    <div className="widget-title">Monitor CGPA</div>
                    <div className="widget-description">Click here to monitor CGPA trends</div>
                </div>

                <div className="widget">
                    <div className="widget-title">Current Time</div>
                    <div className="widget-description">{currentTime}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
