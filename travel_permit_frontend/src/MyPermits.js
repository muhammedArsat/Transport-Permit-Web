// src/PermitsPage.js
import React, { useEffect, useState } from "react";
import Sb from "./sb";
import './css/MyPermit.css';
import { useParams } from "react-router-dom";

const MyPermits = () => {
  const [permitData, setPermitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {email} = useParams();

  useEffect(() => {

    if (email) {
      fetch(`http://localhost:8080/transportpermit/applied-permits?email=${email}`)
        .then(response => response.json())
        .then(data => {
          console.log("Fetched Permit Data:", data); // Debugging: Check the response data
          setPermitData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching permit data:", error);
          setLoading(false);
        });
    } else {
      alert("User is not logged in");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Sb/>
    <div className="permits-page">
      <h2>My Permits</h2>
      <div className="card-container">
        {permitData.length > 0 ? (
          permitData.map((permit) => (
            <div key={permit.id} className="card">
              <h3>{permit.name}</h3>
              <p><strong>Vehicle No:</strong> {permit.vehicleNo}</p>
              <p><strong>License No:</strong> {permit.licenseNo}</p>
              <p><strong>Days:</strong> {permit.no_of_days}</p>
              <p><strong>From:</strong> {permit.fromPlace}</p>
              <p><strong>To:</strong> {permit.toPlace}</p>
              <p><strong>From Date:</strong> {permit.fromDate}</p>
              <p><strong>To Date:</strong> {permit.toDate}</p>
              <p><strong>Vehicle Mode:</strong> {permit.vehicleMode}</p>
              <p><strong>Amount:</strong> {permit.amount}</p>
              <p><strong>Status:</strong> {permit.status}</p>
            </div>
          ))
        ) : (
          <p>No permits found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyPermits;
