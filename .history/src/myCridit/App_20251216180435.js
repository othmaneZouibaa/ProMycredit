import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"
import Dashboard from "./seller/Customers"

const App=()=>{
    return(
        <div>
          
            <Routes>
               <Route path="/seller-panel" element={<Seller />}/> 
               <Route path="/seller-panel/dashboard" element={<Dashboard />}/> 
               <Route path="/" element={<Accueil/>}/> 

            </Routes>
             
        </div>
    )
}
export default App