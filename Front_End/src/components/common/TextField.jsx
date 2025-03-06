import React from 'react';

export const TextField = ({ label, placeholder, value, onChange}) => {
    return (
        <div className="mb-4">
            {/* Label with Tailwind dark mode classes */}
            <label className="block text-[14px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 text-[14px] rounded-[5px] outline-none transition duration-300 ease-out
                dark:bg-transparent dark:text-[#ffffff] border dark:border-[#5D5D65]
                border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight"
            />
        </div>
    );
};
