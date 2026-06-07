import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch } from "react-redux"
import { initializeAuth } from "./seller/authSlice"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"
import Dashboard from "./seller/Dashboard"
import Customers from "./seller/Customers"
import ListConsumers from "./seller/listConsumers"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ProtectedRoute from "./auth/ProtectedRoute"
import PublicRoute from "./auth/PublicRoute"

// Consumer Panel Imports
import ConsumerLayout from "./consumer/components/Layout"
import ConsumerDashboard from "./consumer/pages/Dashboard"
import MyCredits from "./consumer/pages/Credits"
import PaymentHistory from "./consumer/pages/Payments"
import ConsumerProfile from "./consumer/pages/Profile"
import ConsumerSettings from "./consumer/pages/Settings"
import ConsumerNotifications from "./consumer/pages/Notifications"

const App=()=>{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    return(
        <div>
          
            <Routes>
              {/* Public Home Page */}
              <Route path="/" element={<Accueil />} />

              {/* Guest Only Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              {/* Protected Seller Routes */}
              <Route element={<ProtectedRoute allowedRole="seller" />}>
                <Route path="/seller-panel" element={<Seller />}>
                  <Route index element={<Customers />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="list-consumers" element={<ListConsumers />} />
                </Route>
              </Route>

              {/* Protected Consumer Routes */}
              <Route element={<ProtectedRoute allowedRole="consumer" />}>
                <Route path="/consumer-panel" element={<ConsumerLayout />}>
                  <Route index element={<ConsumerDashboard />} />
                  <Route path="credits" element={<MyCredits />} />
                  <Route path="payments" element={<PaymentHistory />} />
                  <Route path="profile" element={<ConsumerProfile />} />
                  <Route path="settings" element={<ConsumerSettings />} />
                </Route>
              </Route>

            </Routes>             
        </div>
    )
}
export default App