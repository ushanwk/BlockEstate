import {CommonAuth} from "../CommonAuth.jsx";
import RegisterBg from "../../../assets/images/auth/investor/RegisterBg.png";
import GoogleIcon from "../../../assets/icons/auth/GoogleIcon.png";
import AppleIcon from "../../../assets/icons/auth/AppleIcon.png";
import {TextField} from "../../../components/common/TextField.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {CountryComboBox} from "../../../components/common/CountryComboBox.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {handleGoogleRegister} from "../../../firebase/auth.js";

export const AgencyRegisterPage = () => {

    const navigate = useNavigate();

        const [formData, setFormData] = useState({
            agencyName: "",
            country: "",
            contactPerson: "",
            email: "",
            role: "AGENCY",
        });

        const handleChange = (field, value) => {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        };

    const validateForm = () => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.agencyName || !nameRegex.test(formData.agencyName)) {
            toast.error("Agency Name Error", {
                description: "Agency name must contain only letters and spaces",
            });
            return false;
        }

        if (!formData.country) {
            toast.error("Country Error", {
                description: "Please select a country",
            });
            return false;
        }

        if (!formData.contactPerson || !nameRegex.test(formData.contactPerson)) {
            toast.error("Contact Person Error", {
                description: "Contact person must contain only letters and spaces",
            });
            return false;
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            toast.error("Email Error", {
                description: "Email address is not in a valid format",
            });
            return false;
        }

        return true;
    };

    const handleNext = () => {

        if(validateForm()){
            localStorage.setItem('dataOne', JSON.stringify(formData));

            toast.error('Data stored', {
                description: 'You can now verify your email',
            });

            navigate("/auth/otp");
        }
    };

    const handleGoogleSignIn = () => {
        handleGoogleRegister().then(() => {
            navigate("/auth/agency-setup");
        });
    }


    return (
        <CommonAuth image={RegisterBg} topic="Join a Trusted Real Estate Community" text="A secure, transparent, and innovative platform to invest in real estate and earn passive income"
                    section={
                        <div className="flex items-center justify-center">
                            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Get Started with BlockEstate!</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Enter your details to get started on your real estate journey</p>
                                </div>

                                <div className="flex gap-4 my-8 mt-[45px]">
                                    <button
                                        className="flex items-center justify-center w-full h-[38px] py-2 border-black/10 border-[0.5px] rounded-[5px] md:text-[13px] text-[12px] gap-2 cursor-pointer font-normal hover:border-black/30 dark:text-white dark:bg-white/10"
                                        onClick={handleGoogleSignIn}
                                    >
                                        <img src={GoogleIcon} alt="Google" className="md:w-5 w-3"/>
                                        Login with Google
                                    </button>
                                    <button
                                        className="flex items-center justify-center w-full h-[38px] py-2 border-black/10 border-[0.5px] rounded-[5px] md:text-[13px] text-[12px]  gap-2 cursor-pointer font-normal hover:border-black/30 dark:text-white dark:bg-white/10">
                                        <img src={AppleIcon} alt="Apple" className="md:w-5 w-3"/>
                                        Login with Apple
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 my-6">
                                    <div className="flex-grow h-px bg-[#E1E1E1] dark:bg-white/40"></div>
                                    <h5 className="text-xs text-[#E1E1E1] dark:text-white/40">or</h5>
                                    <div className="flex-grow h-px bg-[#E1E1E1] dark:bg-white/40"></div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <TextField
                                                placeholder="Enter agency name"
                                                label="Agency Name"
                                                value={formData.agencyName}
                                                onChange={(val) => handleChange("agencyName", val.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-2">
                                        <div className="w-full">
                                            <p className="block text-[13px] mb-[8px] text-left dark:text-[#ffffff] dark:font-extralight">Country</p>
                                            <CountryComboBox
                                                placeholder="Select country"
                                                value={formData.country}
                                                onChange={(val) => handleChange("country", val)}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <TextField
                                                placeholder="Enter contact person"
                                                label="Contact Person"
                                                value={formData.contactPerson}
                                                onChange={(val) => handleChange("contactPerson", val.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <TextField
                                            placeholder="Enter your email"
                                            label="Email"
                                            value={formData.email}
                                            onChange={(val) => handleChange("email", val.target.value)}
                                        />
                                    </div>

                                    <div className="mt-12">
                                        <Button children="Next" onclick={handleNext} />
                                    </div>

                                    <div className="mt-3 text-center">
                                        <span className="text-[10px] text-black/60 dark:text-white/50">Don’t have an account? </span>
                                        <a href="/auth" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">Login now</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    } />
    )
}