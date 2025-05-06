import { useState, useRef } from 'react';
import { Header } from "../../../components/agency/Header.jsx";
import { SearchField } from "../../../components/common/SearchField.jsx";
import { ComboBox } from "../../../components/common/ComboBox.jsx";
import { CountryComboBox } from "../../../components/common/CountryComboBox.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { AdminPropertyTable } from "./AdminPropertyTable.jsx";
import {useNavigate} from "react-router-dom";

export const AdminPropertyManagement = () => {

    const navigate = useNavigate();


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

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Property Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Manage all properties, view details, and update listings as needed.</p>
            </section>

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
                </div>
                <AdminPropertyTable filters={filters} />
            </section>
        </main>
    )
}