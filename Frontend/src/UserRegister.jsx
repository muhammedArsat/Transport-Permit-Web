import React, { useState } from "react";
import img from "./images/TP_logo.png";
import "./css/LoginRegister.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import loadingImg from "./images/loginload.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [loading, setLoading] = useState(false);

  // Error state for validation
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  // Validation function
  const validateInputs = () => {
    let isValid = true;

    if (!name) {
      setNameError("*Username is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!number) {
      setNumberError("*Phone number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(number)) {
      setNumberError("Phone number must be 10 digits");
      isValid = false;
    } else {
      setNumberError("");
    }

    if (!email.trim()) {
      setEmailError("*Email is required.");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      /[.\s]$/.test(email)
    ) {
      setEmailError(
        "Please enter a valid email address without trailing dots or spaces."
      );
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("*Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Static async registration function
  const register = async (email, password, phone, role) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password,
        phone,
        role,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    // Set loading state to true
    setLoading(true);

    try {
      const data = await register(email, password, number, role);

      // Simulate loading delay
      setTimeout(() => {
        setLoading(false); // Reset loading state after 1.5 seconds
        if (data.statusCode === 200) {
          toast.success("Registered Successful");
          navigate("/");
        } else if (data.message === "User already registered") {
          toast.warning("User Already Registered")
          navigate("/");
        } else {
          toast.error("Error Occured in registration");
        }
      }, 1500); // 1.5 seconds delay
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Reset loading state in case of error
      setError(error.message);
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
          <h1>Register</h1>
          <p className="registerText">Already Registered?</p>
          <p className="registerText">Login now!</p>
          <br />
          <button variant="contained" onClick={() => navigate("/")}>
            <b>Go to Login </b>
          </button>
        </div>
        <div className="box whiteBox">
          <h1>Register</h1>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && (
            <span style={{ color: "red", fontSize: "12px" }}>{nameError}</span>
          )}

          <input
            type="text"
            id="number"
            name="ph_number"
            placeholder="Phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          {numberError && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {numberError}
            </span>
          )}

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
            <span style={{ color: "red", fontSize: "12px" }}>{emailError}</span>
          )}

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
            <span style={{ color: "red", fontSize: "12px" }}>
              {passwordError}
            </span>
          )}
          {error && (
            <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
          )}
          <button type="button" onClick={handleRegister} disabled={loading}>
            {loading ? (
              <img
                src={loadingImg}
                alt="loadingPic"
                style={{ width: "20px", height: "20px" }}
              />
            ) : (
              "Register"
            )}
          </button>

          <div className="mobile-register">
            <h4>
              Already Registered?
              <Link to="/">
                <p>Go to Login</p>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
