import React from "react";
import Sidebar from "./components/AdminSidebar";
import './css/AdminHomePage.css'
export default function AdminHomePage() {
  return (
    <div>
    <div className="info">
        <h2>
          1.User Instructions for Applying Transport Permits
        </h2>
        <br />{" "}
        <h3>
          Types of Applications You can apply for two types of transport
          permits:
        </h3>{" "}<br/>
        <p>1. Normal Permit</p> <p>2. Takkal Permit (Urgent Service)</p>
        <br />
        <h2 >2. Key Differences Between Normal and Takkal Permits</h2>
        <br />
        <div className="tb-container" style={{overflow:"scroll"}}>

        <table >
          <thead>
            <tr>
              <th>Feature</th>
              <th>Normal Permit</th>
              <th>Takkal Permit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cost</td>
              <td>Standard Changes</td>
              <td>20% Higher Than Normal Permit</td>
            </tr>
            <tr>
              <td>Application Time</td>
              <td>Open All Day</td>
              <td>Only Available: 11 AM - 12 PM</td>
            </tr>
          </tbody>
        </table>
        </div>

        <br />
        <h2 style={{ color: "red" }}>3. Important Note</h2>
        <br />
        <ul>

        <ol>
        <p>
          1. Ensure you choose the correct type of permit based on your urgency and
          budget.
        </p>
        </ol>
        <ol>
        <p>
          2. Takkal Permit submissions will not be accepted outside the designated
          time slot <span style={{color:"red"}}>(11:00 AM to 12:00 PM)</span>.
        </p>
        </ol>
        <ol>
        <p>
          3. Payment adjustments for Takkal Permits will reflect automatically
          during the application process.
        </p>
        </ol>
        <ol>
        <p>
         4.  Double-check all details before submitting the application to avoid
          errors.
        </p>
        </ol>
        </ul>
      </div>
    </div>
  );
}
