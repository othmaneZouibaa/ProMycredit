import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"

const App=()=>{
    return(
        <div>
          
            <Routes>
               <Route path="/seller-panel" element={<Seller >
                
               </Seller>}/> 
               <Route path="/" element={<Accueil/>}/> 
            </Routes>
             
        </div>
    )
}
export default App