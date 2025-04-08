import {Header} from "../../../components/admin/Header.jsx";
import {SearchField} from "../../../components/common/SearchField.jsx";
import {ComboBox} from "../../../components/common/ComboBox.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {useRef, useState} from "react";
import {AgenciesTable} from "./AgenciesTable.jsx";
import {CountryComboBox} from "../../../components/common/CountryComboBox.jsx";

export const AgenciesManagement = () => {

    const [filters, setFilters] = useState({
        searchTerm: '',
        country: null,
        status: null
    });

    // Create refs for the ComboBox components
    const countryComboBoxRef = useRef(null);
    const statusComboBoxRef = useRef(null);

    const statusOptions = [
        { value: null, label: 'All Statuses' },  // Null value for "All" option
        { value: 'Approved', label: 'Approved' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Rejected', label: 'Rejected' }
    ];

    const handleSearchChange = (e) => {
        setFilters({ ...filters, searchTerm: e.target.value });
    };

    const handleCountryChange = (value) => {
        setFilters({ ...filters, country: value });
    };

    const handleStatusChange = (value) => {
        setFilters({ ...filters, status: value });
    };

    const handleClear = () => {
        setFilters({
            searchTerm: '',
            country: null,
            status: null
        });

        if (countryComboBoxRef.current) {
            countryComboBoxRef.current.reset();
        }
        if (statusComboBoxRef.current) {
            statusComboBoxRef.current.reset();
        }
    };

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Agency Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Keep the platform secure with verified agencies. Efficiently manage agency registrations.</p>
            </section>

            <section className="w-full mt-8 h-24 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex gap-5 items-center px-6">
                <div className="w-full">
                    <SearchField
                        placeholder="Search by agency name..."
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="w-64">
                    <CountryComboBox
                        ref={countryComboBoxRef}
                        placeholder="Country"
                        value={filters.country}
                        onChange={handleCountryChange}
                    />
                </div>
                <div className="w-64">
                    <ComboBox
                        ref={statusComboBoxRef}
                        placeholder="Status"
                        options={statusOptions}
                        value={filters.status}
                        onChange={handleStatusChange}
                    />
                </div>
                <div className="w-64">
                    <Button onclick={() => handleClear()}>Clear Filters</Button>
                </div>
            </section>

            <section className="w-full mt-5 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex flex-col">
                <div className="py-4 px-2 ml-3 mr-3 text-[12px] flex justify-between">
                    <div className="dark:text-white/50 text-black/50 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-[3px] cursor-pointer">Export Details</div>
                </div>
                <AgenciesTable filters={filters} />
            </section>
        </main>
    )
}