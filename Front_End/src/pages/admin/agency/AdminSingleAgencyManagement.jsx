import {useParams} from "react-router-dom";
import {Header} from "../../../components/admin/Header.jsx";
import {Button} from "../../../components/common/Button.jsx";
import React, {useEffect, useState} from "react";
import {TextField} from "../../../components/common/TextField.jsx";
import {PasswordField} from "../../../components/common/PasswordField.jsx";
import { ScrollText, HardDriveDownload } from "lucide-react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../../firebase/firebase.config.js";
import axios from "axios";
import {toast} from "sonner";


export const AdminSingleAgencyManagement = () => {

    const { agencyId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [agency, setAgency] = useState({});


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
        try{
            const token = await getFirebaseToken();
            const userId = agencyId;

            const res = await fetch(`http://localhost:5500/api/user/get-profile/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error("Failed to fetch user data");
            const data = await res.json();

            setAgency({
                id: data.data.firebaseId,
                name: data.data.name,
                email: data.data.email,
                propertyCount: 24,
                status: data.data.extra.approveStatus,
                country: data.data.extra.country,
                logo: data.data.profileImageUrl,
                tin: data.data.extra.tinNumber,
            })
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect( () => {
        fetchUser();
        console.log(agency)
    },[agencyId])


    const updateAgencyStatus = async (newStatus) => {
        try {
            const userId = agencyId;

            const res = await axios.patch(`http://localhost:5500/api/user/update-agency-status/${userId}`, {
                status: newStatus,
            });

            if (res.status === 200) {
                setAgency((prev) => ({ ...prev, status: newStatus }));
                toast.success("Successfully Updated", {
                    description: "Successfully updated agency status",
                });
            }
        } catch (err) {
            console.error("Failed to update agency status", err);
            toast.error("Error in updating", err, {
                description: "Error updating agency status",
            });
        }
    };



    const getStatusIcon = (status) => {
        switch (status) {
            case 'APPROVED': return  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-[9px] font-bold">{status}</div>;
            case 'PENDING': return <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-[9px] font-bold">{status}</div>;
            case 'REJECTED': return <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-[9px] font-bold">{status}</div>;
            default: return null;
        }
    };

    if (loading) {
        return <div className="text-center mt-20 text-gray-500 dark:text-gray-300">Loading user details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    }

    if (!agency) {
        return <div className="text-center mt-20 text-gray-500">User not found.</div>;
    }

    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Agency Management</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Keep the platform secure with verified agencies. Efficiently manage agency registrations.</p>
            </section>

            <section className="w-full mt-8 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="dark:text-white text-[18px] font-light">Profile Details</h1>
                    </div>
                    {
                        agency.status === "PENDING" ? (
                            <div className="flex items-center gap-3">
                                <div className="w-24">
                                    <Button red="red" children="Reject" onclick={() => {
                                        updateAgencyStatus("REJECTED")}} />
                                </div>
                                <div className="w-24">
                                    <Button green="green" children="Approve" onclick={() => {
                                        updateAgencyStatus("APPROVED")}} />
                                </div>
                            </div>
                        ):null
                    }

                    {
                        agency.status === "APPROVED" ? (
                            <div className="flex items-center gap-3">
                                <div className="w-24">
                                    <Button red="red" children="Reject" onclick={() => {
                                        updateAgencyStatus("REJECTED")}} />
                                </div>
                            </div>
                        ):null
                    }

                    {
                        agency.status === "REJECTED" ? (
                            <div className="flex items-center gap-3">
                                <div className="w-24">
                                    <Button green="green" children="Approve" onclick={() => {
                                        updateAgencyStatus("APPROVED")}} />
                                </div>
                            </div>
                        ):null
                    }

                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-5 items-center">
                        <div className="flex-shrink-0 h-24 w-24 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden border-blue-300 dark:border-blue-900 border-2">
                            {agency.logo ? (
                                <img src={agency.logo} alt={agency.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-blue-600 dark:text-blue-300 font-medium">
                                {agency.name.charAt(0)}
                            </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                                <Button children="Upload a new photo" />
                            </div>
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 text-[8px]">SVG, PNG, JPG or GIF (max 800x800px)</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-end flex flex-col gap-[5px]">
                        <p className="text-gray-400 dark:text-gray-500 text-[12px]">Created At: <span className="text-black dark:text-white">24/12/2024</span></p>
                        <p className="text-gray-400 dark:text-gray-500 text-[12px]">Updated At: <span className="text-black dark:text-white">24/03/2025</span></p>
                        <div className="flex items-center gap-3 justify-end">
                            <p className="text-gray-400 dark:text-gray-500 text-[12px]">Status:</p>
                            <div className="flex items-center">
                                {getStatusIcon(agency.status)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gray-100 dark:bg-gray-700 mt-8 mb-8"></div>

                <div>
                    <div>
                        <TextField label="Agency Name" placeholder={agency.name} />
                    </div>

                    <div className="flex items-center gap-5 mt-5">
                        <div className="w-full">
                            <TextField label="Contact Person Name" placeholder={agency.name} />
                        </div>
                        <div className="w-full">
                            <label className="block text-[13px] mt-[-12px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Registered Country</label>
                            <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                                {agency.email}
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className="w-full mt-5 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 items-center px-8 py-6">
                <h1 className="dark:text-white text-[18px] font-light">Approval Details</h1>

                <div className="flex items-center gap-5 mt-6">
                    <div className="w-full">
                        <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Registered Country</label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {agency.country}
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Registered Country</label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-[#5D5D65] border-[#D9D9D9] dark:font-extralight bg-gray-200 dark:bg-gray-700">
                            {agency.tin}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-5 mt-6">
                    <div className="w-full">
                        <label className="block text-[13px] mb-2 text-left dark:text-[#ffffff] dark:font-extralight">Business Registration</label>
                        <div className="w-full p-2 text-[12px] rounded-[5px] dark:text-[#ffffff] border dark:border-blue-700/50 border-blue-300 dark:font-extralight bg-blue-100 dark:bg-blue-950/40 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ScrollText className="w-4 h-4 dark:text-white" />
                                <p className="text-[12px] dark:text-white">{agency.name}</p>
                            </div>

                            <div className="cursor-pointer">
                                <HardDriveDownload className="w-4 h-4 dark:text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full"></div>
                </div>
            </section>

        </main>
    )
}