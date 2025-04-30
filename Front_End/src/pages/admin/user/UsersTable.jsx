import React, { useEffect, useState } from 'react';
import {
    User, Mail, Shield, CheckCircle,
    XCircle, Clock, Edit, Trash2,
    ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase.config.js";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

export const UsersTable = ({ filters }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

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

                const token = await user.getIdToken();

                const response = await axios.get("http://localhost:5500/api/user/get-all-users", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success && Array.isArray(response.data.data)) {
                    const transformedUsers = response.data.data.map((user) => ({
                        id: user.firebaseId,
                        name: user.displayName || 'No name',
                        email: user.email || 'No email',
                        role: user.role
                            ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
                            : 'No role',
                        status: user.isActive
                            ? user.isActive.charAt(0).toUpperCase() + user.isActive.slice(1).toLowerCase()
                            : 'Inactive',
                        profilePic: user.profileImageUrl,
                    }));

                    setAllUsers(transformedUsers);
                } else {
                    throw new Error("Invalid API response format");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error.message || "Failed to load users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters.searchTerm, filters.role, filters.status]);

    const filteredUsers = allUsers.filter(user => {
        const searchMatch =
            user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const roleMatch = !filters.role || user.role === filters.role;
        const statusMatch = !filters.status || user.status === filters.status;
        return searchMatch && roleMatch && statusMatch;
    });

    // Pagination calculations
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Active': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'Inactive': return <XCircle className="h-4 w-4 text-red-500" />;
            default: return null;
        }
    };

    const handleEdit = (userId) => navigate(`${userId}`);
    const handleDelete = (userId) => console.log(`Delete user ${userId}`);
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
                            <User className="h-4 w-4 mr-2" /> User
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" /> Email
                        </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9CA3AF] uppercase tracking-wider">
                        <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2" /> Role
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
                {loading ? (
                    <tr>
                        <td colSpan="5" className="px-6 py-8 text-center">
                            <div className="flex justify-center items-center space-x-2">
                                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                <span className="text-gray-500 dark:text-gray-400">Loading users...</span>
                            </div>
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-red-500">
                            Error: {error}
                        </td>
                    </tr>
                ) : currentUsers.length > 0 ? (
                    currentUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-100/60 dark:hover:bg-blue-900/20">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden">
                                        {user.profilePic ? (
                                            <img src={user.profilePic} alt={user.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-blue-600 dark:text-blue-300 font-medium">
                          {user.name.charAt(0)}
                        </span>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      user.role === 'Agency' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                    {user.role}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {getStatusIcon(user.status)}
                                    <span className="ml-2 text-sm text-gray-900 dark:text-gray-200">
                      {user.status}
                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEdit(user.id)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        title="Edit"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
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
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            No users found matching your criteria
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {!loading && !error && filteredUsers.length > 0 && (
                <div className="flex items-center justify-between px-6 py-3 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-[#5D5D65]">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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