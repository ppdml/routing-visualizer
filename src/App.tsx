import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Routing from "./pages/Routing.tsx";
import GaiaxAssetsRoutingRequest from "./pages/GaiaxAssetsRoutingRequest.tsx";
import NavBar from "./NavBar.tsx";
import GaiaxRoutingImage from "./pages/GaiaxRoutingImage.tsx";
import GaiaxAssetsRoutingResponse from "./pages/GaiaxAssetsRoutingResponse.tsx";


function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <div className="m-10">
                <Routes>
                    <Route path="/" element={<Navigate to="/routing"/>}/>
                    <Route path="/routing" element={Routing()}/>
                    <Route path="/gaiax-overview" element={GaiaxRoutingImage()}/>
                    <Route path="/gaiax-routing-request" element={GaiaxAssetsRoutingRequest()}/>
                    <Route path="/gaiax-routing-response" element={GaiaxAssetsRoutingResponse()}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
