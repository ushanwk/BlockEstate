import ColorLogoBar from "../assets/icons/common/LogoBarColor.png";
import {useEffect, useState} from "react";
import DashboardBlack from "../assets/icons/admin/common/DasboardBlack.png";
import DashboardBlue from "../assets/icons/admin/common/DasboardBlue.png";
import DashboardWhite from "../assets/icons/admin/common/DashboardWhite.png";
import UserBlack from "../assets/icons/admin/common/UserBlack.png";
import UserBlue from "../assets/icons/admin/common/UserBlue.png";
import UserWhite from "../assets/icons/admin/common/UserWhite.png";
import PropertyBlack from "../assets/icons/admin/common/PropertyBlack.png";
import PropertyBlue from "../assets/icons/admin/common/PropertyBlue.png";
import PropertyWhite from "../assets/icons/admin/common/PropertyWhite.png";
import AgencyBlack from "../assets/icons/admin/common/AgencyBlack.png";
import AgencyBlue from "../assets/icons/admin/common/AgencyBlue.png";
import AgencyWhite from "../assets/icons/admin/common/AgencyWhite.png";
import ResaleBlack from "../assets/icons/admin/common/ResaleBlack.png";
import ResaleBlue from "../assets/icons/admin/common/ResaleBlue.png";
import ResaleWhite from "../assets/icons/admin/common/ResaleWhite.png";
import TransactionBlack from "../assets/icons/admin/common/TransactionBlack.png";
import TransactionBlue from "../assets/icons/admin/common/TransactionBlue.png";
import TransactionWhite from "../assets/icons/admin/common/TransactionWhite.png";
import SponsorBlack from "../assets/icons/admin/common/SponsoredBlack.png";
import SponsorBlue from "../assets/icons/admin/common/SponsoredBlue.png";
import SponsorWhite from "../assets/icons/admin/common/SponsoredWhite.png";
import AnalyticsBlack from "../assets/icons/admin/common/AnalyticsBlack.png";
import AnalyticsBlue from "../assets/icons/admin/common/AnalyticsBlue.png";
import AnalyticsWhite from "../assets/icons/admin/common/AnalyticsWhite.png";
import SettingsBlack from "../assets/icons/admin/common/SettingBlack.png";
import SettingsBlue from "../assets/icons/admin/common/SettingBlue.png";
import SettingWhite from "../assets/icons/admin/common/SettingWhite.png";
import ProfileBlack from "../assets/icons/admin/common/ProfileBlack.png";
import ProfileBlue from "../assets/icons/admin/common/ProfileBlue.png";
import ProfileWhite from "../assets/icons/admin/common/ProfileWhite.png";
import {Outlet, useNavigate} from "react-router-dom";
import {X} from "lucide-react";
import {Button} from "../components/common/Button.jsx";

export const AdminDashboardLayout = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    const images = {
        dashboard: 'src/assets/images/admin/common/DashboardBg.png',
        user: 'src/assets/images/admin/common/UserBg.png',
        property: 'src/assets/images/admin/common/PropertyBg.png',
        agency: 'src/assets/images/admin/common/AgencyBg.png',
        sponsored: 'src/assets/images/admin/common/SponseredBg.png',
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


    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Detect screen size change
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1440) {
                setIsSidebarCollapsed(true);
            } else {
                setIsSidebarCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Check initial screen size
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const navigate = useNavigate();

    if(isSidebarCollapsed){
        return (
            <section className="w-[100vw] h-[100vh] bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] flex justify-center items-center">
                <div className="lg:w-[600px] sm:w-[500px] w-[80%] bg-white dark:bg-[var(--color-dark-bg-primary)] rounded-[10px] border border-[var(--color-primary)]/20 flex flex-col justify-center items-center text-center px-8 md:px-16 py-10">
                    <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center mb-6">
                        <X className="text-red-600" />
                    </div>

                    <p className="text-black dark:text-white mb-10">The admin dashboard is optimized for larger screens. Please access it from a desktop or a device with a resolution of 1440px or higher.</p>

                    <a href="/" className='w-full'>
                        <Button border="border" children="Log Out" />
                    </a>
                </div>
            </section>
        );
    }
    return (
        <main className="w-[100vw] h-[100vh] flex bg-cover bg-center overflow-hidden">
            <div className="h-full w-[16%] min-w-[250px] bg-white dark:bg-[var(--color-dark-bg-primary)] flex flex-col  items-center py-10 px-6">
                <img src={ColorLogoBar} alt="Color Logo" className="w-36" />

                <div className="w-full flex flex-col gap-5 mt-36">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "dashboard" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        {/* Light Mode Image */}
                        <img src={DashboardBlack} alt="dashboard Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "dashboard" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={DashboardWhite} alt="dashboard White"
                             className={`w-[16px] pb-[1px] ${activeTab === "dashboard" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={DashboardBlue} alt="dashboard Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "dashboard" ? "block" : "hidden"}`} />

                        <p className={`${activeTab === "dashboard" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Dashboard</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "user" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("user")}
                    >
                        {/* Light Mode Image */}
                        <img src={UserBlack} alt="user Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "user" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={UserWhite} alt="user White"
                             className={`w-[16px] pb-[1px] ${activeTab === "user" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={UserBlue} alt="user Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "user" ? "block" : "hidden"}`} />

                        <p className={`${activeTab === "user" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>User Management</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "property" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("property")}
                    >
                        {/* Light Mode Image */}
                        <img src={PropertyBlack} alt="property Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "property" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={PropertyWhite} alt="property White"
                             className={`w-[16px] pb-[1px] ${activeTab === "property" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={PropertyBlue} alt="property Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "property" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "property" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Property Management</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md  cursor-pointer 
                        ${activeTab === "agency" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("agency")}
                    >
                        {/* Light Mode Image */}
                        <img src={AgencyBlack} alt="agency Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "agency" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={AgencyWhite} alt="agency White"
                             className={`w-[16px] pb-[1px] ${activeTab === "agency" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={AgencyBlue} alt="agency Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "agency" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "agency" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Agency Management</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "resale" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("resale")}
                    >
                        {/* Light Mode Image */}
                        <img src={ResaleBlack} alt="resale Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "resale" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={ResaleWhite} alt="resale White"
                             className={`w-[16px] pb-[1px] ${activeTab === "resale" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={ResaleBlue} alt="resale Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "resale" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "resale" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Resale Listings</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "transaction" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("transaction")}
                    >
                        {/* Light Mode Image */}
                        <img src={TransactionBlack} alt="transaction Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "transaction" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={TransactionWhite} alt="transaction White"
                             className={`w-[16px] pb-[1px] ${activeTab === "transaction" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={TransactionBlue} alt="transaction Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "transaction" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "transaction" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Transaction Details</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "sponsored" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("sponsored")}
                    >
                        {/* Light Mode Image */}
                        <img src={SponsorBlack} alt="sponsored Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "sponsored" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={SponsorWhite} alt="sponsored White"
                             className={`w-[16px] pb-[1px] ${activeTab === "sponsored" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={SponsorBlue} alt="sponsored Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "sponsored" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "sponsored" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Sponsored Ads</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "analytic" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("analytic")}
                    >
                        {/* Light Mode Image */}
                        <img src={AnalyticsBlack} alt="analytic Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "analytic" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={AnalyticsWhite} alt="analytic White"
                             className={`w-[16px] pb-[1px] ${activeTab === "analytic" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={AnalyticsBlue} alt="analytic Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "analytic" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "analytic" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Analytics & Reports</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "setting" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("setting")}
                    >
                        {/* Light Mode Image */}
                        <img src={SettingsBlack} alt="setting Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "setting" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={SettingWhite} alt="setting White"
                             className={`w-[16px] pb-[1px] ${activeTab === "setting" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={SettingsBlue} alt="setting Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "setting" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "setting" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>System Settings</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "profile" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        {/* Light Mode Image */}
                        <img src={ProfileBlack} alt="profile Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "profile" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={ProfileWhite} alt="profile White"
                             className={`w-[16px] pb-[1px] ${activeTab === "profile" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={ProfileBlue} alt="profile Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "profile" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "profile" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Profile Management</p>
                    </div>
                </div>

            </div>

            <div className="h-full w-[70%] bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] py-10 px-10 overflow-y-auto scrollbar-hide">
                <Outlet />
            </div>

            <div className="h-full w-[14%] min-w-[230px] bg-[var(--color-dark-bg-primary)]">
                <div
                    className="w-full h-2/3 bg-cover flex flex-col items-center py-10"
                    style={{ backgroundImage: `url(${images[activeTab] || 'src/assets/images/admin/DashboardBg.png'})` }}
                >
                    <p className="text-[15px] text-white font-light drop-shadow-sm">Willing a</p>
                    <p className="text-[22px] text-white drop-shadow-sm">{getGreeting()}</p>
                    <h1 className="text-[65px] text-white font-medium mt-[-15px] drop-shadow-sm">{formatTime(time)}</h1>
                </div>
            </div>
        </main>
    )
}