import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config.js"
import { Header } from "../../../components/admin/Header.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { TextField } from "../../../components/common/TextField.jsx";
import { PasswordField } from "../../../components/common/PasswordField.jsx";

export const AdminSingleUserManagement = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});

    const getFirebaseToken = () => {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const token = await user.getIdToken();
                    resolve(token);
                } else {
                    reject("No Firebase user logged in");
                }
            });
        });
    };

    const fetchUser = async () => {
        try {
            const token = await getFirebaseToken();
            const res = await fetch(`http://localhost:5500/api/user/get-profile/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error("Failed to fetch user data");
            const data = await res.json();


            // console.log(data.data.status)
            setUser({
                firebaseId: data.data.firebaseId,
                name: data.data.name,
                email: data.data.email,
                role: data.data.role,
                status: data.data.status,
                profilePic: data.data.profileImageUrl,
                createdAt: data.data.createdAt,
                updatedAt: data.data.createdAt,
            })
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);



    const getStatusIcon = (status) => {
        switch (status) {
            case 'ACTIVE': return <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-[9px] font-bold">{status}</div>;
            case 'INACTIVE': return <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-[9px] font-bold">{status}</div>;
            default: return null;
        }
    };

    if (loading) {
        return <div className="text-center mt-20 text-gray-500 dark:text-gray-300">Loading user details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    }

    if (!user) {
        return <div className="text-center mt-20 text-gray-500">User not found.</div>;
    }

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">User Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Keep track of all registered users and ensure a secure platform experience.</p>
            </section>

            <section className="w-full mt-8 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="dark:text-white text-[18px] font-light">Profile Details</h1>
                    </div>
                    <div>
                        <Button red="red" children="Deactivate Account" />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-5 items-center">
                        <div className="flex-shrink-0 h-24 w-24 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden border-blue-300 dark:border-blue-900 border-2">
                            {user.profilePic ? (
                                <img src={user.profilePic} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-blue-600 dark:text-blue-300 font-medium">
                                {user.name.charAt(0)}
                            </span>
                            )}
                        </div>

                    </div>

                    <div className="text-end flex flex-col gap-[5px]">
                        <p className="text-gray-400 dark:text-gray-500 text-[12px]">Created At: <span className="text-black dark:text-white">{user.createdAt}</span></p>
                        <p className="text-gray-400 dark:text-gray-500 text-[12px]">Updated At: <span className="text-black dark:text-white">{user.updatedAt}</span></p>
                        <div className="flex items-center gap-3 justify-end">
                            <p className="text-gray-400 dark:text-gray-500 text-[12px]">Status:</p>
                            <div className="flex items-center">
                                {getStatusIcon(user.status)}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-full h-[1px] bg-gray-100 dark:bg-gray-700 mt-8 mb-8"></div>

                <div>
                    <div>
                        <TextField label="Name" placeholder={user.name} />
                    </div>

                    <div className="flex items-center gap-5 mt-5">
                        <div className="w-full">
                            <TextField label="Display Name" placeholder={user.name} />
                        </div>
                        <div className="w-full">
                            <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Registered Country</label>
                            <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                                {user.email}
                            </div>
                        </div>
                    </div>

                </div>

            </section>


            <section className="w-full mt-5 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <h1 className="dark:text-white text-[18px] font-light">Change Password</h1>

                <div>
                    <div className="flex items-center gap-5 mt-6">
                        <div className="w-full">
                            <PasswordField label="Current Password" placeholder="Enter current password" />
                        </div>
                        <div className="w-full"></div>
                    </div>

                    <div className="flex items-center gap-5 mt-1">
                        <div className="w-full">
                            <PasswordField label="New Password" placeholder="Enter new password" />
                        </div>
                        <div className="w-full">
                            <PasswordField label="Confirm Password" placeholder="Re-enter password" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                        <div className="w-36">
                            <Button children="Change Password" />
                        </div>
                        <div className="w-16">
                            <Button children="Clear" bgColor="#999999" hoverColor="#888888" />
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};
