import InvestorSetupBg from "../../../assets/images/auth/investoraccountsetuppage/InvestorAccountSetupBg.png";
import {TextField} from "../../../components/common/TextField.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {CommonAuth} from "../CommonAuth.jsx";
import {PasswordField} from "../../../components/common/PasswordField.jsx";
import {ImageUploadField} from "../../../components/common/ImageUploadField.jsx";

export const InvestorAccountSetupPage = () => {
    return (
        <CommonAuth image={InvestorSetupBg} topic="Make Your Profile Stand Out" text="Upload a photo and choose a display name to get started"
                    section={
                        <div className="flex items-center justify-center">
                            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Set Up Your Investor Profile</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Customize your profile for a personalized experience</p>
                                </div>

                                <div className="mt-8">

                                    <div className="w-full">
                                        <TextField placeholder="Enter your diplay name" label="Display Name" />
                                        <p className='text-[#999999] text-[10px]'>Note: Your registered email will be used as your username when logging in</p>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <div className="w-full">
                                            <PasswordField placeholder="Enter your password" label="Password" />
                                        </div>
                                        <div className="w-full">
                                            <PasswordField placeholder="Re-enter your password" label="Confirm Password" />
                                        </div>
                                    </div>

                                    <div className="mt-4">

                                        <ImageUploadField
                                            label="Profile Picture"
                                            topic="Pick a Profile Picture"
                                            subTopic="A profile picture reflects your personality and professionalism, making a lasting first impression in today's digital world."
                                            rulesText="SVG, PNG, JPG or GIF (max 800x800px)"
                                            onUpload={() => console.log("Open file picker!")} // Replace with your function
                                        />



                                    </div>

                                    <div className="mt-12">
                                        <Button children="Create Account"/>
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