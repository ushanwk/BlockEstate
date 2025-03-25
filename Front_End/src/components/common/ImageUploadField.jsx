import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react"; // Lucide icons

export const ImageUploadField = ({ label, topic, subTopic, rulesText, onUpload }) => {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            if (onUpload) {
                onUpload(file);
            }
        }
    };

    // Trigger file input when clicking the box
    const handleClick = () => {
        fileInputRef.current.click();
    };

    // Remove the selected image
    const removeImage = (e) => {
        e.stopPropagation(); // Prevent triggering file input
        setImage(null);
        fileInputRef.current.value = "";
    };

    return (
        <div className="w-full">
            {/* Label */}
            <label className="block text-[13px] mb-2 text-left dark:text-white dark:font-extralight">
                {label}
            </label>

            {/* Upload Box */}
            <div
                className="w-full p-4 px-8 border border-gray-300 dark:border-gray-600
                rounded-md flex justify-between items-center transition duration-300
                hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer"
                onClick={handleClick}
            >
                {/* Left Side: Topic & Sub-topic */}
                <div className="text-left">
                    <p className="text-[12px] font-light dark:text-white">{topic}</p>
                    <p className="text-[8px] font-light text-gray-400 dark:text-gray-500 w-48">{subTopic}</p>
                </div>

                {/* Right Side: Image or Upload Icon */}
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600">
                    {image ? (
                        <>
                            {/* Circular Image Preview */}
                            <img
                                src={image}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-full"
                            />
                            {/* Remove Button */}
                            <button
                                onClick={removeImage}
                                className="absolute top-0 right-0 bg-gray-800 text-white p-1 rounded-full transform translate-x-1/2 -translate-y-1/2"
                            >
                                <X size={14} />
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-1">
                            {/* Upload Icon & Rules */}
                            <Upload size={24} className="text-gray-500 dark:text-gray-400" />
                            <p className="text-[8px] font-light text-gray-400 dark:text-gray-500 text-center">
                                {rulesText}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
            />
        </div>
    );
};
