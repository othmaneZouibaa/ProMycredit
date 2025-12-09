import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"

const App=()=>{
    return(
        <div>
          <br
            <Routes>
               <Route path="/seller-panel" element={<Seller />}/> 
               <Route path="/" element={<Accueil/>}/> 
            </Routes>
             
        </div>
    )
}
export default App