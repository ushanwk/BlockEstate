import React, { useState, useEffect } from 'react';
import {
    Home, MapPin, Layers, DollarSign,
    Ruler, Edit, Trash2, ChevronLeft,
    ChevronRight, Loader2, Search, Eye
} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "sonner";

export const AdminPropertyTable = ({ filters }) => {
    const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 5;
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('http://localhost:5500/api/property/getAll');
                setAllProperties(response.data);
            } catch (err) {
                console.error("Failed to fetch properties:", err);
                setError("Failed to load properties. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);


    // Filter properties based on filters from parent
    const filteredProperties = allProperties.filter(property => {
        const nameMatch = property.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const countryMatch = !filters.country || property.country === filters.country;
        const priceMatch =
            (!filters.minPrice || property.blockPrice >= filters.minPrice) &&
            (!filters.maxPrice || property.blockPrice <= filters.maxPrice);

        return nameMatch && countryMatch && priceMatch;
    });

    // Pagination calculations
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters.searchTerm, filters.country, filters.minPrice, filters.maxPrice]);


    const handleEdit = (propertyId) => {
        navigate(`${propertyId}`);
    };

    const handleDelete = async (propertyId) => {
        try {
            const response = await axios.delete(`http://localhost:5500/api/property/delete/${propertyId}`);

            toast.success("Successfully Deleted", {
                description: "Property Deleted successfully",
            });

            window.location.reload();
        } catch (error) {
            console.error('Error deleting property:', error.response?.data || error.message);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage, endPage;

        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

            if (currentPage <= maxPagesBeforeCurrent) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrent;
                endPage = currentPage + maxPagesAfterCurrent;
            }
        }

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) pageNumbers.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }

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
                            <Home className="h-4 w-4 mr-2" /> Property
                        </div>
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <Layers className="h-4 w-4 mr-2" /> Total Blocks
                        </div>
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" /> Block Price
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" /> Country
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <Ruler className="h-4 w-4 mr-2" /> Size
                        </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#5D5D65]">
                {loading ? (
                    <tr>
                        <td colSpan="5" className="px-6 py-8 text-center">
                            <div className="flex justify-center items-center space-x-2">
                                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                <span className="text-gray-500 dark:text-gray-400">Loading Properties...</span>
                            </div>
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="8" className="px-6 py-4 text-center text-sm text-red-500">
                            Error: {error}
                        </td>
                    </tr>
                ) : currentProperties.length > 0 ? (
                    currentProperties.map(property => (
                        <tr key={property.id} className="hover:bg-gray-100/60 dark:hover:bg-blue-900/20">
                            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden">
                                    <span className="text-blue-600 dark:text-blue-300 font-medium">
                                        {property.name.charAt(0)}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {property.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-left pl-20 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {property.totalBlocks}
                            </td>
                            <td className="px-6 py-4 text-left pl-12 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                ${property.blockPrice.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-center pl-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {property.country}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {property.city}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                <div className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-green-800 dark:bg-green-900 dark:text-blue-200">
                                    {property.size}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEdit(property.id)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        title="Edit"
                                    >
                                        <Eye className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(property.id)}
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
                        <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center justify-center space-y-2">
                                <Search className="h-4 w-4 text-gray-400" />
                                <span>No properties found matching your criteria</span>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {!loading && !error && filteredProperties.length > 0 && (
                <div className="flex items-center justify-between px-6 py-3 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-[#5D5D65]">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Showing {indexOfFirstProperty + 1} to {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} properties
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