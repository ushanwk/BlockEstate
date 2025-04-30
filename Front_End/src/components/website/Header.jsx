import {useState, useEffect, useRef} from "react";
import {Menu, X, LogOut, Pencil } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle.jsx";
import LogoBarWhite from "../../assets/icons/common/LogoBarWhite.png";
import LogoBarColor from "../../assets/icons/common/LogoBarColor.png";
import { Button } from "../common/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import axios from "axios";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase/firebase.config.js";


export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Detect scroll position and update state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const { signOutUser } = useAuth();

    const [profileImageUrl, setProfileImageUrl] = useState(null);

    async function getUserProfilePicture(currentUser) {
        const firebaseUid = currentUser.uid;

        const token = await currentUser.getIdToken();

        const res = await axios.post(
            "http://localhost:5500/api/user/get-user-image",
            {firebaseUid},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setProfileImageUrl(res.data.image);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                getUserProfilePicture(currentUser);
                setIsLoggedIn(true);
            } else {
                // user is logged out
                console.log('No user signed in');
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);




    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <header
            className={`fixed top-0 left-0 w-full py-5 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-36 
                z-50 border-b transition-[background,box-shadow] duration-300 ${
                isScrolled
                    ? "bg-white dark:bg-gray-900 shadow-md border-white dark:border-gray-700"
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
                        {[
                            { name: "Home", path: "/" },
                            { name: "About", path: "/about" },
                            { name: "Properties", path: "/properties" },
                            { name: "Contact", path: "/contact" }
                        ].map(({ name, path }) => (
                            <li key={name} className="relative">
                                <Link
                                    to={path}
                                    className={`text-[14px] cursor-pointer relative 
                                        after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] 
                                        after:bg-white after:transition-all after:duration-300
                                        hover:after:w-full hover:text-white 
                                        ${
                                        location.pathname === path
                                            ? `after:w-full ${isScrolled ? "underline dark:no-underline" :null}`
                                            : "after:w-0"
                                    } 
                                        ${isScrolled ? "text-black dark:text-white" : "text-white"}
                                    `}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Side - Profile Picture OR Button & Theme Toggle */}
                <div className="hidden md:flex gap-6 items-center">
                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg z-50">
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            // navigate("/profile");
                                        }}
                                        className="flex items-center gap-2 w-full text-[12px] text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        <Pencil size={16} />
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            signOutUser();
                                            setDropdownOpen(false);
                                        }}
                                        className="flex items-center gap-2 w-full text-[12px] text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                    ) : (
                        <Button
                            onclick={() => navigate("/auth")}
                            children={"Get Started"} border={"border"}
                        />
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
                        {[
                            { name: "Home", path: "/" },
                            { name: "About", path: "/about" },
                            { name: "Properties", path: "/properties" },
                            { name: "Contact", path: "/contact" }
                        ].map(({ name, path }) => (
                            <li key={name} className="relative">
                                <Link
                                    to={path}
                                    className={`text-[18px] cursor-pointer relative 
                                        after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] 
                                        after:bg-white after:transition-all after:duration-300
                                        hover:after:w-full hover:text-white 
                                        ${
                                        location.pathname === path
                                            ? "after:w-full text-white"
                                            : "after:w-0"
                                    } 
                                    `}
                                    onClick={() => setMenuOpen(false)} // Close menu after clicking
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Button OR Profile Picture & Theme Toggle in Mobile Menu */}
                    {isLoggedIn ? (
                        <img
                            src={profileImageUrl}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-2 border-white cursor-pointer"
                        />
                    ) : (
                        <Button
                            onclick={() => navigate("/auth")}
                            children={"Get Started"} border={"border"}
                        />
                    )}

                    <ThemeToggle />
                </div>
            )}
        </header>
    );
};
