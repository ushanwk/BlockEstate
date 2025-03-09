import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import Lucide-react icons
import ThemeToggle from "../common/ThemeToggle.jsx";
import LogoBarWhite from "../../assets/icons/LogoBarWhite.png";
import { Button } from "../common/Button.jsx";

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center w-full py-5 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-36 border-b border-white relative">
            {/* Logo */}
            <img src={LogoBarWhite} className="max-w-[150px] h-auto" alt="logo" />

            {/* Nav Links - Hidden on Mobile */}
            <nav className="hidden md:flex items-center gap-8 text-white">
                <ul className="flex gap-8 list-none">
                    {["Home", "About", "Properties", "Contact"].map((item) => (
                        <li
                            key={item}
                            className="cursor-pointer relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-primary)] hover:text-[var(--color-primary)] after:transition-all after:duration-300 hover:after:w-full"
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
                        src="https://i.pravatar.cc/40" // Dummy profile picture (replace with actual)
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                    />
                ) : (
                    <Button children={"Get Started"} border={"border"} bgColor={"#5F8DBA"} />
                )}
                <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle Button (Hamburger Icon) */}
            <button
                className="block md:hidden text-white text-3xl"
                onClick={() => setMenuOpen(true)}
            >
                <Menu size={32} /> {/* Lucide-react Hamburger Icon */}
            </button>

            {/* Mobile Overlay Menu */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex flex-col items-center justify-center gap-6 text-white z-50">
                    {/* Close Button (X Icon) */}
                    <button
                        className="absolute top-5 right-5 text-4xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        <X size={36} /> {/* Lucide-react Close Icon */}
                    </button>

                    {/* Mobile Nav Links */}
                    <ul className="text-center text-2xl space-y-6">
                        {["Home", "About", "Properties", "Contact"].map((item) => (
                            <li
                                key={item}
                                className="cursor-pointer hover:text-[var(--color-primary)] transition-colors duration-300"
                                onClick={() => setMenuOpen(false)} // Close menu on click
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
