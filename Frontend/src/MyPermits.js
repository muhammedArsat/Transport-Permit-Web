// src/PermitsPage.js
import React, { useEffect, useState } from "react";
import Sb from "./sb";
import "./css/MyPermit.css";
import loadingImg from "./images/loginload.svg";

const MyPermits = () => {
  const token = localStorage.getItem("token");
  const [permitData, setPermitData] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("Email");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8080/user/applied-permits/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Permit Data:", data); // Debugging: Check the response data
          setPermitData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching permit data:", error);
          setLoading(false);
        });
    } else {
      alert("User is not logged in");
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [loading]);

  return (
    <div>
      {loading ? (
        <div className="loading">
          {" "}
          <img src={loadingImg} alt="loading pic" />
        </div>
      ) : (
        <div className="permits-page">
          <h2>My Permits</h2>
          <div className="card-container">
            {permitData.length > 0 ? (
              permitData.map((permit) => (
                <div key={permit.id} className="card">
                  <h3>{permit.name}</h3>
                  <p>
                    <strong>Permit Id:</strong>
                    {permit.id}
                  </p>
                  <p>
                    <strong>Vehicle No:</strong> {permit.vehicleNo}
                  </p>
                  <p>
                    <strong>License No:</strong> {permit.licenseNo}
                  </p>
                  <p>
                    <strong>Days:</strong> {permit.no_of_days}
                  </p>
                  <p>
                    <strong>From:</strong> {permit.fromPlace}
                  </p>
                  <p>
                    <strong>To:</strong> {permit.toPlace}
                  </p>
                  <p>
                    <strong>From Date:</strong> {permit.fromDate}
                  </p>
                  <p>
                    <strong>To Date:</strong> {permit.toDate}
                  </p>
                  <p>
                    <strong>Vehicle Mode:</strong> {permit.vehicleMode}
                  </p>
                  <p>
                    <strong>Amount:</strong> {permit.amount}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    {permit.status === "pending" ? (
                      <span style={{ color: "orange" }}>Pending</span>
                    ) : permit.status === "Approved" ? (
                      <span style={{ color: "green" }}>Approved</span>
                    ) : permit.status === "Rejected" ? (
                      <span style={{ color: "red" }}>Rejected</span>
                    ) : (
                      <span style={{color:"gray"}}>Passed</span> // Fallback for any other unexpected status
                    )}
                  </p>
                  <p>
                    <strong>Type:</strong> {permit.type}
                  </p>
                </div>
              ))
            ) : (
              <p>No permits found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPermits;
