import React from 'react';

export const TextFieldWithIcon = ({
                                      label,
                                      placeholder,
                                      value,
                                      onChange,
                                      icon: Icon, // The icon component (e.g., from Lucide or other icon library)
                                      iconColor = 'text-gray-400', // Default icon color
                                      darkIconColor = 'dark:text-gray-500' // Default dark mode icon color
                                  }) => {
    return (
        <div className="mb-4">
            {/* Label with Tailwind dark mode classes */}
            <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                {label}
            </label>

            <div className="relative">
                {/* Icon container */}
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconColor} ${darkIconColor}`}>
                    {Icon && <Icon size={16} />}
                </div>

                {/* Input field with padding to accommodate the icon */}
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full p-2 pl-10 text-[12px] rounded-[5px] outline-none transition duration-300 ease-out
          dark:bg-transparent dark:text-[#ffffff] border dark:border-[#5D5D65]
          border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight"
                />
            </div>
        </div>
    );
};