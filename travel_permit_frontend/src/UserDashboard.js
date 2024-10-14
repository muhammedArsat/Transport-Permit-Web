import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./Header";
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate(); // Get the navigation function

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
        <div className="dashboard-summary">
          <div className="summary-card">
            <h4>Total Active Permits</h4>
            <p>5</p>
          </div>
          <div className="summary-card">
            <h4>Pending Applications</h4>
            <p>2</p>
          </div>
        </div>
        <div className="apply-permit-section">
            <h2>Apply for New Permit</h2>
            <button className="apply-btn" onClick={() => navigate('/applypermit')}>Apply Now</button>
          </div>
          <div className="my-permits-section">
            <h2>My Permits</h2>
            <button className="my-permits-btn" onClick={() => navigate('/mypermits')}>View Permits</button>
          </div>-
        </div>
        <div className="application-status-section">
          <h2>Application Status</h2>
          <button className="application-status-btn" onClick={() => navigate('/status')}>View Status</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
