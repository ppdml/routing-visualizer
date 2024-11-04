import {NavLink} from "react-router-dom";
import tuLogo from './assets/tud_logo.svg';
import romsLogo from './assets/roms_logo.png';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

function NavBar() {
    const baseNav = "flex items-center gap-x-1 font-semibold text-gray-900 decoration-gaiaPurple underline-offset-4";//"font-bold hover:bg-tuGreen text-white py-2 px-4 rounded transition duration-200 hover:ease-in-out motion-reduce:transition-none";
    const activeNav = baseNav + " underline decoration-8 decoration-tuGreen";
    const inactiveNav = baseNav + " hover:underline";

    return (
        <nav
            className="bg-slate-100 flex-nowrap relative flex w-full items-center justify-between py-2 lg:flex-wrap lg:py-4 space-x-20 shadow shadow-xl">
            <div className="grow-0 pl-2">
                <img src={tuLogo} alt="TU Logo" className="h-8"/>
            </div>
            <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 space-x-4">
                <NavLink to="/" className={({isActive}) => (isActive ? activeNav : inactiveNav)}>Home</NavLink>
                <NavLink to="/routing" className={({isActive}) => (isActive ? activeNav : inactiveNav)}>Routing</NavLink>
                <a className={inactiveNav} href="https://federated-catalog-viewer.gaiax4roms.hotsprings.io/nodes/2">Federated Catalog</a>
                <Popover className="relative">
                    <PopoverButton className={inactiveNav}>
                        <span>Gaia-X</span>
                    </PopoverButton>

                    <PopoverPanel
                        transition
                        className="absolute left-10 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="overflow-hidden rounded-xl bg-slate-100 text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-4">
                                <NavLink to="/gaiax-overview" className="hover:underline block p-1">Data Flow Overview</NavLink>
                                <NavLink to="/gaiax-routing-request" className="hover:underline block p-1">Routing Request Assets</NavLink>
                                <NavLink to="/gaiax-routing-response" className="hover:underline block p-1">Routing Response Assets</NavLink>
                            </div>
                        </div>
                    </PopoverPanel>
                </Popover>
            </div>
            <div className="grow-0 pr-2">
                <img src={romsLogo} alt="TU Logo" className="h-8"/>
            </div>
        </nav>
    );
}

export default NavBar;