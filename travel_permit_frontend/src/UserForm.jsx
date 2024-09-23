
import React, { useState } from 'react';
import './css/UserForm.css';
import Sidebar from './components/Sidebar';
function Form() {
  const [name, setName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [no_of_days, setNo_Of_Days] = useState('');
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [vehicleMode, setVehicleMode] = useState('');
  const [amount, setAmount] = useState('');
  const handleClick = (e) => {
    e.preventDefault();
    const detail = {
      name,
      vehicleNo,
      licenseNo,
      no_of_days,
      fromPlace,
      toPlace,
      fromDate,
      toDate,
      vehicleMode,
      amount,
    };
    fetch("http://localhost:8080/transportpermit/add-user-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detail),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Handling plain text response from backend
      })
      .then((message) => {
        window.alert(message); // Display plain text message from backend
       // Clear the form fields
        setName('');
        setVehicleNo('');
        setLicenseNo('');
        setNo_Of_Days('');
        setFromPlace('');
        setToPlace('');
        setFromDate('');
        setToDate('');
        setVehicleMode('');
        setAmount('');
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        window.alert("Failed to add user details. Please try again."); // Display error message in alert
      });
  };
  const handleVehicleModeChange = (e) => {
    const mode = e.target.value;
    setVehicleMode(mode);
    // Set amounts based on mode
    switch (mode) {
      case 'GV':
        setAmount('1500');
        break;
      case 'PV':
        setAmount('300');
        break;
      case 'CCV':
        setAmount('1000');
        break;
      case 'PSV':
        setAmount('800');
        break;
      case 'TTV':
        setAmount('2000');
        break;
      default:
        setAmount('');
        break;
    }
  };
  return (
    <div>
     
      <div style={{display:'flex'}}>
      <Sidebar/>
      <div className="form">
        <h1 className="form-head">USER DETAILS</h1>
        <form className="form-body">
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicle">VEHICLE NO</label>
            <input
              type="text"
              required
              id="vehicle"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="license">LICENSE NO</label>
            <input
              type="text"
              required
              id="license"
              value={licenseNo}
              onChange={(e) => setLicenseNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicle_mode">VEHICLE MODE</label>
            <select
              id="vehicle_mode"
              required
              value={vehicleMode}
              onChange={handleVehicleModeChange}
            >
              <option value="">Select a vehicle mode</option>
              <option value="GV">Goods Vehicles (GV)</option>
              <option value="PV">Passenger Vehicles (PV)</option>
              <option value="CCV">Contract Carriage Vehicles (CCV)</option>
              <option value="PSV">Public Service Vehicles (PSV)</option>
              <option value="TTV">Trailers and Tankers (TTV)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              id="amount"
              value={amount}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="days">NO. OF DAYS</label>
            <input
              type="text"
              required
              id="days"
              value={no_of_days}
              onChange={(e) => setNo_Of_Days(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fromPlace">FROM PLACE</label>
            <input
              type="text"
              required
              id="fromPlace"
              value={fromPlace}
              onChange={(e) => setFromPlace(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="toPlace">TO PLACE</label>
            <input
              type="text"
              required
              id="toPlace"
              value={toPlace}
              onChange={(e) => setToPlace(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fromDate">FROM DATE</label>
            <input
              type="date"
              required
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="toDate">TO DATE</label>
            <input
              type="date"
              required
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button onClick={handleClick}>NEXT</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
export default Form;