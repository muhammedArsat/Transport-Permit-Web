import React from "react";
import './Header.css';

const Header = () => {
  return (
    <header className="head">
      <h1>Transport Permit Dashboard</h1>
      <div className="user">
        <span>Welcome, User</span>
      </div>
    </header>
  );
};

export default Header;
