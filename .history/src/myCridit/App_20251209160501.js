import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import AjouterConsommer from "./seller/AjouterConsommer"

const App=()=>{
    return(
        <div>
            <Accueil></Accueil>
            <Routes>
               <Route path="/seller-panel" element={<AjouterConsommer />}/> 
               <Route path="/" element={}/> 
            </Routes>
             
        </div>
    )
}
export default App