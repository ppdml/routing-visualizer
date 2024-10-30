import {NavLink} from "react-router-dom";
import tuLogo from './assets/tud_logo.svg';
import romsLogo from './assets/roms_logo.png';

function NavBar() {
    const baseNav = "font-bold hover:bg-tuGreen text-white py-2 px-4 rounded transition duration-200 hover:ease-in-out motion-reduce:transition-none";
    const activeNav = baseNav + " bg-tuGreen";
    const inactiveNav = baseNav + " bg-gaiaPurple";

    return (
        <nav
            className="bg-slate-100 flex-nowrap relative flex w-full items-center justify-between py-2 lg:flex-wrap lg:py-4 space-x-20">
            <div className="grow-0 pl-2">
                <img src={tuLogo} alt="TU Logo" className="h-8"/>
            </div>
            <div className="grow-1 space-x-10 mt-1 mb-1 justify-center">
                <NavLink to="/" className={({isActive}) => (isActive ? activeNav : inactiveNav)}>Home</NavLink>
                <NavLink to="/routing" className={({isActive}) => (isActive ? activeNav : inactiveNav)}>Routing</NavLink>
                <NavLink to="/gaiax" className={({isActive}) => (isActive ? activeNav : inactiveNav)}>Gaiax</NavLink>
            </div>
            <div className="grow-0 pr-2">
                <img src={romsLogo} alt="TU Logo" className="h-8"/>
            </div>
        </nav>
    );
}

export default NavBar;