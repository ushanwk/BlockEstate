import React, { useState } from "react";

export const OTPField = ({ label, value, onChange }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));

    // Handle input change
    const handleChange = (index, event) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value.slice(0, 1); // Allow only one digit
        setOtp(newOtp);
        onChange && onChange(newOtp.join(""));

        // Move to the next box if a number is entered
        if (event.target.value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // Handle backspace navigation
    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    return (
        <div className="w-full">
            {/* Label */}
            <label className="block text-[13px] mb-2 text-left dark:text-white dark:font-extralight">
                {label}
            </label>

            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-[15%] sm:w-[16%] aspect-square text-center text-lg sm:text-xl font-medium 
                            border rounded-md focus:outline-none transition 
                            dark:bg-transparent dark:text-white dark:border-gray-500 border-gray-300 
                            focus:border-blue-500 dark:focus:border-blue-400
                            ${index === 2 ? "mr-4 sm:mr-6" : ""}  // Larger gap after 3rd box
                        `}
                        maxLength="1"
                    />
                ))}
            </div>
        </div>
    );
};
