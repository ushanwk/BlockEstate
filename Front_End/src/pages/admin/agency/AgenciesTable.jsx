import React, {useEffect, useState} from 'react';
import { Building, Mail, Home, MapPin, CheckCircle, XCircle, Clock, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import {useNavigate} from "react-router-dom";

export const AgenciesTable = ({ filters }) => {
    const allAgencies = [
        {
            id: 1,
            name: 'Prime Realty',
            email: 'info@primerealty.com',
            propertyCount: 24,
            status: 'Approved',
            country: 'United States',
            logo: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=PR'
        },
        {
            id: 2,
            name: 'Urban Spaces',
            email: 'contact@urbanspaces.com',
            propertyCount: 15,
            status: 'Approved',
            country: 'Canada',
            logo: 'https://placehold.co/100x100/10B981/FFFFFF?text=US'
        },
        {
            id: 3,
            name: 'Coastal Homes',
            email: 'support@coastalhomes.com',
            propertyCount: 8,
            status: 'Pending',
            country: 'Australia',
            logo: 'https://placehold.co/100x100/F59E0B/FFFFFF?text=CH'
        },
        {
            id: 4,
            name: 'Metro Properties',
            email: 'hello@metroprops.com',
            propertyCount: 32,
            status: 'Approved',
            country: 'United Kingdom',
            logo: 'https://placehold.co/100x100/8B5CF6/FFFFFF?text=MP'
        },
        {
            id: 5,
            name: 'Summit Estates',
            email: 'admin@summitestates.com',
            propertyCount: 0,
            status: 'Rejected',
            country: 'United Arab Emirates',
            logo: 'https://placehold.co/100x100/EF4444/FFFFFF?text=SE'
        },
        {
            id: 6,
            name: 'Horizon Realty',
            email: 'team@horizonrealty.com',
            propertyCount: 18,
            status: 'Approved',
            country: 'United States',
            logo: 'https://placehold.co/100x100/0EA5E9/FFFFFF?text=HR'
        },
        {
            id: 7,
            name: 'Elite Properties',
            email: 'info@eliteprops.com',
            propertyCount: 12,
            status: 'Approved',
            country: 'Canada',
            logo: 'https://placehold.co/100x100/6366F1/FFFFFF?text=EP'
        },
        {
            id: 8,
            name: 'Golden Gate Realty',
            email: 'contact@goldengate.com',
            propertyCount: 27,
            status: 'Pending',
            country: 'United States',
            logo: 'https://placehold.co/100x100/F97316/FFFFFF?text=GG'
        },
        {
            id: 9,
            name: 'Paramount Estates',
            email: 'support@paramount.com',
            propertyCount: 5,
            status: 'Approved',
            country: 'United Kingdom',
            logo: 'https://placehold.co/100x100/EC4899/FFFFFF?text=PE'
        },
        {
            id: 10,
            name: 'Skyline Properties',
            email: 'hello@skylineprops.com',
            propertyCount: 21,
            status: 'Approved',
            country: 'Australia',
            logo: 'https://placehold.co/100x100/14B8A6/FFFFFF?text=SP'
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const agenciesPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPage(1);
    }, [filters.searchTerm, filters.country, filters.status]);

    const filteredAgencies = allAgencies.filter(agency => {
        const searchMatch = agency.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            agency.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const countryMatch = !filters.country || agency.country === filters.country;
        const statusMatch = !filters.status || agency.status === filters.status;
        return searchMatch && countryMatch && statusMatch;
    });

    // Pagination calculations
    const indexOfLastAgency = currentPage * agenciesPerPage;
    const indexOfFirstAgency = indexOfLastAgency - agenciesPerPage;
    const currentAgencies = filteredAgencies.slice(indexOfFirstAgency, indexOfLastAgency);
    const totalPages = Math.ceil(filteredAgencies.length / agenciesPerPage);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'Rejected': return <XCircle className="h-4 w-4 text-red-500" />;
            default: return null;
        }
    };

    const handleEdit = (agencyId) => {
        console.log(`Edit agency ${agencyId}`)
        navigate(`${agencyId}`);
    };

    const handleDelete = (agencyId) => console.log(`Delete agency ${agencyId}`);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (currentPage > 2) pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push('...');

        for (let i = Math.max(1, currentPage - 1);
             i <= Math.min(totalPages, currentPage + 1);
             i++) {
            pageNumbers.push(i);
        }

        if (currentPage < totalPages - 2) pageNumbers.push('...');
        if (currentPage < totalPages - 1) pageNumbers.push(totalPages);

        return pageNumbers.map((num, idx) => (
            num === '...' ? (
                <span key={idx} className="px-2">...</span>
            ) : (
                <button
                    key={idx}
                    onClick={() => paginate(num)}
                    className={`px-3 py-1 rounded ${currentPage === num
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white/50'}`}
                >
                    {num}
                </button>
            )
        ));
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-[#5D5D65]">
                <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2" /> Agency
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" /> Email
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" /> Country
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <Home className="h-4 w-4 mr-2" /> Properties
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#5D5D65]">
                {currentAgencies.length > 0 ? (
                    currentAgencies.map(agency => (
                        <tr key={agency.id} className="hover:bg-gray-100/60 dark:hover:bg-blue-900/20">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden">
                                        {agency.logo ? (
                                            <img src={agency.logo} alt={agency.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-blue-600 dark:text-blue-300 font-medium">
                                                {agency.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {agency.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {agency.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {agency.country}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {agency.propertyCount} {agency.propertyCount === 1 ? 'property' : 'properties'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {getStatusIcon(agency.status)}
                                    <span className="ml-2 text-sm text-gray-900 dark:text-gray-200">
                                        {agency.status}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEdit(agency.id)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        title="Edit"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(agency.id)}
                                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            No agencies found matching your criteria
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {filteredAgencies.length > 0 && (
                <div className="flex items-center justify-between px-6 py-3 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-[#5D5D65]">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Showing {indexOfFirstAgency + 1} to {Math.min(indexOfLastAgency, filteredAgencies.length)} of {filteredAgencies.length} agencies
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};