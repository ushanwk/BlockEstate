import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

export const PropertyImageUploader = ({ maxImages = 3, onImagesChange }) => {
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > maxImages) {
            alert(`You can upload maximum ${maxImages} images`);
            return;
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);

        if (onImagesChange) {
            onImagesChange(updatedImages.map(img => img.file));
        }
    };

    const handleClick = () => {
        if (images.length >= maxImages) return;
        fileInputRef.current.click();
    };

    const removeImage = (index, e) => {
        e.stopPropagation();
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);

        if (onImagesChange) {
            onImagesChange(updatedImages.map(img => img.file));
        }
    };

    return (
        <div className="w-full">

            <div className="flex flex-wrap gap-4">
                {/* Existing images */}
                {images.map((image, index) => (
                    <div key={index} className="relative w-[300px] h-[200px]">
                        <img
                            src={image.preview}
                            alt={`Property ${index + 1}`}
                            className="object-cover rounded-md border border-gray-300 dark:border-gray-600 w-[300px] h-[200px]"
                        />
                        <button
                            onClick={(e) => removeImage(index, e)}
                            className="absolute top-2 right-2 bg-gray-800/80 text-white p-1 rounded-full"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                {/* Upload box (only shown if we can add more images) */}
                {images.length < maxImages && (
                    <div
                        className="w-[300px] h-[200px] bg-gray-200 dark:bg-gray-700 rounded-md border-2 border-dashed border-gray-400 dark:border-gray-500 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                        onClick={handleClick}
                    >
                        <Upload size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Click to upload property images<br />
                            (Max {maxImages} images)
                        </p>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
                multiple
            />
        </div>
    );
};