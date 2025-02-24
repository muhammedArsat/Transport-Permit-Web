import React, { useEffect, useState } from "react";
import "./css/UserHome.css";

export default function UserHome() {
  const token = localStorage.getItem("token");
  const [tn, setTn] = useState(0);
  const [kl, setKl] = useState(0);
  const [kr, setKr] = useState(0);
  const [tel, setTel] = useState(0);
  const [mh, setMh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/tamil-nadu-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setTn(result);
      } catch (error) {}
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/kerala-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setKl(result);
      } catch (error) {}
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/karnataka-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setKr(result);
      } catch (error) {}
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/telangana-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setTel(result);
      } catch (error) {}
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/maharashtra-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setMh(result);
      } catch (error) {}
    };

    fetchData();
  }, [token]);

  return (
    <div className="user-home-container">
      <div
        className="user-home-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color:
            "linear-gradient(to bottom, hsl(240, 62%, 66%), hsl(240, 94%, 6%), #9321e5)",
        }}
      >
        <h1>TRANSPORT PERMIT WEBISTE</h1>
      </div>
      <div className="info">
        <h2>1.User Instructions for Applying Transport Permits</h2>
        <br />{" "}
        <h3>
          Types of Applications You can apply for two types of transport
          permits:
        </h3>{" "}
        <br />
        <p>1. Normal Permit</p> <p>2. Takkal Permit (Urgent Service)</p>
        <br />
        <h2>2. Key Differences Between Normal and Takkal Permits</h2>
        <br />
        <div className="tb-container" style={{ overflow: "scroll" }}>
          <table>
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
              1. Ensure you choose the correct type of permit based on your
              urgency and budget.
            </p>
          </ol>
          <ol>
            <p>
              2. Takkal Permit submissions will not be accepted outside the
              designated time slot{" "}
              <span style={{ color: "red" }}>(11:00 AM to 12:00 PM)</span>.
            </p>
          </ol>
          <ol>
            <p>
              3. Payment adjustments for Takkal Permits will reflect
              automatically during the application process.
            </p>
          </ol>
          <ol>
            <p>
              4. Double-check all details before submitting the application to
              avoid errors.
            </p>
          </ol>
          <ol>
            <p style={{ color: "red" }}>
              <span style={{fontSize:"bold"}}>NOTE </span>If Your Permit gets Rejected , it is due to
              different reasons such as Fine Pending, Pending Cases,etc...
            </p>
          </ol>
        </ul>
      </div>

      <div className="home-card-container">
        <div className="home-card">
          <h5>Tamil Nadu</h5>
          <h3>{tn}</h3>
        </div>
        <div className="home-card">
          <h5>Maharastra</h5>
          <h3>{mh}</h3>
        </div>
        <div className="home-card">
          <h5>Karnataka</h5>
          <h3>{kr}</h3>
        </div>
        <div className="home-card">
          <h5>Kerala</h5>
          <h3>{kl}</h3>
        </div>
        <div className="home-card">
          <h5>Telangana</h5>
          <h3>{tel}</h3>
        </div>
      </div>
    </div>
  );
}
