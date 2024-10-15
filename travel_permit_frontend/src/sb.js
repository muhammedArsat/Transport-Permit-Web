import React, { useState } from 'react'
import './css/Sb.css'
export default function Sb() {
  const [isSidebarOpen,SetSidebarOpen] = useState(false);

  const toggleSideBar = () =>{
    SetSidebarOpen(!isSidebarOpen)
  }
  return (
    <div>

     <div className='sb-mob'>
     <div className='sb-header'>Transport Website</div>
     <div className='sb-menu' onClick={toggleSideBar}>  &#9776;</div>
    
  
     </div>
      <div className={`sb ${isSidebarOpen?'open':''}`}>
      <div>Transport Website</div>
      <ul>
        <li> Home </li>
        <li> User Form </li>
        <li> Takkal Form </li>
        <li>Logout</li>

      </ul>
      </div>

    </div>
  )
}
