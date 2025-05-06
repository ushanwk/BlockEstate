import React from 'react';

export const TextFieldWithIcon = ({
                                      label,
                                      placeholder,
                                      value,
                                      onChange,
                                      icon: Icon, // Icon component (e.g., from Lucide)
                                      iconColor = 'text-gray-400',
                                      darkIconColor = 'dark:text-gray-500',
                                      disabled = false // <-- New prop to control input disabled state
                                  }) => {
    return (
        <div className="mb-4">
            <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                {label}
            </label>

            <div className="relative">
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconColor} ${darkIconColor}`}>
                    {Icon && <Icon size={16} />}
                </div>

                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        w-full p-2 pl-10 text-[12px] rounded-[5px] outline-none transition duration-300 ease-out
                        dark:bg-transparent dark:text-[#ffffff] border dark:border-[#5D5D65]
                        border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight
                        ${disabled ? 'bg-gray-200 dark:bg-[#3A3A3A] cursor-not-allowed' : ''}
                    `}
                />
            </div>
        </div>
    );
};
