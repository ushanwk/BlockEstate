import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const ComboBox = ({
                             options = [], // Default empty array to prevent undefined errors
                             value,
                             onChange,
                             placeholder = "Select an option",
                             className = "",
                             disabled = false
                         }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const comboBoxRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const filteredOptions = options?.filter(option =>
        option?.label?.toLowerCase()?.includes(searchTerm.toLowerCase())
    ) || [];

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
        setSearchTerm("");
    };

    const selectedOption = options.find(opt => {
        if (value === null && opt.value === null) return true;
        return opt.value === value;
    });


    return (
        <div
            ref={comboBoxRef}
            className={`relative ${className}`}
        >
            {/* Input with dropdown toggle */}
            <div
                className={`flex items-center justify-between w-full p-2 text-[12px] rounded-[5px] outline-none transition duration-300 ease-out
          dark:bg-transparent text-gray-400 dark:text-[#5D5D65] border dark:border-[#5D5D65]
          border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 dark:text-[#5D5D65] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-[5px] shadow-lg
          dark:bg-[#1E1E24] bg-white border dark:border-[#5D5D65] border-[#D9D9D9]">
                    {/* Search input inside dropdown */}
                    <div className="p-2 border-b dark:border-[#5D5D65] border-[#D9D9D9]">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search options..."
                            className="w-full p-1 pl-2 text-[12px] rounded-[3px] outline-none
                dark:bg-[#2A2A32] dark:text-[#ffffff] border dark:border-[#5D5D65]
                border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9]"
                            autoFocus
                        />
                    </div>

                    {/* Options list */}
                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`flex items-center justify-between px-3 py-2 text-[12px] cursor-pointer
                    hover:dark:bg-[#2A2A32] hover:bg-gray-100
                    ${value === option.value ? 'dark:bg-[#2A2A32] bg-gray-100' : ''}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <Check className="h-4 w-4 text-[#0274F9]" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-[12px] text-gray-500 dark:text-[#5D5D65]">
                                {options.length === 0 ? 'No options available' : 'No matches found'}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Add PropTypes for better development
ComboBox.defaultProps = {
    options: []
};