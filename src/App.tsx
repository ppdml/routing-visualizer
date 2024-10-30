import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Routing from "./pages/Routing.tsx";
import GaiaxAssets from "./pages/GaiaxAssets.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: Home(),
  },
  {
    path: "/routing",
    element: Routing(),
  },
  {
    path: "/assets",
    element: GaiaxAssets(),
  }
])


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
