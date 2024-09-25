import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import "./css/ApprovedList.css";
export default function ApprovedList() {
  const[approved,setapproved] = useState([]);

  useEffect(()=>{
    const fetchApproved = async() =>{
      const response = await fetch("http://localhost:8080/transportpermit/approved-list");
      const data = await response.json();
      setapproved(data);
    }

    fetchApproved();
  },[])
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div className="table">
        <div style={{textAlign:"center"}}><h1>Approved List</h1></div>
      <table>
        <tr>
          <th>Name</th>
          <th>Vehicle No</th>
          <th>License Number</th>
          <th>Number Of Days</th>
          <th>From Place</th>
          <th>To Place</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Vehicle Mode</th>
          <th>Amount payed</th>
        </tr>
     {approved.map((show) =>(
      <tr>
<th>{show.name}</th>
<th>{show.vehicleNo}</th>
<th>{show.licenseNo}</th>
<th>{show.no_of_days}</th>
<th>{show.fromPlace}</th>
<th>{show.toPlace}</th>
<th>{show.fromDate}</th>
<th>{show.toDate}</th>
<th>{show.vehicleMode}</th>
<th>{show.amount}</th>

      </tr>
      
     ))}
        <tr>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
          <td>Hi</td>
        </tr>
      </table>
    </div>
    </div>
  );
}
