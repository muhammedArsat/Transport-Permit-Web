import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import "./css/ApprovedList.css";

export default function ApprovedList() {
  const [approved, setApproved] = useState([]);
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchApproved = async () => {
      const response = await fetch(
        "http://localhost:8080/admin/approved-list",{
          headers:{"Authorization":`Bearer ${token}`
        }
    });
      const data = await response.json();
      setApproved(data);
    };
    fetchApproved();
  }, []);

  return (
    <div className="approved-list-container" style={{overflowX:"auto"}}>
      <div className="table-wrapper" >
        <table style={{overflowX:"scroll"}}>
          <thead>
            <tr>
              <th>Permit Id</th>
              <th>Name</th>
              <th>Vehicle No</th>
              <th>License Number</th>
              <th>Number Of Days</th>
              <th>From Place</th>
              <th>To Place</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Vehicle Mode</th>
              <th>Amount Paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approved.map((show) => (
              <tr key={show.id}>
                <td>{show.id}</td>
                <td>{show.name}</td>
                <td>{show.vehicleNo}</td>
                <td>{show.licenseNo}</td>
                <td>{show.no_of_days}</td>
                <td>{show.fromPlace}</td>
                <td>{show.toPlace}</td>
                <td>{show.fromDate}</td>
                <td>{show.toDate}</td>
                <td>{show.vehicleMode}</td>
                <td>{show.amount}</td>
                <td>{show.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}