import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import "./css/Sidebar.css";
export default function PassedList() {
  const [passed, setpassed] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/transportpermit/passed-list"
        );
        const data = await response.json();
        setpassed(data);
      } catch (error) {
        console.error("Error to Fetch Passed Data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <AdminSidebar />
      <div style={{ marginLeft: "270px" , marginRight:"20px"}}>
        <table>
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
            <th>Amount payed</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
            {passed.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.vehicleNo}</td>
                <td>{data.licenseNo}</td>
                <td>{data.no_of_days}</td>
                <td>{data.fromPlace}</td>
                <td>{data.toPlace}</td>
                <td>{data.fromDate}</td>
                <td>{data.toDate}</td>
                <td>{data.vehicleMode}</td>
                <td>{data.amount}</td>
                <td>{data.status}</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
