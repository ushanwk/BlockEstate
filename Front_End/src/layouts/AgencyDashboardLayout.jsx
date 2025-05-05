import ColorLogoBar from "../assets/icons/common/LogoBarColor.png";
import {useEffect, useState} from "react";
import DashboardBlack from "../assets/icons/admin/common/DasboardBlack.png";
import DashboardBlue from "../assets/icons/admin/common/DasboardBlue.png";
import DashboardWhite from "../assets/icons/admin/common/DashboardWhite.png";
import PropertyBlack from "../assets/icons/admin/common/PropertyBlack.png";
import PropertyBlue from "../assets/icons/admin/common/PropertyBlue.png";
import PropertyWhite from "../assets/icons/admin/common/PropertyWhite.png";
import ProfileBlack from "../assets/icons/admin/common/ProfileBlack.png";
import ProfileBlue from "../assets/icons/admin/common/ProfileBlue.png";
import ProfileWhite from "../assets/icons/admin/common/ProfileWhite.png";
import SponsorBlack from "../assets/icons/admin/common/SponsoredBlack.png";
import SponsorBlue from "../assets/icons/admin/common/SponsoredBlue.png";
import SponsorWhite from "../assets/icons/admin/common/SponsoredWhite.png";
import FinancialBlack from "../assets/icons/admin/common/TransactionBlack.png";
import FinancialBlue from "../assets/icons/admin/common/TransactionBlue.png";
import FinancialWhite from "../assets/icons/admin/common/TransactionWhite.png";
import DashboardBg from "../assets/images/admin/common/DashboardBg.png";
import PropertyBg from "../assets/images/admin/common/PropertyBg.png";
import SponsoredBg from "../assets/images/admin/common/SponseredBg.png";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {X} from "lucide-react";
import {Button} from "../components/common/Button.jsx";

export const AgencyDashboardLayout = () => {

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


    const location = useLocation();
    const navigate = useNavigate();

    const getActiveTab = () => {
        const path = location.pathname;
        if (path.startsWith('/agency/properties')) return 'properties';
        if (path.startsWith('/agency/profile')) return 'profile';
        if (path.startsWith('/agency/sponsorships')) return 'sponsorships';
        if (path.startsWith('/agency/financials')) return 'financials';
        if (path === '/agency' || path === '/agency/') return 'dashboard';
        return 'dashboard';
    };

    const [activeTab, setActiveTab] = useState(getActiveTab());

    // Update activeTab when route changes
    useEffect(() => {
        setActiveTab(getActiveTab());
    }, [location.pathname]);

    const images = {
        dashboard: DashboardBg,
        properties: PropertyBg,
        profile: DashboardBg,
        sponsorships: SponsoredBg,
        financials: DashboardBg
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


    if(isSidebarCollapsed){
        return (
            <section className="w-[100vw] h-[100vh] bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] flex justify-center items-center">
                <div className="lg:w-[600px] sm:w-[500px] w-[80%] bg-white dark:bg-[var(--color-dark-bg-primary)] rounded-[10px] border border-[var(--color-primary)]/20 flex flex-col justify-center items-center text-center px-8 md:px-16 py-10">
                    <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center mb-6">
                        <X className="text-red-600" />
                    </div>

                    <p className="text-black dark:text-white mb-10">The agency dashboard is optimized for larger screens. Please access it from a desktop or a device with a resolution of 1440px or higher.</p>

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
                        onClick={() => {navigate("/agency")}}
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
                        ${activeTab === "properties" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => {navigate("/agency/properties")}}
                    >
                        {/* Light Mode Image */}
                        <img src={PropertyBlack} alt="properties Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "properties" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={PropertyWhite} alt="properties White"
                             className={`w-[16px] pb-[1px] ${activeTab === "properties" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={PropertyBlue} alt="properties Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "properties" ? "block" : "hidden"}`} />

                        <p className={`${activeTab === "properties" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Properties</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "profile" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => navigate("/agency/profile")}
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
                        <p className={`${activeTab === "profile" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Profile</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md  cursor-pointer 
                        ${activeTab === "sponsorships" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => navigate("/agency/sponsorships")}
                    >
                        {/* Light Mode Image */}
                        <img src={SponsorBlack} alt="sponsorships Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "sponsorships" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={SponsorWhite} alt="sponsorships White"
                             className={`w-[16px] pb-[1px] ${activeTab === "sponsorships" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={SponsorBlue} alt="sponsorships Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "sponsorships" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "sponsorships" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Sponsorships</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <div
                        className={`flex gap-[8px] items-center text-[14px] pl-3 w-full h-10 text-center rounded-md cursor-pointer 
                        ${activeTab === "financials" ? "bg-[var(--color-primary)]/10 border-1 border-[var(--color-primary)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        onClick={() => navigate("/agency/financials")}
                    >
                        {/* Light Mode Image */}
                        <img src={FinancialBlack} alt="financials Black"
                             className={`w-[16px] pb-[1px] ${activeTab === "financials" ? "hidden" : "block dark:hidden"}`} />

                        {/* Dark Mode Image */}
                        <img src={FinancialWhite} alt="financials White"
                             className={`w-[16px] pb-[1px] ${activeTab === "financials" ? "hidden" : "hidden dark:block"}`} />

                        {/* Selected Tab Image (Blue) */}
                        <img src={FinancialBlue} alt="financials Blue"
                             className={`w-[16px] pb-[1px] ${activeTab === "financials" ? "block" : "hidden"}`} />
                        <p className={`${activeTab === "financials" ? "text-[var(--color-primary)]" : "text-black dark:text-white"}`}>Financials</p>
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