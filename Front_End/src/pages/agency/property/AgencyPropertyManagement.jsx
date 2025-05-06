import React, {useState, useRef, useEffect} from 'react';
import { Header } from "../../../components/agency/Header.jsx";
import { SearchField } from "../../../components/common/SearchField.jsx";
import { ComboBox } from "../../../components/common/ComboBox.jsx";
import { CountryComboBox } from "../../../components/common/CountryComboBox.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { AgencyPropertyTable } from "./AgencyPropertyTable.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../../firebase/firebase.config.js";

export const AgencyPropertyManagement = () => {

    const navigate = useNavigate();

    const [status, setStatus] = useState("PENDING");


    const [filters, setFilters] = useState({
        searchTerm: '',
        country: null,
        minPrice: null,
        maxPrice: null,
        status: null
    });

    // Create refs for the ComboBox components
    const minPriceComboBoxRef = useRef(null);
    const maxPriceComboBoxRef = useRef(null);
    const statusComboBoxRef = useRef(null);


    const priceRangeOptions = [
        { value: null, label: 'Any' },
        { value: 100000, label: '$100,000' },
        { value: 250000, label: '$250,000' },
        { value: 500000, label: '$500,000' },
        { value: 750000, label: '$750,000' },
        { value: 1000000, label: '$1,000,000' },
        { value: 1500000, label: '$1,500,000' },
        { value: 2000000, label: '$2,000,000' }
    ];

    const handleSearchChange = (e) => {
        setFilters({ ...filters, searchTerm: e.target.value });
    };

    const handleCountryChange = (value) => {
        setFilters({ ...filters, country: value });
    };

    const handleMinPriceChange = (value) => {
        setFilters({ ...filters, minPrice: value });
    };

    const handleMaxPriceChange = (value) => {
        setFilters({ ...filters, maxPrice: value });
    };

    const handleStatusChange = (value) => {
        setFilters({ ...filters, status: value });
    };

    const handleClear = () => {
        setFilters({
            searchTerm: '',
            country: null,
            minPrice: null,
            maxPrice: null,
            status: null
        });

        if (minPriceComboBoxRef.current) {
            minPriceComboBoxRef.current.reset();
        }
        if (maxPriceComboBoxRef.current) {
            maxPriceComboBoxRef.current.reset();
        }
        if (statusComboBoxRef.current) {
            statusComboBoxRef.current.reset();
        }
    };

    useEffect(() => {
        getAgencyStatus().then((e) => {
            setStatus(e.approveStatus);
        });
    }, []);


    const getAgencyStatus = async () => {
        try {
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

            const firebaseId = user.uid;

            const response = await axios.get(
                `http://localhost:5500/api/user/get-agency-status/${firebaseId}`
            );
            return response.data;
        } catch (error) {
            console.error("Failed to fetch agency status:", error);
            throw error;
        }
    };

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Property Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Manage all properties, view details, and update listings as needed.</p>
            </section>

            {
                status === "PENDING" || status === "REJECTED" ? (
                    <div className="mt-10 p-6 bg-gradient-to-r from-red-100 via-red-200 to-red-100 border-l-4 border-red-500 text-red-800 rounded-lg shadow-md flex items-center gap-4">
                        <svg
                            className="w-6 h-6 text-red-600 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.85L21 18V6a2 2 0 00-1.85-1.995L19 4H5a2 2 0 00-1.995 1.85L3 6v12a2 2 0 001.85 1.995L5 20z" />
                        </svg>
                        <p className="text-base font-medium">
                            You cannot add any property until your agency profile is approved by the system admin.
                        </p>
                    </div>

                ):(
                    <div>
                        <section className="w-full mt-8 h-24 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex gap-5 items-center px-6">
                            <div className="w-full">
                                <SearchField
                                    placeholder="Search by property name..."
                                    value={filters.searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="w-64">
                                <CountryComboBox
                                    value={filters.country}
                                    onChange={handleCountryChange}
                                    placeholder="Filter by country"
                                />
                            </div>
                            <div className="w-48">
                                <ComboBox
                                    ref={minPriceComboBoxRef}
                                    placeholder="Min price"
                                    options={priceRangeOptions}
                                    value={filters.minPrice}
                                    onChange={handleMinPriceChange}
                                />
                            </div>
                            <div className="w-48">
                                <ComboBox
                                    ref={maxPriceComboBoxRef}
                                    placeholder="Max price"
                                    options={priceRangeOptions}
                                    value={filters.maxPrice}
                                    onChange={handleMaxPriceChange}
                                />
                            </div>
                            <div className="w-64">
                                <Button onclick={() => handleClear()}>Clear Filters</Button>
                            </div>
                        </section>

                        <section className="w-full mt-5 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex flex-col">
                            <div className="py-4 px-2 ml-3 mr-3 text-[12px] flex justify-between">
                                <div className="dark:text-white/50 text-black/50 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-[3px] cursor-pointer flex items-center justify-center">Export Details</div>

                                <div className="w-36">
                                    <Button green="green" children="Add New Property" onclick={()=>{navigate('add')}} />
                                </div>
                            </div>
                            <AgencyPropertyTable filters={filters} />
                        </section>
                    </div>
                )
            }
        </main>
    )
}