import React from "react";
import "../css/.css";
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
        <a href="/admin-landingpage">
          <li>Home</li>
        </a>
        <a href="/takkal-pending">
          <li>Tatkkal List</li>
        </a>
        <a href="/admin-approve">
          <li>Pending Lists</li>
        </a>
        <a href="/approved-list">
          <li >Approved List</li>
        </a>
        <a href="/passed-list">
          <li>Passed List</li>
        </a>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
