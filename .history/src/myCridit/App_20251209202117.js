import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import  from "./seller/Seller"

const App=()=>{
    return(
        <div>
          
            <Routes>
               <Route path="/seller-panel" element={<AjouterConsommer />}/> 
               <Route path="/" element={<Accueil/>}/> 
            </Routes>
             
        </div>
    )
}
export default App