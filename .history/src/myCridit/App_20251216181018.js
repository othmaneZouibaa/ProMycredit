import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"
// import Dashboard from "./seller/Customers"
import Dashboard from "./seller/Dashboard"
// import Clients from "./seller/Clients"
// import History from "./seller/History"
// import Settings from "./seller/Settings"

const App=()=>{
    return(
        <div>
          
            <Routes>
                <Route path="/seller" element={<Seller />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="clients" element={<Clients />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} /> */}
      </Route>
               <Route path="/" element={<Accueil/>}/> 
               
            </Routes>
             
        </div>
    )
}
export default App