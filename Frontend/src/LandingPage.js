import React from 'react'
import './css/LandingPage.css'
import img from './images/TWP logo.png'
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {
  return (
    <div className='App'>
    <div className="header">
 <img src={img} alt="Login" />
   <h1>Transport Permit</h1> 
 </div>
    <div className="line"></div>
 <div className='login_container'>
 <Link to ="/user_login">
 <div class="login_option" >
           
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSDjV9Wss1XUa3ppC6Ow5SOBohiIZH3aeSQ&s" alt="Student Image" class="login_image" />
           <div><br></br><b style={{color:"black"}}>User</b></div>
       </div></Link>
       <Link to="/user_login">
       <div class="login_option">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVsHEBnTzkBAmmX8p7SV2zT_qGdHGHJeKvkA&s" alt="Staff Image" class="login_image"/>
           <div><br></br><b style={{color:"black"}}>Verifier</b></div>
       </div>
       </Link>
       <Link to="/user_login">
       <div class="login_option">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBuP062C8PpUQlLq05sdFrmxTHCB-p_RJsQ&s" alt="Admin Image" class="login_image"/>
           <div><br></br><b style={{color:"black"}}>Admin</b></div>
       </div></Link>

       </div>
</div>
)
}
