import React, { useState, useEffect } from 'react';
import './css/Sb.css';
import { Link } from 'react-router-dom';

export default function Sb() {
  const [isSidebarOpen, SetSidebarOpen] = useState(false);
  const [isTakkal, setTakkal] = useState(false);

  // Time-based check for Takkal Form
  useEffect(() => {
    const checkTime = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      // Set Takkal availability between 11 am and 12 pm
      if (currentHour >= 11 && currentHour < 12) {
        setTakkal(true);
      } else {
        setTakkal(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Toggle sidebar open/close
  const toggleSideBar = () => {
    SetSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accesToken");
    localStorage.removeItem("Email");
    window.location.href = "/";
  };

  return (
    <div>
      <div className='sb-mob'>
        <div className='sb-header'>Transport Website</div>
        <div className='sb-menu' onClick={toggleSideBar}>&#9776;</div>
      </div>

      <div className={`sb ${isSidebarOpen ? 'open' : ''}`}>
        <div>Transport Website</div>
        <ul>
          <Link to={`/user-home`}><li>Home</li></Link>
          <Link to={`/user-form`}><li>User Form</li></Link>

          {isTakkal ? (
            <Link to={`/takal-form`}><li>Takkal Form</li></Link>
          ) : (
            <li style={{ color: 'gray' }}>Takkal Form (only open between 11 am to 12 pm)</li>
          )}

          <Link to={`/user-dashboard`}><li>Dashboard</li></Link>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
}
