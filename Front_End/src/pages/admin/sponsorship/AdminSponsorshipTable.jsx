import React, {useEffect, useState} from 'react';
import { Eye, ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../../firebase/firebase.config.js";

export const AdminSponsorshipTable = () => {
    const [sponsorships, setSponsorships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const sponsorshipsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSponsorships = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:5500/api/sponsorship/agency`, {
                    method: 'GET',
                });

                const data = await response.json();
                if (response.ok) {
                    setSponsorships(data);
                } else {
                    setError(data.message || 'Failed to fetch sponsorships');
                }
            } catch (error) {
                console.error('Error fetching sponsorships:', error);
                setError('Error fetching sponsorships. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSponsorships();
    }, []);

    // Pagination calculations
    const indexOfLastSponsorship = currentPage * sponsorshipsPerPage;
    const indexOfFirstSponsorship = indexOfLastSponsorship - sponsorshipsPerPage;
    const currentSponsorships = sponsorships.slice(indexOfFirstSponsorship, indexOfLastSponsorship);
    const totalPages = Math.ceil(sponsorships.length / sponsorshipsPerPage);

    const handleView = (sponsorshipId) => {
        navigate(`/sponsorships/${sponsorshipId}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

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
                        Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        Starting Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        Ending Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        Amount Paid
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
                {loading ? (
                    <tr>
                        <td colSpan="6" className="px-6 py-8 text-center">
                            <div className="flex justify-center items-center space-x-2">
                                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                <span className="text-gray-500 dark:text-gray-400">Loading Sponsorships...</span>
                            </div>
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-red-500">
                            Error: {error}
                        </td>
                    </tr>
                ) : sponsorships.length > 0 ? (
                    currentSponsorships.map(sponsorship => (
                        <tr key={sponsorship._id} className="hover:bg-gray-100/60 dark:hover:bg-blue-900/20">
                            <td className="px-6 py-4 whitespace-nowrap flex gap-3 items-center ">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden">
                                    <span className="text-blue-600 dark:text-blue-300 font-medium">
                                        {sponsorship.propertyName.charAt(0)}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {sponsorship.propertyName}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {formatDate(sponsorship.startingDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {formatDate(sponsorship.endingDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                ${sponsorship.amountPaid.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${sponsorship.status === 'RUNNING'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                    {sponsorship.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleView(sponsorship._id)}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                    title="View"
                                >
                                    <Eye className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center justify-center space-x-2">
                                <Search className="h-4 w-4 text-gray-400" />
                                <span>No sponsorships found</span>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {!loading && !error && sponsorships.length > 0 && (
                <div className="flex items-center justify-between px-6 py-3 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-[#5D5D65]">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Showing {indexOfFirstSponsorship + 1} to {Math.min(indexOfLastSponsorship, sponsorships.length)} of {sponsorships.length} sponsorships
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