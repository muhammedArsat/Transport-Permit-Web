import React, { useState } from 'react';
import img from './images/TP_logo.png'; 
import './css/LoginRegister.css';
import {useNavigate} from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Error state for validation
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validation function
  const validateInputs = () => {
    let isValid = true;

    // Name validation
    if (!name) {
      setNameError('*Username is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    // Phone number validation (must be digits and have 10 characters)
    if (!number) {
      setNumberError('*Phone number is required.');
      isValid = false;
    } else if (!/^\d{10}$/.test(number)) {
      setNumberError('Phone number must be 10 digits');
      isValid = false;
    } else {
      setNumberError('');
    }
    // Email validation
    if (!email.trim()) {
      setEmailError('*Email is required.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[.\s]$/.test(email)) {
      setEmailError('Please enter a valid email address without trailing dots or spaces.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation (must be at least 6 characters)
    if (!password) {
      setPasswordError('*Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // Handle registration
  const handleRegister = () => {
    if (!validateInputs()) {
      return; // Stop if validation fails
    }

    const reg = { name, number, email, password };

    fetch("http://localhost:8080/transportpermit/user-register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reg),
    })
      .then(response => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(data => {
        if (typeof data === "string") {
          alert(`Server response: ${data}`);
        } else if (data.success) {
          alert('Registration successful!');
          navigate('/user_login'); 
        } else if (data.message === 'User already registered') {
          alert('User already registered. Please log in.');
          navigate('/user_login'); 
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
          <button variant="contained" onClick={() => navigate('/user_login')}><b>Go to Login</b></button>
        </div>
        <div className="box whiteBox">
          <h1>Register</h1>
          
          {/* Username input */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <span style={{ color: 'red', fontSize: '12px', textAlign: 'right', display: 'block' }}>{nameError}</span>}

          {/* Phone number input */}
          <input
            type="text"
            id="number"
            name="ph_number"
            placeholder="Phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          {numberError && <span style={{ color: 'red', fontSize: '12px', textAlign: 'right', display: 'block' }}>{numberError}</span>}

          {/* Email input */}
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <span style={{ color: 'red', fontSize: '12px', textAlign: 'right', display: 'block' }}>{emailError}</span>}

          {/* Password input */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <span style={{ color: 'red', fontSize: '12px', textAlign: 'right', display: 'block' }}>{passwordError}</span>}

          {/* Register button */}
          <button type="submit" onClick={handleRegister}>Register</button>

          <div className='media_register'>
            <h4><br></br>Already Registered?</h4>
            <a href="/user_login"><b>Login Now</b></a>
          </div>
        </div>
      </div>
    </div>
  );
}
