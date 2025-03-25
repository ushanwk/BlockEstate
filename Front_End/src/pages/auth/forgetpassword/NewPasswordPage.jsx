import NewPasswordBg from "../../../assets/images/auth/newpasswordpage/NewPAsswordBg.png";
import {Button} from "../../../components/common/Button.jsx";
import {CommonAuth} from "../CommonAuth.jsx";
import {PasswordField} from "../../../components/common/PasswordField.jsx";

export const NewPasswordPage = () => {
    return (
        <CommonAuth image={NewPasswordBg} topic="Seamless Recovery in Minutes" text="Follow simple steps to recover access to your BlockEstate account"
                    section={
                        <div className="mt-16 flex items-center justify-center">
                            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Create a New Password</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Set a strong password for your account</p>
                                </div>

                                <div className="mt-[45px]">
                                    <div className="mt-6">
                                        <PasswordField placeholder="Enter your new password" label="New Password" />
                                    </div>

                                    <div className="mt-6">
                                        <PasswordField placeholder="Re-enter your new password" label="Confirm Password" />
                                    </div>
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