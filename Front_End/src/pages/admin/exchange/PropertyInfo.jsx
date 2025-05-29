import React, { useEffect, useState } from "react";
import { ComboBox } from "../../../components/common/ComboBox.jsx";
import axios from "axios";

export const PropertyInfo = () => {
    const [properties, setProperties] = useState([]);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [selectedPropertyData, setSelectedPropertyData] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/property/exchange');
                const options = response.data.map(item => ({
                    label: item.property, // this is the property title
                    value: item.assetId,   // you can use assetId as unique value
                    data: item             // keep the full object for later use
                }));
                setProperties(options);
                console.log("Properties fetched:", options);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    // Update selected property data when selection changes
    useEffect(() => {
        const found = properties.find(prop => prop.value === selectedPropertyId);
        if (found) {
            setSelectedPropertyData(found.data);
        } else {
            setSelectedPropertyData(null);
        }
    }, [selectedPropertyId, properties]);

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="dark:text-white text-[18px] font-light">Property Information</h1>
            </div>

            <div className="mt-8 mb-2">
                <div className="flex justify-between gap-4">
                    <div className="w-full">
                        <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Property
                        </label>
                        <ComboBox
                            options={properties}
                            value={selectedPropertyId}
                            onChange={setSelectedPropertyId}
                            placeholder="Select a property"
                        />
                    </div>

                    <div className="w-full mt-3">
                        <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Creator Account
                        </label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {selectedPropertyData?.creator || "N/A"}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                    <div className="w-full mt-3">
                        <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Asset ID
                        </label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {selectedPropertyData?.assetId || "N/A"}
                        </div>
                    </div>

                    <div className="w-full mt-3">
                        <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Asset Name
                        </label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {selectedPropertyData?.assetName || "N/A"}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                    <div className="w-full mt-3">
                        <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Unit Name
                        </label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {selectedPropertyData?.unitName || "N/A"}
                        </div>
                    </div>

                    <div className="w-full mt-3">
                        <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Unit Amount
                        </label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {selectedPropertyData?.unitAmount || "N/A"}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
