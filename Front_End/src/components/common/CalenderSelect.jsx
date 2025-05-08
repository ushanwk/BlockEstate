import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';

export const CalendarSelect = ({
                                   value,
                                   onChange = () => {}, // Default empty function to prevent errors
                                   placeholder = "Select a date",
                                   className = "",
                                   disabled = false
                               }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(value || new Date());

    // Set today's date as default if no value is provided
    useEffect(() => {
        if (!value) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize time to midnight
            setSelectedDate(today);
            onChange(today);
        }
    }, []);

    // Update internal state when value prop changes
    useEffect(() => {
        if (value) {
            const newDate = new Date(value);
            newDate.setHours(0, 0, 0, 0); // Normalize time to midnight
            setSelectedDate(newDate);

            // Also update the current month/year view to match the new date
            setCurrentMonth(newDate.getMonth());
            setCurrentYear(newDate.getFullYear());
        }
    }, [value]);

    const toggleCalendar = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleDateSelect = (date) => {
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0); // Normalize time to midnight

        setSelectedDate(normalizedDate);
        onChange(normalizedDate);
        setIsOpen(false);
    };

    const navigateMonth = (direction) => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
    };

    const renderDays = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        const days = [];

        // Previous month's days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            days.push(
                <div key={`prev-${day}`} className="text-gray-400 dark:text-[#5D5D65] p-2 text-center">
                    {day}
                </div>
            );
        }

        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isSelected = selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
            const isToday = date.toDateString() === new Date().toDateString();

            days.push(
                <div
                    key={`current-${day}`}
                    className={`p-2 text-center cursor-pointer rounded-full
            ${isToday ? 'font-bold' : ''}
            ${isSelected ? 'bg-[#0274F9] text-white' : 'hover:bg-gray-100 dark:hover:bg-[#2A2A32]'}
          `}
                    onClick={() => handleDateSelect(date)}
                >
                    {day}
                </div>
            );
        }

        // Next month's days to fill the grid
        const totalCells = Math.ceil(days.length / 7) * 7;
        while (days.length < totalCells) {
            const day = days.length - (firstDayOfMonth + daysInMonth) + 1;
            days.push(
                <div key={`next-${day}`} className="text-gray-400 dark:text-[#5D5D65] p-2 text-center">
                    {day}
                </div>
            );
        }

        return days;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const formatSelectedDate = (date) => {
        if (!date) return placeholder;
        return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    return (
        <div className={`relative text-sm ${className}`}>
            {/* Input display */}
            <div
                className={`flex items-center justify-between w-full p-2 text-[12px] rounded-[5px] outline-none transition duration-300 ease-out
          dark:bg-transparent text-gray-400 dark:text-[#5D5D65] border dark:border-[#5D5D65]
          border-[#D9D9D9] dark:focus:border-[#0274F9] focus:border-[#0274F9] dark:font-extralight
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={toggleCalendar}
            >
        <span className="truncate">
          {formatSelectedDate(selectedDate)}
        </span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 dark:text-[#5D5D65] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {/* Calendar dropdown */}
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-[5px] shadow-lg
          dark:bg-[#1E1E24] bg-white border dark:border-[#5D5D65] border-[#D9D9D9] p-2">

                    {/* Month navigation */}
                    <div className="flex justify-between items-center mb-2">
                        <button
                            onClick={() => navigateMonth('prev')}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#2A2A32]"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <div className="font-medium">
                            {monthNames[currentMonth]} {currentYear}
                        </div>
                        <button
                            onClick={() => navigateMonth('next')}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Day names */}
                    <div className="grid grid-cols-7 gap-1 mb-1">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-white p-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1 dark:text-white">
                        {renderDays()}
                    </div>

                    {/* Today button */}
                    <div className="mt-2 flex justify-center">
                        <button
                            onClick={() => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                handleDateSelect(today);
                                setCurrentMonth(today.getMonth());
                                setCurrentYear(today.getFullYear());
                            }}
                            className="text-xs text-[#0274F9] hover:underline"
                        >
                            Today
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add default props for better safety
CalendarSelect.defaultProps = {
    onChange: () => {},
    value: null,
    placeholder: "Select a date",
    className: "",
    disabled: false
};