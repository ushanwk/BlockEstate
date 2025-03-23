import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";

export const PasswordField = ({ label, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4 relative">
            {/* Label */}
            <label className="block text-[14px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                {label}
            </label>

            {/* Input Field with Eye Icon */}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full p-2 pr-10 text-[12px] rounded-[5px] outline-none transition duration-300 ease-out
                    dark:bg-transparent dark:text-[#ffffff] border dark:border-[#5D5D65]
                    border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight"
                />

                {/* Eye Icon (Toggle Password Visibility) */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};
