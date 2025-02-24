import React, { useEffect, useState } from "react";
import "./css/AdminApprove.css";
import Sidebar from "./components/AdminSidebar";

export default function Approval() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // Get JWT token from localStorage (or other storage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/pending-list",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach JWT token to request header
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR: ${response.status}`);
        }
        const result = await response.json();
        setDetails(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(true);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleStatus = async (id) => {
    try {
      await fetch(`http://localhost:8080/admin/status-change/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach JWT token to request header
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error in Updating Status", error);
    }
  };

  const handleReject = async(id) =>{
    try{
      await fetch(`http://localhost:8080/admin/reject/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      window.location.reload();
    }catch(error){
      console.log("Error in Rejecting Application",error)
    }
  }

  return (
    <div>
      <div className="approval-wrap">
        <div className="title">
          <h1>Pending Lists</h1>
        </div>
        {details.map((show, index) => (
          <div key={index} className="container-approval">
            <div className="small-container-approval">
              <p>
                <b>Name: </b> {show.name}
              </p>
              <p>
                <b>Vehicle No:</b> {show.vehicleNo}
              </p>
              <p>
                <b>License Number :</b> {show.licenseNo}
              </p>
              <p>
                <b>Number Of Days : </b> {show.no_of_days}
              </p>
              <p>
                <b>From : </b> {show.fromPlace}
              </p>
            </div>
            <div className="small-container">
              <p>
                <b>To: </b> {show.toPlace}
              </p>
              <p>
                <b>From Date :</b> {show.fromDate}
              </p>
              <p>
                <b>To Date : </b> {show.toDate}
              </p>
              <p>
                <b>Vehicle Mode : </b>
                {show.vehicleMode}
              </p>
              <p>
                <b>Amount Paid : </b> {show.amount}
              </p>
            </div>
            <div className="Btn-container-approval">
              <button className="btn-reject"
              onClick={()=>handleReject(show.id)}
              >Reject</button>
              <button
                className="btn-approval"
                onClick={() => handleStatus(show.id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
