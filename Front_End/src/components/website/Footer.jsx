import LogoBarColor from "../../assets/icons/common/LogoBarColor.png";
import FBIcon from "../../assets/icons/common/FBIcon.png";
import InstaIcon from "../../assets/icons/common/InstaIcon.png";
import XICon from "../../assets/icons/common/XIcon.png";
import LinkedIcon from "../../assets/icons/common/LinkedIcon.png";

export const Footer = () => {
    return (
        <footer className="bg-[#002A5C] dark:bg-gray-900 text-white pb-5 pt-16">
            <div className="container mx-auto px-6 lg:px-20 text-center">

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand Section */}
                    <div className="flex flex-col items-center">
                        <img src={LogoBarColor} alt="Cyprea Logo" className="mb-2 w-[150px] md:w-[200px] mt-[-3px]" />
                        <p className="text-gray-300 text-sm mt-3 max-w-sm mx-auto">
                            Please contact us if you have a specific problem or idea.
                        </p>
                        <p className="text-[var(--color-primary)] mt-2 text-sm">Blockestate.info@gmail.com</p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/" className="hover:underline">About</a></li>
                            <li><a href="/" className="hover:underline">Properties</a></li>
                            <li><a href="/" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact & Social Links */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-3">Contact</h3>
                        <div className="flex space-x-4 mt-2 justify-center">
                            <a href="#"><img src={FBIcon} className="w-6 hover:scale-110 transition" alt="Facebook" /></a>
                            <a href="#"><img src={InstaIcon} className="w-6 hover:scale-110 transition" alt="Instagram" /></a>
                            <a href="#"><img src={LinkedIcon} className="w-6 hover:scale-110 transition" alt="LinkedIn" /></a>
                            <a href="#"><img src={XICon} className="w-6 hover:scale-110 transition" alt="Twitter" /></a>
                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <p className="text-center text-sm text-gray-400 mt-10 border-t border-gray-500 pt-5">
                    © 2025 BlockEstate. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
