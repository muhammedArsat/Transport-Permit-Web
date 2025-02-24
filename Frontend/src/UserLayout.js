import React, { useState } from 'react';
import Sidebar from './components/AdminSidebar'; // Import Sidebar component
import { Outlet } from 'react-router-dom'; // Outlet renders the page content

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle the sidebar visibility for small screens
 

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
 

      {/* Sidebar (conditionally rendered based on screen size and state) */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Content section that renders based on the current route */}
      <div style={{ marginLeft: sidebarOpen ? '0px' : '0px', padding: '5px', width: '100%' }}>
        <Outlet />  {/* Renders the page content based on the current route */}
      </div>
    </div>
  );
};

export default Layout;
