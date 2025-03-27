import React from 'react';
import { Search } from 'lucide-react';

export const SearchField = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 dark:text-[#5D5D65]" />
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 p-2 text-[12px] rounded-[5px] outline-none transition duration-300 ease-out
        dark:bg-transparent dark:text-[#ffffff] border dark:border-[#5D5D65]
        border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight"
            />
        </div>
    );
};