import React from "react";
import '../css/Sidebar.css';
import { useState,useEffect } from "react";
import { useNavigate ,Link, useParams} from "react-router-dom";


const Sidebar = () => {

  const {email} = useParams();

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
      <Link to={`/user-home/${email}`}> <li>Home</li></Link>
        <Link to={`/user-form/${email}`}><li>Normal Form</li></Link>
        {istakkal ?(
        <Link to={`/takal-form/${email}`}><li>Takkaal Form</li></Link>
        ):(<li style={{color:"gray"}}>Takkal Form(only open between 11 am to 12 pm)</li>)

        }
      <Link to={`/user-dashboard/${email}`}><li>Dashboard</li></Link>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;