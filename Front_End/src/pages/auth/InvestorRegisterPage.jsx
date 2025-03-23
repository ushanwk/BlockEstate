import {CommonAuth} from "./CommonAuth.jsx";
import RegisterBg from "../../assets/images/auth/registerpage/RegisterBg.png";
import GoogleIcon from "../../assets/icons/auth/GoogleIcon.png";
import AppleIcon from "../../assets/icons/auth/AppleIcon.png";
import {TextField} from "../../components/common/TextField.jsx";
import {PasswordField} from "../../components/common/PasswordField.jsx";
import {Button} from "../../components/common/Button.jsx";

export const InvestorRegisterPage = () => {
    return (
        <CommonAuth image={RegisterBg} topic="Revolutionizing Real Estate with Blockchain" text="A secure, transparent, and innovative platform to invest in real estate and earn passive income."
                    section={
                        <div className="flex items-center justify-center">
                            <div className="bg-white p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Get Started with BlockEstate!</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Enter your details to get started on your real estate journey</p>
                                </div>

                                <div className="flex gap-4 my-8 mt-[45px]">
                                    <button
                                        className="flex items-center justify-center w-full h-[38px] py-2 border-black/10 border-[0.5px] rounded-[5px] md:text-[13px] text-[12px] gap-2 cursor-pointer font-normal hover:border-black/30">
                                        <img src={GoogleIcon} alt="Google" className="md:w-5 w-3"/>
                                        Login with Google
                                    </button>
                                    <button
                                        className="flex items-center justify-center w-full h-[38px] py-2 border-black/10 border-[0.5px] rounded-[5px] md:text-[13px] text-[12px]  gap-2 cursor-pointer font-normal hover:border-black/30">
                                        <img src={AppleIcon} alt="Apple" className="md:w-5 w-3"/>
                                        Login with Apple
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 my-6">
                                    <div className="flex-grow h-px bg-[#E1E1E1]"></div>
                                    <h5 className="text-xs text-[#E1E1E1]">or</h5>
                                    <div className="flex-grow h-px bg-[#E1E1E1]"></div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <TextField placeholder="Enter first name" label="First Name" />
                                        </div>
                                        <div className="w-full">
                                            <TextField placeholder="Enter last name" label="Last Name" />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-2">
                                        <div className="w-full">
                                            <TextField placeholder="Enter NIC" label="NIC Number" />
                                        </div>
                                        <div className="w-full">
                                            <TextField placeholder="Enter address" label="Address" />
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <TextField placeholder="Enter your email" label="Email" />
                                    </div>

                                    <div className="mt-12">
                                        <Button children="Login"/>
                                    </div>

                                    <div className="mt-3 text-center">
                                        <span className="text-[10px] text-black/60">Don’t have an account? </span>
                                        <a href="#" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">Login now</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    } />
    )
}