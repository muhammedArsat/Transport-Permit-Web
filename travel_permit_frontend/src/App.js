import {RouterProvider,createBrowserRouter} from 'react-router-dom';

import UserLogin from "./UserLogin"
import UserRegister from "./UserRegister";
import UserFrom from "./UserForm";
import TakalUserForm from './TakalUserForm';
import AdminApprove from './AdminApprove';
import AdminLandingPage from './AdminHomePage';
import ApprovedList from './ApprovedList';
import CheckHome from './CheckHome';
import CheckVerify from './CheckpostVerify';
import './App.css' 
import UserHome from './UserHome';
import PassedList from './PassedList';
import TatkalPending from './TatkalPending';
import Layout from './UserLayout';

import PaymentForm from './PaymentForm';
import UserDashboard from './UserDashboard.js';
import MyPermits from './MyPermits.js';

import AdminLayout from './AdminLayout';
import VerifierLayout from './VerifierLayout';

function App() {
  const router = createBrowserRouter([

    {
      path:'/payment',
      element:<PaymentForm/>
    }
   ,
    {
      path:"/",
      element:<UserLogin/>
    },
    {
      path:"/user-register",
      element:<UserRegister/>
    },
    {
      element:<Layout/>,
      children:[
    
    {
      path:"/user-home/:email",
      element:<UserHome/>
    },
  
    {
      path:"/user-form/:email",

      element:<UserFrom/>
    },
    {
      path:"/takal-form/:email",
      element:<TakalUserForm/>
    },
    {
      path:"/user-dashboard/:email",
      element:<UserDashboard/>
    },
    {
      path:"my-permits/:email",
      element:<MyPermits/>
    },
  ]
  },
  {
    element:<AdminLayout/>,
    children:[
      {
        path:"/admin-approve",
        element:<AdminApprove/>
      },
      {
        path:"/admin-landingpage",
        element:<AdminLandingPage/>
      },
     
      {
        path:"/takkal-pending",
        element:<TatkalPending/>
      },
      {
        path:"/approved-list",
        element:<ApprovedList/>
      },
      {
        path:"/passed-list",
        element:<PassedList/>
      },
    ]
  },
 {
  element:<VerifierLayout/>,
  children:[
    {
      path:"/check-home",
      element:<CheckHome/>
    },
    {
      path:"/check-verify",
      element:<CheckVerify/>
    },
  ]
 }
   
  
  ])
  return (
   <div>
    <RouterProvider router={router}/>
   </div>
  );
}

export default App;
