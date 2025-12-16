import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"
import Dashboard from "./seller/Customers"

const App=()=>{
    return(
        <div>
          
            <Routes>
                <Route path="/seller" element={<Seller />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
      </Route>
               <Route path="/" element={<Accueil/>}/> 
               
            </Routes>
             
        </div>
    )
}
export default App