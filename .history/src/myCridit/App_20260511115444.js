import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"
import Dashboard from "./seller/Dashboard"
import Customers from "./seller/Customers"
import ListConsumers from "./seller/listConsumers"
import ConsumerDashboard from "./consumer/ConsumerDashboard"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ProtectedRoute from "./auth/ProtectedRoute"
import PublicRoute from "./auth/PublicRoute"

const App=()=>{
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
                <Route path="/consumer-panel" element={<ConsumerDashboard />} />
              </Route>

            </Routes>             
        </div>
    )
}
export default App