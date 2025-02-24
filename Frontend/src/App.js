import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import UserForm from "./UserForm";
import TakalUserForm from './TakalUserForm';
import AdminApprove from './AdminApprove';
import AdminLandingPage from './AdminHomePage';
import ApprovedList from './ApprovedList';
import CheckHome from './CheckHome';
import CheckVerify from './CheckpostVerify';
import './App.css';
import UserHome from './UserHome';
import PassedList from './PassedList';
import TatkalPending from './TatkalPending';
import Layout from './UserLayout';
import PaymentForm from './PaymentForm';
import UserDashboard from './UserDashboard';
import MyPermits from './MyPermits';
import AdminLayout from './AdminLayout';
import VerifierLayout from './VerifierLayout';
import UserService from './UserService';
import AdminSidebar from './components/AdminSidebar';
import NotFound from './NotFound';
import AddVerifier from './Verifier';
import AddAdmin from './AddAdmin';

import {ToastContainer} from 'react-toastify'
 
function App() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
        }
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    const ProtectedRoute = ({ role, children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/" />; // Redirect to login if not authenticated
        }

        if (userRole !== role) {
            return <Navigate to="/" />; // Redirect to login if not authorized
        }

        return children;
    };

    return (
       
        <BrowserRouter>
            <div className="content">
          
                <Routes>
                    <Route path="/" element={<UserLogin setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
                    <Route path="/payment" element={<PaymentForm />} />
                    <Route path="/user-register" element={<UserRegister />} />

                    {/* User routes */}
                    <Route element={<Layout />}>
                 
                        <Route path="/user-home" element={<ProtectedRoute role="USER"><UserHome /></ProtectedRoute>} />
                        <Route path="/user-form" element={<ProtectedRoute role="USER"><UserForm /></ProtectedRoute>} />
                        <Route path="/takal-form" element={<ProtectedRoute role="USER"><TakalUserForm /></ProtectedRoute>} />
                        <Route path="/user-dashboard" element={<ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>} />
                        <Route path="/my-permits" element={<ProtectedRoute role="USER"><MyPermits /></ProtectedRoute>} />
                    </Route>

                    {/* Admin routes */}
                    <Route element={<AdminLayout />}>
                        <Route path="/admin-landingpage" element={<ProtectedRoute role="ADMIN"><AdminLandingPage /></ProtectedRoute>} />
                        <Route path="/admin-approve" element={<ProtectedRoute role="ADMIN"><AdminApprove /></ProtectedRoute>} />
                        <Route path="/takkal-pending" element={<ProtectedRoute role="ADMIN"><TatkalPending /></ProtectedRoute>} />
                        <Route path="/approved-list" element={<ProtectedRoute role="ADMIN"><ApprovedList /></ProtectedRoute>} />
                        <Route path="/passed-list" element={<ProtectedRoute role="ADMIN"><PassedList /></ProtectedRoute>} />
                        <Route path='/add-admin' element={<ProtectedRoute role="ADMIN"><AddAdmin/></ProtectedRoute>}/>
                    </Route>

                    {/* Verifier routes */}
                    <Route element={<VerifierLayout />}>
                        <Route path="/check-home" element={<ProtectedRoute role="VERIFIER"><CheckHome /></ProtectedRoute>} />
                        <Route path="/check-verify" element={<ProtectedRoute role="VERIFIER"><CheckVerify /></ProtectedRoute>} />
                        <Route path="/add-verifier" element={<ProtectedRoute role="VERIFIER"><AddVerifier /></ProtectedRoute>} />

                    </Route>

                    {/* Redirect to login for any undefined routes */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;
