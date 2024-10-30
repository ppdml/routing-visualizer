import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Routing from "./pages/Routing.tsx";
import GaiaxAssets from "./pages/GaiaxAssets.tsx";
import NavBar from "./NavBar.tsx";


function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={Home()} />
        <Route path="/routing" element={Routing()} />
        <Route path="/gaiax" element={GaiaxAssets()} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
