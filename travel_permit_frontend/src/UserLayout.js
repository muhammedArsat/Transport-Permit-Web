import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; // Import Sidebar component
import { Outlet } from 'react-router-dom'; // Outlet renders the page content

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle the sidebar visibility for small screens
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Hamburger Icon visible only on small screens */}
      <button
        className="hamburger"
        onClick={toggleSidebar}
        style={{ 
          display: 'block', 
          padding: '10px', 
          fontSize: '24px', 
          background: 'transparent', 
          border: 'none', 
          cursor: 'pointer' 
        }}
      >
        &#9776; {/* Hamburger Icon */}
      </button>

      {/* Sidebar (conditionally rendered based on screen size and state) */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Content section that renders based on the current route */}
      <div style={{ marginLeft: sidebarOpen ? '250px' : '0', padding: '20px', width: '100%' }}>
        <Outlet />  {/* Renders the page content based on the current route */}
      </div>
    </div>
  );
};

export default Layout;
