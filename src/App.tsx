import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Routing from "./pages/Routing.tsx";
import GaiaxAssetsRoutingRequest from "./pages/GaiaxAssetsRoutingRequest.tsx";
import NavBar from "./NavBar.tsx";
import GaiaxRoutingImage from "./pages/GaiaxRoutingImage.tsx";


function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <div className="m-10">
                <Routes>
                    <Route path="/" element={Home()}/>
                    <Route path="/routing" element={Routing()}/>
                    <Route path="/gaiax-overview" element={GaiaxRoutingImage()}/>
                    <Route path="/gaiax-routing-request" element={GaiaxAssetsRoutingRequest()}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
