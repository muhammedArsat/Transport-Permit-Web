import React, { useEffect, useState } from "react";
import img from "./images/TP_logo.png";
import "./css/LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com"; // Import emailjs
import loadingImg from "./images/loginload.svg";

export default function UserLogin({ setIsAuthenticated, setUserRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailPage, SetIsEmailpage] = useState(false);
  const [isForgetPassword, SetIsForgetPassword] = useState(false);
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [forgetEmail, setForgetEmail] = useState("");
  const [forgetEmailError, setForgetEmailError] = useState("");
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const generateAndSendOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);

    emailjs
      .send(
        "service_dsyt24c",
        "template_b345wva",
        {
          user_email: localStorage.getItem("forgetEmail"),
          otp: otp,
        },
        "c8M9Bsa6b6v_rxHIM"
      )
      .then((response) => {
        console.log("OTP sent successfully!", response.status, response.text);
        alert("OTP has been sent to your email."); // Inform the user
      })
      .catch((error) => {
        console.error("Failed to send OTP via email:", error);
        alert("Failed to send OTP. Please try again.");
      });
  };

  const validateForgetEmail = () => {
    let isValid = true;
    if (!forgetEmail) {
      setForgetEmailError("*Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(forgetEmail)) {
      setForgetEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setForgetEmailError("");
    }
    return isValid;
  };

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

    if (!password) {
      setPasswordError("*Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("*Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });
      const { statusCode, token, refreshToken, expirationTime, role } =
        response.data || {};

      if (statusCode === 200 && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("role", role);
        localStorage.setItem("Email", email);

        setIsAuthenticated(true);
        setUserRole(role);

        navigate(
          role === "ADMIN"
            ? "/admin-landingpage"
            : role === "USER"
            ? "/user-home"
            : "/check-home"
        );
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailForForgetPassword = () => {
    SetIsEmailpage(true);
  };

  const handleForgetPassword = () => {
    if (validateForgetEmail()) {
      localStorage.setItem("forgetEmail", forgetEmail);
      generateAndSendOtp(); // Send OTP when forget password process begins
      SetIsForgetPassword(true);
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp1 + otp2 + otp3 + otp4;
    if (enteredOtp === generatedOtp) {
      alert("OTP verified successfully!");
      setIsPasswordUpdate(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordUpdate = (e) => {
    console.log(newPassword);
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
          {isEmailPage ? (
            <div>Enter the OTP sent to your email</div>
          ) : (
            <>
              <h1>Login</h1>
              <p className="registerText">New user?</p>
              <p className="registerText">Register now!</p>
              <br />
              <button onClick={() => navigate("/user-register")}>
                <b>Go to Register</b>
              </button>
            </>
          )}
        </div>

        <div className="box whiteBox">
          {isPasswordUpdate ? (
            <div>
              <h1>Change Password</h1>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                placeholder="New Password"
              />
              <input
                type="text"
                placeholder="Confirm Password"
                value={conformPassword}
                onChange={(e) => {
                  setConformPassword(e.target.value);
                }}
              />
              <button
                disabled={
                  newPassword.length <= 6 || newPassword !== conformPassword
                }
                onClick={handlePasswordUpdate}
                style={{
                  backgroundColor:
                    newPassword < 6 || newPassword !== conformPassword
                      ? "grey"
                      : "",
                  cursor:
                    newPassword < 6 || newPassword !== conformPassword
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {" "}
                submit
              </button>
            </div>
          ) : isForgetPassword ? (
            <div>
              <h1>Enter The OTP</h1>
              <p>Enter 4 Digits OTP</p>
              <input
                type="text"
                className="otp-input"
                value={otp1}
                onChange={(e) => setOtp1(e.target.value.slice(0, 1))}
              />{" "}
              <input
                type="text"
                className="otp-input"
                value={otp2}
                onChange={(e) => setOtp2(e.target.value.slice(0, 1))}
              />{" "}
              <input
                type="text"
                className="otp-input"
                value={otp3}
                onChange={(e) => setOtp3(e.target.value.slice(0, 1))}
              />{" "}
              <input
                type="text"
                className="otp-input"
                value={otp4}
                onChange={(e) => setOtp4(e.target.value.slice(0, 1))}
              />
              <button onClick={handleOtpSubmit}>Submit</button>
            </div>
          ) : isEmailPage ? (
            <div>
              <h1>Verify with OTP</h1>
              <label>Enter your Email</label>
              <input
                type="text"
                placeholder="Email..."
                value={forgetEmail}
                onChange={(e) => setForgetEmail(e.target.value)}
              />
              {forgetEmailError && (
                <span
                  style={{ color: "red", fontSize: "12px", display: "block" }}
                >
                  {forgetEmailError}
                </span>
              )}

              <button onClick={handleForgetPassword}>Next</button>
            </div>
          ) : (
            <>
              <h1 className="log">Login</h1>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <span
                  style={{ color: "red", fontSize: "12px", display: "block" }}
                >
                  {emailError}
                </span>
              )}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <span
                  style={{ color: "red", fontSize: "12px", display: "block" }}
                >
                  {passwordError}
                </span>
              )}
              {error && (
                <span
                  style={{ color: "red", fontSize: "12px", display: "block" }}
                >
                  {error}
                </span>
              )}
              <button onClick={handleLogin} disabled={loading}>
                <b>
                  {loading ? (
                    <img
                      src={loadingImg}
                      alt="Loading"
                      style={{ width: "15px", height: "15px" }}
                    />
                  ) : (
                    "Login"
                  )}
                </b>
              </button>
              <div className="mobile-register">
                <h4 >New User?<Link to = "/user-register">
                <p>Register Now</p>

                </Link></h4> 
                
              
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
