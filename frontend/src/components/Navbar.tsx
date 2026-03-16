import React, { useState } from 'react';
import VguIcon from '../assets/navbar_vgu_wide.png';
import HamburgerIcon from '../assets/menu-hamburger.svg?react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white sticky top-0 w-full z-50 border-b border-gray-200">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
                {/* Logo Section */}
                <a href="#" className="flex items-center space-x-3">
                    <img src={VguIcon} className="h-12" alt="VGU Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-900">Our App</span>
                </a>

                {/* Hamburger Button: Visible on mobile, hidden on lg screens */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                >
                    <span className="sr-only">Open main menu</span>
                    <HamburgerIcon className="w-6 h-6" />
                </button>

                {/* Nav Links: Stacked on mobile, horizontal on lg screens */}
                <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto transition-all`}>
                    <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white">
                        <li>
                            <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Pricing</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;