import {NavLink} from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/routing">Routing</NavLink></li>
        <li><NavLink to="/gaiax">GaiaXAssets</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;