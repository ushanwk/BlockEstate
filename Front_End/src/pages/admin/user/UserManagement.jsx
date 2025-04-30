import { useState,useRef } from 'react';
import { Header } from "../../../components/admin/Header.jsx";
import { SearchField } from "../../../components/common/SearchField.jsx";
import { ComboBox } from "../../../components/common/ComboBox.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { UsersTable } from "./UsersTable.jsx";

export const UserManagement = () => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        role: null,
        status: null
    });

    // Create refs for the ComboBox components
    const roleComboBoxRef = useRef(null);
    const statusComboBoxRef = useRef(null);

    const roleOptions = [
        { value: null, label: 'All Roles' },
        { value: 'Admin', label: 'Admin' },
        { value: 'Agency', label: 'Agency' },
        { value: 'Investor', label: 'Investor' }
    ];

    const statusOptions = [
        { value: null, label: 'All Statuses' },
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

    const handleClear = () => {
        setFilters({
            searchTerm: '',
            role: null,
            status: null
        });

        if (roleComboBoxRef.current) {
            roleComboBoxRef.current.reset();
        }
        if (statusComboBoxRef.current) {
            statusComboBoxRef.current.reset();
        }
    };

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">User Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Keep track of all registered users and ensure a secure platform experience.</p>
            </section>

            <section className="w-full mt-8 h-24 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 flex gap-5 items-center px-6">
                <div className="w-full">
                    <SearchField
                        placeholder="Search by name or email..."
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="w-64">
                    <ComboBox
                        ref={roleComboBoxRef}
                        placeholder="Filter by role"
                        options={roleOptions}
                        value={filters.role}
                        onChange={handleRoleChange}
                    />
                </div>
                <div className="w-64">
                    <ComboBox
                        ref={statusComboBoxRef}
                        placeholder="Filter by status"
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
                <UsersTable filters={filters} />
            </section>
        </main>
    )
}