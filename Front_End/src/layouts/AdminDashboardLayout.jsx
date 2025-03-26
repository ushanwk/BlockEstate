import ColorLogoBar from "../assets/icons/common/LogoBarColor.png";
import {useEffect, useState} from "react";
import DashboardBlack from "../assets/icons/admin/DasboardBlack.png";
import DashboardBlue from "../assets/icons/admin/DasboardBlue.png";
import UserBlack from "../assets/icons/admin/UserBlack.png";
import UserBlue from "../assets/icons/admin/UserBlue.png";
import PropertyBlack from "../assets/icons/admin/PropertyBlack.png";
import PropertyBlue from "../assets/icons/admin/PropertyBlue.png";
import AgencyBlack from "../assets/icons/admin/AgencyBlack.png";
import AgencyBlue from "../assets/icons/admin/AgencyBlue.png";
import ResaleBlack from "../assets/icons/admin/ResaleBlack.png";
import ResaleBlue from "../assets/icons/admin/ResaleBlue.png";
import TransactionBlack from "../assets/icons/admin/TransactionBlack.png";
import TransactionBlue from "../assets/icons/admin/TransactionBlue.png";
import SponsorBlack from "../assets/icons/admin/SponsoredBlack.png";
import SponsorBlue from "../assets/icons/admin/SponsoredBlue.png";
import AnalyticsBlack from "../assets/icons/admin/AnalyticsBlack.png";
import AnalyticsBlue from "../assets/icons/admin/AnalyticsBlue.png";
import SettingsBlack from "../assets/icons/admin/SettingBlack.png";
import SettingsBlue from "../assets/icons/admin/SettingBlue.png";
import ProfileBlack from "../assets/icons/admin/ProfileBlack.png";
import ProfileBlue from "../assets/icons/admin/ProfileBlue.png";

export const AdminDashboardLayout = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    const images = {
        dashboard: 'src/assets/images/admin/DashboardBg.png',
        user: 'src/assets/images/admin/UserBg.png',
        property: 'src/assets/images/admin/PropertyBg.png',
        agency: 'src/assets/images/admin/AgencyBg.png',
        sponsored: 'src/assets/images/admin/SponseredBg.png',
    };


    // Time //////////////////////////////////////////////
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    };

    const getGreeting = () => {
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) return "Good Morning";
        if (hour >= 12 && hour < 18) return "Good Afternoon";
        return "Good Evening";
    };
    // Time //////////////////////////////////////////////


    return (
        <main className="w-[100vw] h-[100vh] flex bg-cover bg-center bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)]">
            <div className="h-full w-[15%] bg-white flex flex-col  items-center py-10 px-6">
                <img src={ColorLogoBar} alt="Color Logo" className="w-36" />

                <div className="w-full flex flex-col gap-5 mt-24">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "dashboard" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <img src={DashboardBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "dashboard" ? "hidden":"block"}`}/>
                        <img src={DashboardBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "dashboard" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "dashboard" ? "text-[var(--color-primary)]" : "text-black"}`}>Dashboard</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "user" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)] " : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("user")}
                    >
                        <img src={UserBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "user" ? "hidden":"block"}`}/>
                        <img src={UserBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "user" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "user" ? "text-[var(--color-primary)]" : "text-black"}`}>User Management</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "property" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("property")}
                    >
                        <img src={PropertyBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "property" ? "hidden":"block"}`}/>
                        <img src={PropertyBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "property" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "property" ? "text-[var(--color-primary)]" : "text-black"}`}>Property Management</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md  cursor-pointer 
                        ${activeTab === "agency" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("agency")}
                    >
                        <img src={AgencyBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "agency" ? "hidden":"block"}`}/>
                        <img src={AgencyBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "agency" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "agency" ? "text-[var(--color-primary)]" : "text-black"}`}>Agency Management</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "resale" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("resale")}
                    >
                        <img src={ResaleBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "resale" ? "hidden":"block"}`}/>
                        <img src={ResaleBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "resale" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "resale" ? "text-[var(--color-primary)]" : "text-black"}`}>Resale Listings</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "transaction" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("transaction")}
                    >
                        <img src={TransactionBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "transaction" ? "hidden":"block"}`}/>
                        <img src={TransactionBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "transaction" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "transaction" ? "text-[var(--color-primary)]" : "text-black"}`}>Transaction Details</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "sponsored" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("sponsored")}
                    >
                        <img src={SponsorBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "sponsored" ? "hidden":"block"}`}/>
                        <img src={SponsorBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "sponsored" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "sponsored" ? "text-[var(--color-primary)]" : "text-black"}`}>Sponsored Ads</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "analytic" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("analytic")}
                    >
                        <img src={AnalyticsBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "analytic" ? "hidden":"block"}`}/>
                        <img src={AnalyticsBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "analytic" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "analytic" ? "text-[var(--color-primary)]" : "text-black"}`}>Analytics & Reports</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "setting" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("setting")}
                    >
                        <img src={SettingsBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "setting" ? "hidden":"block"}`}/>
                        <img src={SettingsBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "setting" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "setting" ? "text-[var(--color-primary)]" : "text-black"}`}>System Settings</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "profile" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <img src={ProfileBlack} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "profile" ? "hidden":"block"}`}/>
                        <img src={ProfileBlue} alt="Dasboard Black" className={`w-[16px] pb-[1px] ${activeTab === "profile" ? "block":"hidden"}`}/>
                        <p className={`${activeTab === "profile" ? "text-[var(--color-primary)]" : "text-black"}`}>Profile Management</p>
                    </div>
                </div>

            </div>

            <div className="h-full w-[70%]">

            </div>

            <div className="h-full w-[15%] bg-[var(--color-dark-bg-secondary)]">
                <div
                    className="w-full h-2/3 bg-cover flex flex-col items-center py-10"
                    style={{ backgroundImage: `url(${images[activeTab] || 'src/assets/images/admin/DashboardBg.png'})` }}
                >
                    <p className="text-white font-light drop-shadow-sm">Willing a</p>
                    <p className="text-[25px] text-white drop-shadow-sm">{getGreeting()}</p>
                    <h1 className="text-[70px] text-white font-medium mt-[-15px] drop-shadow-sm">{formatTime(time)}</h1>
                </div>
            </div>
        </main>
    )
}