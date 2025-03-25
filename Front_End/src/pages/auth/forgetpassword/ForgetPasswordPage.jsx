import ForgetPasswordBg from "../../../assets/images/auth/forgetpasswordpage/FogetPasswordBg.png";
import {OTPField} from "../../../components/common/OTPField.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {CommonAuth} from "../CommonAuth.jsx";
import {TextField} from "../../../components/common/TextField.jsx";

export const ForgetPasswordPage = () => {
    return (
        <CommonAuth image={ForgetPasswordBg} topic="Regain Access to Your Account" text="A secure, transparent, and innovative platform to invest in real estate and earn passive income"
                    section={
                        <div className="mt-16 flex items-center justify-center">
                            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Verify Your Identity</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Enter the OTP that sent to your email</p>
                                </div>

                                <div className="w-full mt-[45px]">
                                    <TextField label="Enter Email" placeholder="Enter your register email" />
                                </div>

                                <div className="mt-16">
                                    <Button children="Verify"/>
                                </div>

                                <div className="mt-3 text-center">
                                    <span className="text-[10px] text-black/60 dark:text-white/50">Remember your password? </span>
                                    <a href="/auth" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">Login now</a>
                                </div>

                            </div>
                        </div>
                    } />
    )
}