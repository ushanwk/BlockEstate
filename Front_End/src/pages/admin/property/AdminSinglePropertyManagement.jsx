import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../components/admin/Header.jsx";
import { TextField } from "../../../components/common/TextField.jsx";
import { CountryComboBox } from "../../../components/common/CountryComboBox.jsx";
import { TextArea } from "../../../components/common/TextArea.jsx";
import { TextFieldWithIcon } from "../../../components/common/TextFieldWithIcon.jsx";
import { Blocks, DollarSign, LayoutTemplate, Ruler, House, BedDouble, Car } from "lucide-react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const AdminSinglePropertyManagement = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5500/api/property/get/${id}`);
                setProperty(response.data);

                console.log(response.data);

            } catch (err) {
                console.error("Error fetching property:", err);
                setError(err.response?.data?.message || 'Failed to load property');
                toast.error("Error loading property", {
                    description: "Could not fetch property details",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading property details...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
            </div>
        );
    }

    if (!property) {
        return (
            <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                Property not found
            </div>
        );
    }

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Single Property Details</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">View and manage property details that belongs to your agency</p>
            </section>

            <section className="mt-12">
                <div className="flex gap-4 mt-6">
                    <div className="w-[300px] h-[200px]">
                        <img src={property.imageOneUrl} className="w-[300px] h-[200px]"  alt="img"/>
                    </div>
                    <div className="w-[300px] h-[200px]">
                        <img src={property.imageTwoUrl} className="w-[300px] h-[200px]" alt="img"/>
                    </div>
                    <div className="w-[300px] h-[200px]">
                        <img src={property.imageThreeUrl} className="w-[300px] h-[200px]" alt="img"/>
                    </div>
                </div>
            </section>

            <section className="w-full mt-2 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="dark:text-white text-[18px] font-light">General Details</h1>
                </div>

                <div className="mt-8">
                    <TextField
                        label="Property Title"
                        value={property.title || ''}
                    />

                    <div className="flex items-center gap-5">
                        <div className="w-full">
                            <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Located Country</label>
                            <CountryComboBox
                                selectedCountry={property.country}
                                value={property.country}
                            />
                        </div>

                        <div className="w-full mt-4">
                            <TextField
                                label="Located City"
                                value={property.city || ''}
                            />
                        </div>

                        <div className="w-full mt-4">
                            <TextField
                                label="Located Address"
                                value={property.address || ''}
                            />
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <TextArea
                            label="Description"
                            value={property.description || ''}
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
                            value={property.totalBlocks || ''}
                            disabled="disabled"
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={DollarSign}
                            label="Block Price"
                            value={property.blockPrice || ''}
                            disabled="disabled"
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={DollarSign}
                            label="Block Rental"
                            value={property.blockRental || ''}
                            disabled="disabled"
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={LayoutTemplate}
                            label="Rem Blocks"
                            value={property.remBlocks || ''}
                            disabled="disabled"
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
                            value={property.size || ''}
                            disabled="disabled"
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={House}
                            label="No of Houses"
                            value={property.noOfHouses || ''}
                            disabled="disabled"
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={BedDouble}
                            label="No of Rooms"
                            value={property.noOfRooms || ''}
                            disabled="disabled"
                        />
                    </div>

                    <div className="w-full">
                        <TextFieldWithIcon
                            icon={Car}
                            label="No of Garages"
                            value={property.noOfGarages || ''}
                            disabled="disabled"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};