import TypeSelectBg from "../../../assets/images/auth/typeselectregisterpage/TypeSelectBg.png";
import {CommonAuth} from "../CommonAuth.jsx";
import Agency from "../../../assets/images/auth/typeselectregisterpage/Agency.png";
import Investor from "../../../assets/images/auth/typeselectregisterpage/Investor.png";
import {useNavigate} from "react-router-dom";

export const TypeSelectPage = () => {

    const navigate = useNavigate();

    return (
        <CommonAuth image={TypeSelectBg} topic="Revolutionizing Real Estate with Blockchain" text="A secure, transparent, and innovative platform to invest in real estate and earn passive income"
                    section={
                        <div className="mt-16 flex items-center justify-center">
                            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Tell Us Who You Are</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Choose your role to personalize your experience</p>
                                </div>

                                <div className="flex gap-4 my-8 mt-[45px]">
                                    <div onClick={() => {navigate('/auth/investor-register')}}
                                        className="text-center py-6 px-2 w-full border-black/10 border-[0.5px] rounded-[5px] flex flex-col items-center justify-center md:text-[13px] text-[12px] gap-2 cursor-pointer font-normal  dark:text-white dark:bg-white/10 hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]">
                                        <img src={Investor} className="w-20"/>
                                        <h1 className="text-black dark:text-white">Personal Investor</h1>
                                        <p className="text-[#999999] font-light text-[10px]">Invest in property blocks and earn passive income effortlessly</p>
                                    </div>

                                    <div onClick={() => {navigate('/auth/agency-register')}}
                                        className="text-center py-6 px-2 w-full border-black/10 border-[0.5px] rounded-[5px] flex flex-col items-center justify-center md:text-[13px] text-[12px] gap-2 cursor-pointer font-normal  dark:text-white dark:bg-white/10 hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]">
                                        <img src={Agency} className="w-20"/>
                                        <h1 className="text-black dark:text-white">Agency Handler</h1>
                                        <p className="text-[#999999] font-light text-[10px]">List properties, manage rentals, and grow your real estate business</p>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="text-[12px] text-[#999999]">Select your role to get started. Investors can buy property blocks and earn passive income, while agencies can list properties, manage rentals, and grow their business effortlessly.</p>
                                </div>

                            </div>
                        </div>
                    } />
    )
}