import {CommonAuth} from "./CommonAuth.jsx";
import LoginBg from "../../assets/images/auth/loginpage/LoginBg.png"
import {PasswordField} from "../../components/common/PasswordField.jsx";
import {TextField} from "../../components/common/TextField.jsx";
import AppleIcon from "../../assets/icons/auth/AppleIcon.png";
import GoogleIcon from "../../assets/icons/auth/GoogleIcon.png";
import {Button} from "../../components/common/Button.jsx";


export const LoginPage = () => {
    return (
       <CommonAuth image={LoginBg} topic="Revolutionizing Real Estate with Blockchain" text="A secure, transparent, and innovative platform to invest in real estate and earn passive income."
                   section={
                       <div className="mt-8 flex items-center justify-center">
                           <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                               <div>
                                   <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Welcome Back to BlockEstate!</h1>
                                   <p className="text-[#999999] text-[14px] font-light">Securely Access Your Property Investments & Listings</p>
                               </div>

                               <div className="flex gap-4 my-8 mt-[45px]">
                                   <button
                                       className="flex items-center justify-center w-full h-[38px] py-2 border-black/10 border-[0.5px] rounded-[5px] md:text-[13px] text-[12px] gap-2 cursor-pointer font-normal hover:border-black/30 dark:text-white dark:bg-white/10">
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
                                   <div className="mt-6">
                                       <TextField placeholder="Enter your username or email" label="Username or Email" />
                                   </div>

                                   <div className="mt-6">
                                       <PasswordField placeholder="Enter your password" label="Password" />
                                       <div className="mt-[-10px] text-right">
                                           <a href="#" className="text-[10px] text-black/60 dark:text-white/50 hover:text-blue-500 cursor-pointer">Forgot Password?</a>
                                       </div>
                                   </div>
                               </div>

                               <div className="mt-6">
                                   <Button children="Login"/>
                               </div>

                               <div className="mt-4 text-center">
                                   <span className="text-[10px] text-black/60 dark:text-white/50">Don’t have an account? </span>
                                   <a href="/auth/type" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">Register now</a>
                               </div>

                           </div>
                       </div>
                   } />
    )
}