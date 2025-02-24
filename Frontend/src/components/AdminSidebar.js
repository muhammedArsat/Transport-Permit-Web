import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { FaClipboardList } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import "../css/Sb.css";

const AdminSidebar = () => {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    localStorage.removeItem("isDarkTheme");
    window.location.href = "/"; // Redirect to the login page
  };

  const [isSidebarOpen, SetSidebarOpen] = useState(false);

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("isDarkTheme") === "true";
  });

  const handleTheme = () => {
    setIsDarkTheme((currentvalue) => !currentvalue);
  };
  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }, [isDarkTheme]);
  const toggleSideBar = () => {
    SetSidebarOpen(!isSidebarOpen);
  };
  const [isTakkal, setTakkal] = useState(false);
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
          {role === "USER" && (
            <>
              <a href="/user-home">
                <li>
                  <p>Home</p>
                  <FaHome className="nav-icons" />
                </li>
              </a>
              <a href="/user-form">
                <li>
                  <p>Normal Form</p> <FaWpforms className="nav-icons" />
                </li>
              </a>
              {isTakkal ? (
                <Link to={`/takal-form`}>
                  <li>
                    <p>Takkaal Form</p>{" "}
                    <FaClipboardList className="nav-icons" />
                  </li>
                </Link>
              ) : (
                <li style={{ color: "gray" }}>
                  <p>Takkal Form (only open between 11 am to 12 pm)</p>

                  <FaClipboardList className="nav-icons" />
                </li>
              )}
              <a href="/user-dashboard">
                <li>
                  <p>Dashboard</p>
                  <MdSpaceDashboard className="nav-icons" />
                </li>
              </a>
            </>
          )}
          {role === "ADMIN" && (
            <>
              <a href="/admin-landingpage">
                <li>
                  <p>Home</p>
                  <FaHome className="nav-icons" />
                </li>
              </a>

              <a href="/takkal-pending">
                <li>
                  <p>Tatkkal List</p>
                  <FaClipboardList className="nav-icons" />
                </li>
              </a>
              <a href="/admin-approve">
                <li>
                  <p>Pending Lists</p>

                  <FaWpforms className="nav-icons" />
                </li>
              </a>
              <a href="/approved-list">
                <li>
                  <p> Approved List</p>
                  <TiTick className="nav-icons" />
                </li>
              </a>
              <a href="/passed-list">
                <li>
                  <p>Passed List</p>
                  <TiTick className="nav-icons" />
                </li>
              </a>

              <a href="/add-admin">
                <li>
                  <p>Add Admin</p>
                  <CgProfile />
                </li>
              </a>
            </>
          )}

          {role === "VERIFIER" && (
            <>
              <a href="/check-home">
                <li>
                  <p>Home</p>
                  <FaHome className="nav-icons" />
                </li>
              </a>
              <a href="/check-verify">
                <li>
                  <p> Pending Lists</p>
                  <FaWpforms className="nav-icons" />
                </li>
              </a>
              <a href="/add-verifier">
                <li>
                  <p> Add Verifier</p>
                  <CgProfile className="nav-icons" />
                </li>
              </a>
            </>
          )}
          <li onClick={handleTheme}>
            {" "}
            {isDarkTheme ? "Light Mode" : "Dark Mode"}
            {isDarkTheme ? <MdDarkMode /> : <MdOutlineDarkMode />}{" "}
          </li>
          <li onClick={handleLogout}>
            <p>Logout</p>
            <SlLogout className="nav-icons" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
