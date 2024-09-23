import React,{useState} from 'react';
import img from './images/TWP logo.png'; // Ensure the path to the image is correct
import './css/LoginRegister.css';
import {useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate=useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('');
  const handlelogin = () => {
    const log = { email, password };
    console.log("Login Payload:", log); // Debugging: Check the data being sent
    fetch("http://localhost:8080/transportpermit/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(log)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Server Response:", data); // Debugging: Check the server's response
      if (data.message === "Login successful") {
        navigate("/user-form");
      } else if (data.message === "User not registered") {
        alert('User not registered. Redirecting to register page.');
        navigate("/user-register");
      } else {
        alert('Invalid email or password. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    });
  };
  
  
  return (
    <div className="App">
      <div className="header">
      <img src={img} alt="Login" />
        <h1>Transport Permit</h1> 
      
      </div>
         <div className="line"></div>
      <div className="page">
        <div className="box pinkBox">
          <h1>Login</h1>
          <p className="registerText">New user?</p>
          <p className="registerText">Register now!</p><br/>
          <button variant="contained" onClick={() => navigate("/user-register")}>
            <b>Go to Register</b>
          </button> 
          </div>      
           <div className="box whiteBox">
          <h1>Login</h1>
          <input type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit" onClick={handlelogin}>Login</button>
         
        </div>
        <div className='media_register'>
          <h4>New User?  <a href="/user-register">Register Now</a></h4>
        
        </div>
      </div>
    </div>
  );
}