import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import AjouterConsommer from "./seller/AjouterConsommer"

const App=()=>{
    return(
        <div>
            <Accueil></Accueil>
            <Routes>
               <Route></Route> <AjouterConsommer />
            </Routes>
             
        </div>
    )
}
export default App