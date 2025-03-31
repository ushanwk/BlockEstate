import { useState } from 'react';
import { Header } from "../../../components/admin/Header.jsx";
import { SearchField } from "../../../components/common/SearchField.jsx";
import { ComboBox } from "../../../components/common/ComboBox.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { UsersTable } from "./UsersTable.jsx";

export const UserManagement = () => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        role: null,  // Changed to null for clearer "empty" state
        status: null
    });

    const roleOptions = [
        { value: null, label: 'All Roles' },  // Changed to null
        { value: 'Admin', label: 'Admin' },
        { value: 'Estate Agency', label: 'Estate Agency' },
        { value: 'Investor', label: 'Investor' }
    ];

    const statusOptions = [
        { value: null, label: 'All Statuses' },  // Changed to null
        { value: 'Active', label: 'Active' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Inactive', label: 'Inactive' }
    ];

    const handleSearchChange = (e) => {
        setFilters({ ...filters, searchTerm: e.target.value });
    };

    const handleRoleChange = (value) => {
        setFilters({ ...filters, role: value });
    };

    const handleStatusChange = (value) => {
        setFilters({ ...filters, status: value });
    };

    const handleSearch = () => {
        // Force update (value already set via onChange)
        setFilters({ ...filters });
    };

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">User Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Keep track of all registered users.</p>
            </section>

            <section className="w-full mt-8 h-24 rounded-[5px] bg-white dark:bg-[#1E1E24] border border-[#D9D9D9] dark:border-[#5D5D65] flex gap-5 items-center px-6">
                <div className="w-full">
                    <SearchField
                        placeholder="Search by name or email..."
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="w-64">
                    <ComboBox
                        placeholder="Filter by role"
                        options={roleOptions}
                        value={filters.role}
                        onChange={handleRoleChange}
                    />
                </div>
                <div className="w-64">
                    <ComboBox
                        placeholder="Filter by status"
                        options={statusOptions}
                        value={filters.status}
                        onChange={handleStatusChange}
                    />
                </div>
                <div className="w-64">
                    <Button onClick={handleSearch}>Apply Filters</Button>
                </div>
            </section>

            <section className="w-full mt-5 rounded-[5px] bg-white dark:bg-[#1E1E24] border border-[#D9D9D9] dark:border-[#5D5D65] flex flex-col">
                <UsersTable filters={filters} />
            </section>
        </main>
    )
}