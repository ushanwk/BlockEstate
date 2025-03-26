import OtpBg from "../../../assets/images/auth/common/OtpBg.png";
import {CommonAuth} from "../CommonAuth.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {OTPField} from "../../../components/common/OTPField.jsx";

export const OTPVerifyPage = () => {
    return (
        <CommonAuth image={OtpBg} topic="Your Security, Our Priority" text="Reset your password safely with our secure verification process"
                    section={
                        <div className="mt-16 flex items-center justify-center">
                            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Verify Your Identity</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Enter the OTP that sent to your email</p>
                                </div>

                                <div className="flex gap-4 my-8 mt-[45px]">
                                    <OTPField label="One Time Password" onChange={(otp) => console.log("OTP Entered:", otp)} />
                                </div>

                                <div className="mt-12">
                                    <Button children="Verify"/>
                                </div>

                                <div className="mt-3 text-center">
                                    <span className="text-[10px] text-black/60 dark:text-white/50">Don’t have an account? </span>
                                    <a href="/auth" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">Login now</a>
                                </div>

                            </div>
                        </div>
                    } />
    )
}