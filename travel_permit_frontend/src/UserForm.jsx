import React, { useState } from 'react';
import './css/UserForm.css';

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
  const [errors, setErrors] = useState({});

  const email =localStorage.getItem("Email");

  const statesAndUTs = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return '*Name is required.';
    }
    if (name.length < 3) {
      return '*Name must be at least 3 characters long.';
    }
    return '';
  };

  const validateVehicleNo = (vehicleNo) => {
    const regex = /^[A-Za-z]{2}[A-Za-z0-9]{8}$/;
    if (!regex.test(vehicleNo)) {
      return '*Vehicle No must start with 2 alphabets and be 10 characters long.';
    }
    return '';
  };

  const validateLicenseNo = (licenseNo) => {
    if (!licenseNo.trim()) {
      return '*License No is required.';
    }
    if (licenseNo.length < 5) {
      return '*License No must be at least 5 characters long.';
    }
    return '';
  };

  const validateNoOfDays = (no_of_days) => {
    if (!no_of_days.trim()) {
      return '*No. of Days is required.';
    }
    if (isNaN(no_of_days) || parseInt(no_of_days) <= 0) {
      return '*No. of Days must be a positive number.';
    }
    return '';
  };

  const validateFromDate = (fromDate) => {
    if (!fromDate.trim()) {
      return '*From Date is required.';
    }
    return '';
  };

  const validateToDate = (fromDate, toDate) => {
    if (!toDate.trim()) {
      return '*To Date is required.';
    }
    if (new Date(toDate) <= new Date(fromDate)) {
      return '*To Date must be after From Date.';
    }
    return '';
  };

  const validatePlace = (place) => {
    if (!place.trim()) {
      return '*Place is required.';
    }
    return '';
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    const nameError = validateName(name);
    const vehicleError = validateVehicleNo(vehicleNo);
    const licenseError = validateLicenseNo(licenseNo);
    const daysError = validateNoOfDays(no_of_days);
    const fromDateError = validateFromDate(fromDate);
    const toDateError = validateToDate(fromDate, toDate);
    const fromPlaceError = validatePlace(fromPlace);
    const toPlaceError = validatePlace(toPlace);

    // If there are errors, set them in state and prevent form submission
    if (
      nameError || vehicleError || licenseError || daysError || 
      fromDateError || toDateError || fromPlaceError || toPlaceError
    ) {
      setErrors({
        name: nameError,
        vehicleNo: vehicleError,
        licenseNo: licenseError,
        no_of_days: daysError,
        fromDate: fromDateError,
        toDate: toDateError,
        fromPlace: fromPlaceError,
        toPlace: toPlaceError,
      });
      return;
    }

    // If no errors, proceed with form submission
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
      email,
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
        return response.text();
      })
      .then((message) => {
        window.alert(message);
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
        setErrors({});
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        window.alert("Failed to add user details. Please try again.");
      });
  };

  const handleVehicleModeChange = (e) => {
    const mode = e.target.value;
    setVehicleMode(mode);
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
      <div style={{ display: 'flex' }}>
       
        <div className="form">
          <h1 className="form-head">USER DETAILS</h1>
          <form className="form-body">
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input type="text" id="email" value={email} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                required
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="vehicle">VEHICLE NO</label>
              <input
                type="text"
                required
                id="vehicle"
                value={vehicleNo}
                onChange={(e) => {
                  setVehicleNo(e.target.value);
                }}
              />
              {errors.vehicleNo && <span className="error">{errors.vehicleNo}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="license">LICENSE NO</label>
              <input
                type="text"
                required
                id="license"
                value={licenseNo}
                onChange={(e) => {
                  setLicenseNo(e.target.value);
                }}
              />
              {errors.licenseNo && <span className="error">{errors.licenseNo}</span>}
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
              <input type="text" id="amount" value={amount} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="days">NO. OF DAYS</label>
              <input
                type="text"
                required
                id="days"
                value={no_of_days}
                onChange={(e) => {
                  setNo_Of_Days(e.target.value);
                }}
              />
              {errors.no_of_days && <span className="error">{errors.no_of_days}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="fromPlace">FROM PLACE</label>
              <select
                id="fromPlace"
                required
                value={fromPlace}
                onChange={(e) => {
                  setFromPlace(e.target.value);
                }}
              >
                <option value="">Select a state/UT</option>
                {statesAndUTs.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.fromPlace && <span className="error">{errors.fromPlace}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="toPlace">TO PLACE</label>
              <select
                id="toPlace"
                required
                value={toPlace}
                onChange={(e) => {
                  setToPlace(e.target.value);
                }}
              >
                <option value="">Select a state/UT</option>
                {statesAndUTs.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.toPlace && <span className="error">{errors.toPlace}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="fromDate">FROM DATE</label>
              <input
                type="date"
                required
                id="fromDate"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
              />
              {errors.fromDate && <span className="error">{errors.fromDate}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="toDate">TO DATE</label>
              <input
                type="date"
                required
                id="toDate"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
              />
              {errors.toDate && <span className="error">{errors.toDate}</span>}
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