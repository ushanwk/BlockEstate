import React from 'react';

export const TextArea = ({ label, placeholder, value, onChange, rows = 4 }) => {
    return (
        <div className="mb-4">
            {/* Label with Tailwind dark mode classes */}
            <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                {label}
            </label>

            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full p-2 text-[12px] rounded-[5px] outline-none transition duration-300 ease-out
                dark:bg-transparent dark:text-[#ffffff] border dark:border-[#5D5D65]
                border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight
                resize-y placeholder-[#999999] dark:placeholder-[#5D5D65]"
            />
        </div>
    );
};