import React, { useState } from 'react';
import '../css/Sidebar.css'; // Add your CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="mobile-menu">
        <span style={{ fontSize: '20px', cursor: 'pointer' }} onClick={openNav}>
          &#9776; open
        </span>
      </div>
      <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
        <h2>Transport permit</h2>
        <hr/>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <ul>
        <a href="/user-home"><li>Home</li></a>
        <a href="/user-form"><li>Normal Form</li></a>
        <a href="/takal-form"><li>Takal Form</li></a>
        <a href="/user-dashboard"><li>Dashboard</li></a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
