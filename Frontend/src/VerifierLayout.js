import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './components/AdminSidebar';
export default function VerifierLayout() {
  return (
    <div>
         <div style={{ display: "flex", flexDirection: "column" }}>
 

     
 <Sidebar/>

 <div>
   <Outlet />  
 </div>
</div>
    </div>
  )
}
