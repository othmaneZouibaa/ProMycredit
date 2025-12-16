import { Route, Routes } from "react-router-dom"
import Accueil from "./home/Accueil"
import Seller from "./seller/Seller"
import Dashboard from "./seller/Customers"

const App=()=>{
    return(
        <div>
          
            <Routes>
<Route path="/" element={<Accueil />} />

      <Route path="/seller-panel" element={<Seller />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

      </Route>

    </Routes>             
        </div>
    )
}
export default App