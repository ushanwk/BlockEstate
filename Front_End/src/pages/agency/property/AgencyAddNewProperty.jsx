import React, { useState } from "react";
import { Header } from "../../../components/admin/Header.jsx";
import { PropertyImageUploader } from "../../../components/common/PropertyImageUploader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { TextField } from "../../../components/common/TextField.jsx";
import { CountryComboBox } from "../../../components/common/CountryComboBox.jsx";
import { TextArea } from "../../../components/common/TextArea.jsx";
import { TextFieldWithIcon } from "../../../components/common/TextFieldWithIcon.jsx";
import { Blocks, DollarSign, LayoutTemplate, Ruler, House, BedDouble, Car } from "lucide-react";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../../firebase/firebase.config.js";
import {toast} from "sonner";
import {FullScreenLoader} from "../../../components/common/FullScreenLoader.jsx";
import {useNavigate} from "react-router-dom";


export const AgencyAddNewProperty = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        country: "",
        city: "",
        address: "",
        description: "",
        totalBlocks: "",
        blockPrice: "",
        blockRental: "",
        remBlocks: "",
        size: "",
        noOfHouses: "",
        noOfRooms: "",
        noOfGarages: ""
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImagesUpload = async (selectedImages) => {
        const compressedImages = [];

        for (let file of selectedImages) {
            if (file.size > 500 * 1024) {
                try {
                    const options = {
                        maxSizeMB: 0.5,
                        maxWidthOrHeight: 400,
                        useWebWorker: true
                    };
                    const compressedFile = await imageCompression(file, options);
                    compressedImages.push(compressedFile);
                } catch (error) {
                    console.error("Compression failed:", error);
                }
            } else {
                compressedImages.push(file);
            }
        }

        setImages(compressedImages);
        console.log("Processed Images:", compressedImages);
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const formPayload = new FormData();

            // Append form fields
            for (let key in formData) {
                formPayload.append(key, formData[key]);
            }

            const user = await new Promise((resolve, reject) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    unsubscribe();
                    if (user) {
                        resolve(user);
                    } else {
                        reject("User not signed in");
                    }
                });
            });

            formPayload.append("agencyId", user.uid);

            // Append 3 images
            if (images.length !== 3) {
                alert("Please upload exactly 3 images.");
                return;
            }

            images.forEach((image, index) => {
                formPayload.append("images", image); // use same name for all, multer will collect them as an array
            });

            const response = await axios.post(
                "http://localhost:5500/api/property/create", // Replace with your backend URL
                formPayload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setLoading(false);

            navigate("/agency/properties");

            toast.success("Successfully Created", {
                description: "Property created successfully",
            });

        } catch (error) {
            console.error("Error saving property:", error.response?.data || error.message);
            toast.error("Error in creating", error, {
                description: "Error creating property",
            });
        }
    };

    const handleClear = () => {
        setFormData({
            title: "",
            country: "",
            city: "",
            address: "",
            description: "",
            totalBlocks: "",
            blockPrice: "",
            blockRental: "",
            remBlocks: "",
            size: "",
            noOfHouses: "",
            noOfRooms: "",
            noOfGarages: ""
        });
        setImages([]);
    };


    if(loading) {
        return (<FullScreenLoader />)
    }

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Add New Property</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Add new property and sell them to a wide range of customers.</p>
            </section>

            <section className="mt-8">
                <div className="flex gap-4 mt-6">
                    <PropertyImageUploader maxImages={3} onImagesChange={handleImagesUpload} />
                </div>
            </section>

            <section className="w-full mt-8 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="dark:text-white text-[18px] font-light">General Details</h1>
                    <div className="w-36">
                        <Button red="red" children="Delete Property" />

                    </div>
                </div>

                <div className="mt-8">
                    <TextField
                        label="Property Title"
                        placeholder="Enter title of the property"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />

                    <div className="flex items-center gap-5">
                        <div className="w-full">
                            <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Located Country</label>
                            <CountryComboBox
                                selectedCountry={formData.country}
                                onChange={(country) => handleChange("country", country)}
                                value={formData.country}
                            />
                        </div>

                        <div className="w-full mt-4">
                            <TextField
                                label="Located City"
                                placeholder="Enter located city"
                                value={formData.city}
                                onChange={(e) => handleChange("city", e.target.value)}
                            />
                        </div>

                        <div className="w-full mt-4">
                            <TextField
                                label="Located Address"
                                placeholder="Enter located address"
                                value={formData.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <TextArea
                            label="Description"
                            placeholder="Enter description of the property"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="w-full mt-8 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <h1 className="dark:text-white text-[18px] font-light">Block Details</h1>

                <div className="flex items-center justify-between gap-5 mt-5">

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={Blocks}
                            label="Total Blocks"
                            placeholder="Enter total blocks"
                            value={formData.totalBlocks}
                            onChange={(e) => handleChange("totalBlocks", e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={DollarSign}
                            label="Block Price"
                            placeholder="Enter block price"
                            value={formData.blockPrice}
                            onChange={(e) => handleChange("blockPrice", e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={DollarSign}
                            label="Block Rental"
                            placeholder="Enter block rental"
                            value={formData.blockRental}
                            onChange={(e) => handleChange("blockRental", e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={LayoutTemplate}
                            label="Rem Blocks"
                            placeholder="Enter remaining blocks"
                            value={formData.remBlocks}
                            onChange={(e) => handleChange("remBlocks", e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="w-full mt-8 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <h1 className="dark:text-white text-[18px] font-light">Dimension Details</h1>

                <div className="flex items-center justify-between gap-5 mt-5">
                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={Ruler}
                            label="Size"
                            placeholder="Enter size"
                            value={formData.size}
                            onChange={(e) => handleChange("size", e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={House}
                            label="No of Houses"
                            placeholder="Enter no of houses"
                            value={formData.noOfHouses}
                            onChange={(e) => handleChange("noOfHouses", e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={BedDouble}
                            label="No of Rooms"
                            placeholder="Enter no of rooms"
                            value={formData.noOfRooms}
                            onChange={(e) => handleChange("noOfRooms", e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={Car}
                            label="No of Garages"
                            placeholder="Enter no of garages"
                            value={formData.noOfGarages}
                            onChange={(e) => handleChange("noOfGarages", e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section>
                <div className="flex items-center gap-3 mt-10">
                    <div className="w-36">
                        <Button children="Save Changes" onclick={handleSave} />
                    </div>
                    <div className="w-16">
                        <Button children="Clear" onclick={handleClear} bgColor="#999999" hoverColor="#888888" />
                    </div>
                </div>
            </section>
        </main>
    );
};
