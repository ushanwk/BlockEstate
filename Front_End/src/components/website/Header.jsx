import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle.jsx";
import LogoBarWhite from "../../assets/icons/LogoBarWhite.png";
import LogoBarColor from "../../assets/icons/LogoBarColor.png";
import { Button } from "../common/Button.jsx";

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scroll position and update state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full py-5 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-36 
                z-50 border-b transition-[background,box-shadow] duration-300 ${
                isScrolled
                    ? "bg-white dark:bg-[var(--color-dark-bg-primary)] shadow-md border-white dark:border-gray-700"
                    : "bg-transparent border-white"
            }`}
        >
            {/* Header Content */}
            <div className="flex justify-between items-center">
                {/* Logo */}
                <img
                    src={isScrolled ? LogoBarColor : LogoBarWhite}
                    className={`max-w-[150px] h-auto transform transition-transform duration-300 ease-in-out ${
                        isScrolled ? "scale-110" : "scale-100"
                    }`}
                    alt="logo"
                />



                {/* Nav Links - Hidden on Mobile */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-8 list-none">
                        {["Home", "About", "Properties", "Contact"].map((item) => (
                            <li
                                key={item}
                                className={`text-[14px] cursor-pointer relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-primary)] hover:text-[var(--color-primary)] after:transition-all after:duration-300 hover:after:w-full ${
                                    isScrolled ? "text-black dark:text-white" : "text-white"
                                }`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Side - Profile Picture OR Button & Theme Toggle */}
                <div className="hidden md:flex gap-3 items-center">
                    {isLoggedIn ? (
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-400 cursor-pointer"
                        />
                    ) : (
                        <Button children={"Get Started"} border={"border"} />
                    )}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Toggle Button (Hamburger Icon) */}
                <button
                    className={`block md:hidden ${isScrolled ? "text-black dark:text-white" : "text-white"} text-3xl`}
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu size={32} />
                </button>
            </div>

            {/* Mobile Overlay Menu */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex flex-col items-center justify-center gap-6 text-white z-50">
                    {/* Close Button (X Icon) */}
                    <button
                        className="absolute top-5 right-5 text-4xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        <X size={36} />
                    </button>

                    {/* Mobile Nav Links */}
                    <ul className="flex flex-col text-center gap-8 list-none transition-colors duration-300">
                        {["Home", "About", "Properties", "Contact"].map((item) => (
                            <li
                                key={item}
                                className={`cursor-pointer relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-primary)] 
                                            hover:text-[var(--color-primary)] after:transition-all after:duration-300 hover:after:w-full 
                                            ${isScrolled ? "text-black dark:text-white" : "text-white"}`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>


                    {/* Button OR Profile Picture & Theme Toggle in Mobile Menu */}
                    {isLoggedIn ? (
                        <img
                            src="https://i.pravatar.cc/80"
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-2 border-white cursor-pointer"
                        />
                    ) : (
                        <Button children={"Get Started"} border={"border"} bgColor={"#5F8DBA"} />
                    )}

                    <ThemeToggle />
                </div>
            )}
        </header>
    );
};
