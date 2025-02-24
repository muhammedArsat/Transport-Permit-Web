import React, { useEffect, useState } from "react";
import "./css/ApprovedList.css";

export default function CheckpostVerify() {
  const [approved, setApproved] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem('token')
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePassed = async (id) => {
    try {
      await fetch(`http://localhost:8080/verifier/passed-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error in changing the Passed vehicle", error);
    }
  };

  useEffect(() => {
    const fetchApprovedList = async () => {
      try {
        const response = await fetch("http://localhost:8080/verifier/approved-list",{
          headers:{
              "Authorization":`Bearer ${token}`
          }
        });
        const data = await response.json();
        setApproved(data);
      } catch (error) {
        console.error("Error fetching Approved List", error);
      }
    };
    fetchApprovedList();
  }, []);

  const filteredApproved = approved.filter((item) =>
    item.id.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="approved-list-container" style={{ overflowX: "auto" }}>
      <div className="maincontent">
        <h1>Verification Page</h1>
        <div className="searchbox">
          <input
            type="search"
            placeholder="Search Permit ID Here"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="table-wrapper">
          <table style={{ overflowX: "scroll" }}>
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
              {filteredApproved.map((show) => (
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
                  <td>
                    <button onClick={() => handlePassed(show.id)}>Passed</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
