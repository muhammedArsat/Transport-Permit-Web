import React, { useState, useEffect } from "react";
import '../css/Sidebar.css';
import { Link, useParams } from "react-router-dom";

const Sidebar = ({ isOpen, setIsAuthenticated, setUserRole }) => {
  const { email } = useParams();
  const [isTakkal, setTakkal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar

  useEffect(() => {
    const checkTime = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour >= 11 && currentHour < 12) {
        setTakkal(true);
      } else {
        setTakkal(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");

    // Update the authentication state
    setIsAuthenticated(false);
    setUserRole(null);

    // Redirect to the login page
    window.location.href = "/";
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Hamburger button */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h3>Transport Permit</h3>
        <hr />
        <ul>
          <Link to={`/user-home/${email}`}><li>Home</li></Link>
          <Link to={`/user-form/${email}`}><li>Normal Form</li></Link>
          {isTakkal ? (
            <Link to={`/takal-form/${email}`}><li>Takkaal Form</li></Link>
          ) : (
            <li style={{ color: "gray" }}>Takkal Form (only open between 11 am to 12 pm)</li>
          )}
          <Link to={`/user-dashboard/${email}`}><li>Dashboard</li></Link>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
