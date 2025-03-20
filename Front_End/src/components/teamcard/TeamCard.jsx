import { useState } from "react";
import FbIconColor from "../../assets/icons/common/FBIconColor.png";
import WebIconColor from "../../assets/icons/common/WebIconColor.png";
import LinkedInIconColor from "../../assets/icons/common/LinkedInIconColor.png";
import { Facebook, Globe, Linkedin } from "lucide-react";

export const TeamCard = ({ member }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative w-72 h-auto rounded-lg overflow-hidden shadow-lg transition-all duration-300"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Member Image */}
            <img
                src={member.image}
                alt={member.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                    hover && member.description ? "opacity-30" : "opacity-100"
                }`}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Default View (No Hover) */}
            {!hover || !member.description ? (
                <div className="absolute bottom-4 left-4 text-left">
                    <h3 className="text-white text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-200 text-sm">{member.role}</p>
                </div>
            ) : (
                // **Smooth White Overlay on Hover**
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-black dark:text-white p-4 transition-opacity duration-500 ease-in-out 
                        ${hover ? "bg-white/30 opacity-100 dark:bg-black/20" : "bg-white/0 opacity-0"}`}
                >
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm cursor-default">{member.role}</p>
                    <p className="text-[10px] mt-2 font-light text-black/55 dark:text-white/55 cursor-default">
                        {member.description}
                    </p>
                    <div className="relative w-74 h-auto rounded-lg overflow-hidden transition-all duration-300">
                        {/* Icons Section */}
                        <div className="mt-7 flex justify-center gap-4">
                            <Facebook className="w-6 h-6 p-1 border-[0.5px] border-gray-600 dark:border-gray-400 rounded-md dark:text-white text-black transition-colors duration-300 hover:bg-white/100 dark:hover:bg-black/100" />
                            <Globe className="w-6 h-6 p-1 border-[0.5px] border-gray-600 dark:border-gray-400 rounded-md dark:text-white text-black transition-colors duration-300 hover:bg-white/100 dark:hover:bg-black/100" />
                            <Linkedin className="w-6 h-6 p-1 border-[0.5px] border-gray-600 dark:border-gray-400 rounded-md dark:text-white text-black transition-colors duration-300 hover:bg-white/100 dark:hover:bg-black/100" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
