import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isContactVisible, isWorkVisible }) => {
    const location = useLocation();

    const scrollTo = (id) => {
        if (location.pathname === '/') {
            const element = document.getElementById(id);
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Simplified class logic to ensure full header color change
    const headerClass = `fixed top-0 left-0 right-0 z-50 border-b border-gray-700 p-4 transition-all duration-300 ${isContactVisible || isWorkVisible
        ? 'bg-black text-white border-gray-700'
        : 'bg-[#F7F6F3] text-black border-gray-200'
        }`;

    return (
        <header className={headerClass}>
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl md:text-2xl">Champagne.dev</Link>
                <ul className="flex space-x-4 text-lg md:text-xl">
                    {/* I had href="#" but thats not good for accessibility, so I changed it to an anchor tag with an onClick event that scrolls to the home section */}
                    <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="hover:underline underline-offset-8 decoration-2 decoration-dotted">Intro</a></li>
                    <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="hover:underline underline-offset-8 decoration-2 decoration-dotted">About</a></li>
                    <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }} className="hover:underline underline-offset-8 decoration-2 decoration-dotted">Work</a></li>
                    <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="hover:underline underline-offset-8 decoration-2 decoration-dotted">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;