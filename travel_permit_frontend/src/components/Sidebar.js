import React from "react";
import '../css/Sidebar.css';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  const[istakkal,takkal]=useState(false);

  useEffect(()=>{
    const checkTime =()=>{
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if(currentHour >= 11 && currentHour <12)
      {
        takkal(true)
      }
      else{
        takkal(false)
      }
    }

    checkTime();
    const interval = setInterval(checkTime,60000);

    return ()=>clearInterval(interval);
  },[]);

const navigate = useNavigate();
const handleLogout= () =>{
navigate("/")

}
  return (
    <div className="sidebar">
      <h3>Transport Permit</h3>
      <hr></hr>
      <ul>
       <a href="/user-home"> <li>Home</li></a>
        <a href="/user-form"><li>Normal Form</li></a>
        {istakkal ?(
        <a href="/takal-form"><li>Takal Form</li></a>
        ):(<li style={{color:"gray"}}>Takkal Form(only open between 11 am to 12 pm)</li>)

        }
      <a href="/user-dashboard"><li>DashBoard</li></a>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;