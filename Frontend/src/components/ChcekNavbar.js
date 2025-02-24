import React, { useState } from "react";
import "../css/Sb.css";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  const [isSidebarOpen, SetSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    SetSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="sb-mob">
        <div className="sb-header">Transport Website</div>
        <div className="sb-menu" onClick={toggleSideBar}>
          &#9776;
        </div>
      </div>

      <div className={`sb ${isSidebarOpen ? "open" : ""}`}>
        <h3>Transport Permit</h3>
        <ul>
          <a href="/check-home">
            <li>Home</li>
          </a>
          <a href="/check-verify">
            <li>Pending Lists</li>
          </a>

          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
