import React, {useState} from "react";
import {SearchField} from "../../../components/common/SearchField.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {Header} from "../../../components/admin/Header.jsx";
import {useNavigate} from "react-router-dom";
import {AdminSponsorshipTable} from "./AdminSponsorshipTable.jsx";

export const AdminSponsorshipManagement = () => {

    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        searchTerm: '',
    });

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
    };

    const handleClear = () => {
        setFilters({
            searchTerm: '',
        });
    };


    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Sponsorship Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Keep your properties at teh top notch of the system and sell them as soon as possible.</p>
            </section>

            <section className="w-full mt-8 h-24 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex gap-5 items-center px-6">
                <div className="w-full">
                    <SearchField
                        placeholder="Search by property name..."
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="w-52">
                    <Button onclick={() => handleClear()}>Clear Filters</Button>
                </div>
            </section>

            <section className="w-full mt-5 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex flex-col">
                <div className="py-4 px-2 ml-3 mr-3 text-[12px] flex justify-between">
                    <div className="dark:text-white/50 text-black/50 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-[3px] cursor-pointer flex items-center justify-center">Export Details</div>
                </div>
                <AdminSponsorshipTable filters={filters} />
            </section>
        </main>
    )
}