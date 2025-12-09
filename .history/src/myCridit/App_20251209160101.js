import { Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import AjouterConsommer from "./seller/AjouterConsommer"

const App=()=>{
    return(
        <div>
            <Accueil></Accueil>
            <Routes
             <AjouterConsommer />
        </div>
    )
}
export default App