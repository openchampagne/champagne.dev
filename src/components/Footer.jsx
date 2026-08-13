import React from 'react';

const Footer = ({ isContactVisible, isWorkVisible }) => {
    const currentYear = new Date().getFullYear();

    const footerClass = `border-t pt-6 pb-2 transition-all duration-300 ${isContactVisible || isWorkVisible
        ? 'bg-black border-gray-700'
        : 'bg-[#F7F6F3] border-gray-200'
        }`;

    const textColorClass = isContactVisible || isWorkVisible
        ? 'text-gray-300'
        : 'text-gray-500';

    return (
        <footer className={footerClass}>
            <div className={`container mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] ${textColorClass} space-y-1 md:space-y-0`}>
                <p className="md:text-base">
                    © {currentYear} Felipe Castillo. All rights reserved.
                </p>
                <a
                    href="https://github.com/openthechampagne/champagne.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-2 decoration-dotted hover:decoration-wavy md:text-sm"
                >
                    View the source of this site on GitHub
                </a>
            </div>
        </footer>
    );
};

export default Footer;

