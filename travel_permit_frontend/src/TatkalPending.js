import React, { useEffect, useState } from "react";
import Sidebar from "./components/AdminSidebar";
import"./css/AdminApprove.css";

export default function TatkalPending() {
    const[pending,setpendinglist] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
        try{
            const response = await fetch("http://localhost:8080/transportpermit/takkal-list");
            const data = await response.json();
            setpendinglist(data);
        }catch(error)
        {
            console.error("Error to fetch Tatkkal form",error);
        }
    };
    fetchdata();
  }, []);

  const handleAccept = async (id) =>{
    try{
      await fetch(`http://localhost:8080/transportpermit/takkal-list/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        }
        
      })
     

    }catch(error)
    {
      console.error("Error to approve the Tatkkal List")
    }
   window.location.reload();
  }


  return (
    <div style={{display:"flex"}}>
    
      <Sidebar/>

      <div className="approval-wrap">
        <div className="title"><h1>Tatkkal Pending Lists</h1></div>
        {pending.map((show, index) => (
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
                <b>Amount Payed : </b> {show.amount}
              </p>
            </div>

            <div className="Btn-container-approval">
              <button className="btn-reject">Reject</button>
              <button className="btn-approval" onClick={()=>{handleAccept(show.id)}}>
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
