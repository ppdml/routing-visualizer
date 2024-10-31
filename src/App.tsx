import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Routing from "./pages/Routing.tsx";
import GaiaxAssets from "./pages/GaiaxAssets.tsx";
import NavBar from "./NavBar.tsx";


function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <div className="m-10">
                <Routes>
                    <Route path="/" element={Home()}/>
                    <Route path="/routing" element={Routing()}/>
                    <Route path="/gaiax" element={GaiaxAssets()}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
