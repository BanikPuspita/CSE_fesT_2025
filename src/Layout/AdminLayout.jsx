import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./AdminLayout.css";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken"); 
        navigate("/login");
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <h1 className="pt-24 admin-title">Admin</h1>
                <nav className="admin-nav">
                    <ul>
                        <li><Link to="/admin/adminhome" className="admin-link">Home</Link></li>
                        <li><Link to="/admin/adminmovie" className="admin-link">Movies</Link></li>
                        <li><Link to="/admin/adminjob" className="admin-link">Job</Link></li>
                        <li><Link to="/admin/adminrun" className="admin-link">Run distance</Link></li>
                        <li><Link to="/admin/admincgpa" className="admin-link">CGPA Monitor</Link></li>
                    </ul>
                </nav>
                <button className="admin-logout" onClick={handleLogout}>
                    <FaSignOutAlt className="icon" /> Logout
                </button>
            </div>

            <div className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-heading">Hablu's Progress Dashboard</h2>
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" /> Logout
                    </button>
                </header>

                <main className="admin-content">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
