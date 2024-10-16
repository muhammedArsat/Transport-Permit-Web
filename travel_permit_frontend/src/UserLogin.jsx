import React, { useState } from "react";
import img from "./images/TP_logo.png";
// import './css/LoginRegister.css';
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // usestate for error msgs
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //Validation
  const validateInputs = () => {
    let isValid = true;
    if (!email) {
      setEmailError("*Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    //Password validation
    if (!password) {
      setPasswordError("*Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("*Password must be atleast 6 characters");
    } else {
      setPasswordError("");
    }
    return isValid;
  };
  const handlelogin = () => {
    if (!validateInputs()) {
      return;
    }
    if (email === "admin@gmail.com" && password === "1234") {
      navigate("/admin-landingpage");
    } else if (email === "verifier@gmail.com" && password === "1234") {
      navigate("/check-home");
    } else {
      const log = { email, password };
      console.log("Login Payload:", log); // Debugging: Check the data being sent
      fetch("http://localhost:8080/transportpermit/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(log),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server Response:", data); // Debugging: Check the server's response
          if (data.message === "Login successful") {
            navigate(`/user-home/${email}`);
          } else if (data.message === "Incorrect password") {
            alert("Incorrect password");
          } else if (data.message === "User not registered") {
            alert("User not registered. Redirecting to register page.");
            navigate("/user-register");
          } else {
            alert("Invalid email or password. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Something went wrong. Please try again later.");
        });
    }
  };

  return (
    <div>
      <div className="header">
        <img src={img} alt="Login" />
        <h1>Transport Permit</h1>
      </div>
      <div className="line"></div>
      <div className="page">
        <div className="box pinkBox">
          <h1>Login</h1>
          <p className="registerText">New user?</p>
          <p className="registerText">Register now!</p>
          <br />
          <button
            variant="contained"
            onClick={() => navigate("/user-register")}
          >
            <b>Go to Register</b>
          </button>
        </div>
        <div className="box whiteBox">
          <h1 className="log">Login</h1>
          {/* Email input validation */}
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                textAlign: "left",
                display: "block",
              }}
            >
              {emailError}
            </span>
          )}
          {/* Password validation */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                textAlign: "right",
                display: "block",
              }}
            >
              {passwordError}
            </span>
          )}
          <button type="submit" onClick={handlelogin}>
            Login
          </button>
          <a href="/dummy">
            <br></br>Forget password?
          </a>
        </div>
        <div className="media_register">
          <h4>
            New user? <a href="/user-register">Register now</a>
          </h4>
        </div>
      </div>
    </div>
  );
}
