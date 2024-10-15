import React, { useState } from 'react';
import img from './images/TWP logo.png'; 
import './css/LoginRegister.css';
import {useNavigate} from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name,setName]=useState("");
  const [number,setNumber]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleRegister = () => {
    const reg = { name, number, email, password };
  
    fetch("http://localhost:8080/transportpermit/user-register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reg),
    })
      .then(response => {
        // Check if the response is JSON format
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();  // Parse JSON if it's a JSON response
        } else {
          return response.text();  // Parse as plain text if it's not JSON
        }
      })
      .then(data => {
        if (typeof data === "string") {
          // Handle case where response is a string (plain text)
          alert(`Server response: ${data}`);
        } else if (data.success) {
          alert('Registration successful!');
          navigate('/user-login'); 
        } else if (data.message === 'User already registered') {
          alert('User already registered. Please log in.');
          navigate('/login'); 
        } else {
          alert('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      });
  };
  

  return (
    <div className='App' style={{padding:"10px"}}>
      <div className="header">
      <img src={img} alt="Login" />
        <h1>Transport Permit</h1> 
      </div>
         <div className="line"></div>
      <div className="page">
        <div className="box pinkBox">
          
          <h1>Register</h1>
          <p className="registerText">Already Registered?</p>
          <p className="registerText">Login now!</p><br/>
          <button variant="conatined" onClick={()=>navigate('/')}><b>Go to Login</b></button>
        </div>
        <div className="box whiteBox">
          <h1>Register</h1>
          <input type="text" id="name" name="name" placeholder="username" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" id="number" name="ph_number" placeholder="phone number" value={number} onChange={(e) => setNumber(e.target.value)} required />
          <input type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" onClick={handleRegister}>Register</button>
          <div className='media_register'>
          <h4><br></br>Already Registered?</h4>
          <a href="/"><b>Login Now</b></a>
        </div>
        </div>
      </div>
    </div>
  );
}