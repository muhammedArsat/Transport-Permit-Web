import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
 // Importing the Sidebar component
import './css/UserDashboard.css'; // Create a separate CSS file for dashboard styling
import loadingImg from "./images/loginload.svg"


const UserDashboard = () => {
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [totApplicationCount, settotApplicationCount] = useState(0);
  const email = localStorage.getItem("Email");
  const token = localStorage.getItem("token");
  const [loading,isLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      isLoading(false);
    },1500)

  },[loading])

  useEffect(() => {
    
    if (email) {
      // API call to get the approved permits count
      fetch(`http://localhost:8080/user/approvedCount/${email}`,{
        headers:{
          "Authorization": `Bearer ${token}` 
        }
      }
   
      )
        .then(response => response.json())
        .then(data => {
          console.log("Fetched Approved Permit Count:", data);
          setApprovedCount(data);
        })
        .catch(error => {
          console.error("Error fetching approved permit count:", error);
        });

      // API call to get the pending permits count
      fetch(`http://localhost:8080/user/pendingCount/${email}`,{
        headers:{
          "Authorization": `Bearer ${token}` 
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log("Fetched Pending Permit Count:", data);
          setPendingCount(data);
        })
        .catch(error => {
          console.error("Error fetching pending permit count:", error);
        });
        fetch(`http://localhost:8080/user/totApplicationCount/${email}`,{
          headers:{
            "Authorization": `Bearer ${token}` 
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log("Fetched Total Permits Count:", data);
          settotApplicationCount(data);
        })
        .catch(error => {
          console.error("Error fetching pending permit count:", error);
        });
    } else {
      alert("User is not logged in");
    }
  }, [email]);

  return (
    <div className="dashboard-container">
      { loading ? <div className="loading"> <img src={loadingImg} alt="loading pic" /></div> :
      <div className="dashboard">
        
        <h2>Dashboard</h2>
        <div className="counts-container">
          <div className="count-card">
            <h3>Approved Permits</h3>
            <p>{approvedCount}</p>
          </div>
          <div className="count-card">
            <h3>Pending Applications</h3>
            <p>{pendingCount}</p>
          </div>
          <div className="count-card">
            <h3>Total Applications</h3>
            <p>{totApplicationCount}</p>
          </div>
        </div>
        <Link to={`/my-permits`}>
          <button className="
          butt">My Permits</button>
        </Link>
      </div>
}
    </div>
  );
};

export default UserDashboard;
