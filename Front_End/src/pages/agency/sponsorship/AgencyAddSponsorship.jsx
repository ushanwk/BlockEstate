import React, {useState, useEffect, useRef} from "react";
import { Header } from "../../../components/admin/Header.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { CalendarSelect } from "../../../components/common/CalenderSelect.jsx";
import {ComboBox} from "../../../components/common/ComboBox.jsx";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../../firebase/firebase.config.js";
import axios from "axios";

export const AgencyAddSponsorship = () => {

    const priceForDay = 20;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [propertyOptions, setPropertyOptions] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);


    // Helper to calculate the number of days between two dates
    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const diffTime = endTime - startTime;
        return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
    };

    // Watch for changes in dates and calculate total
    useEffect(() => {
        const days = calculateDays(startDate, endDate);
        setTotalPrice(days * priceForDay);
    }, [startDate, endDate]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const user = await new Promise((resolve, reject) => {
                    const unsubscribe = onAuthStateChanged(auth, (user) => {
                        unsubscribe();
                        if (user) resolve(user);
                        else reject("User not signed in");
                    });
                });

                const agencyId = user.uid;
                const response = await axios.get(`http://localhost:5500/api/property/getIdName/${agencyId}`);

                const formattedOptions = response.data.map(property => ({
                    label: property.name,
                    value: property
                }));

                setPropertyOptions(formattedOptions);
            } catch (err) {
                console.error("Failed to fetch properties:", err);
            }
        };


        fetchProperties();
    }, []);

    const propertyRef = useRef(null);


    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Add New Sponsorship</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">
                    Keep your properties at the top notch of the system and sell them.
                </p>
            </section>

            <section className="w-full mt-8 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="dark:text-white text-[18px] font-light">Sponsorship Details</h1>
                    </div>
                </div>

                <div className="mt-8">
                    <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                        Property
                    </label>
                    <ComboBox
                        ref={propertyRef}
                        options={propertyOptions}
                        value={selectedProperty}
                        onChange={(selected) => {
                            setSelectedProperty(selected);
                            console.log(selected);
                        }}
                        placeholder="Select a property"
                    />
                </div>

                {/* Calendar Inputs */}
                <div className="flex gap-3 mt-8 w-full">
                    <div className="w-full">
                        <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Starting Date
                        </label>
                        <CalendarSelect onChange={setStartDate} />
                    </div>

                    <div className="w-full">
                        <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">
                            Ending Date
                        </label>
                        <CalendarSelect onChange={setEndDate} />
                    </div>
                </div>

                {/* Price Summary */}
                <div className="w-full flex justify-start">
                    <div className="mt-8 w-full max-w-md rounded-2xl p-6">
                        <h2 className="text-lg text-gray-500 dark:text-gray-400 font-light">Price Summary</h2>

                        <div className="mt-4 border-t border-b py-4 flex flex-col gap-4 dark:border-white/20">
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-600 dark:text-gray-300 font-light">Price per day</span>
                                <span className="text-lg font-light text-gray-800 dark:text-white">${priceForDay}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-600 dark:text-gray-300 font-light">Total cost</span>
                                <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400">${totalPrice}</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button children="Continue to checkout" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
