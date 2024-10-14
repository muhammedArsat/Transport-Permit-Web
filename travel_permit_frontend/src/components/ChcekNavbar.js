import React from "react";
import "../css/Sidebar.css";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
const handleLogout= () =>{
navigate("/")

}
  return (
    <div className="sidebar">
      <h3>Transport Permit</h3>
      <hr></hr>
      <ul>
        <a href="/check-home">
          <li>Home</li>
        </a>
        <a href="/check-verify">
        <li>Checking Page</li>
        </a>
        <li onClick={handleLogout}>Logout</li>
       
      </ul>
    </div>
  );
};

export default AdminSidebar;
