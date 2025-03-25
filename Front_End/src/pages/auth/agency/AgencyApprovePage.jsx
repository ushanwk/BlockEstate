import AgencyAprroveBg from "../../../assets/images/auth/agencyapprovepage/AgencyApproveBg.png";
import {TextField} from "../../../components/common/TextField.jsx";
import {PasswordField} from "../../../components/common/PasswordField.jsx";
import {ImageUploadField} from "../../../components/common/ImageUploadField.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {CommonAuth} from "../CommonAuth.jsx";
import {DocumentUploadField} from "../../../components/common/DocumentUploadField.jsx";

export const AgencyApprovePage = () => {
    return (
        <CommonAuth image={AgencyAprroveBg} topic="Make Your Profile Verified" text="Upload documents for approve your agency to BlockEstate"
                    section={
                        <div className="flex items-center justify-center mt-8">
                            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                                <div>
                                    <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Set Up Your Agency Profile</h1>
                                    <p className="text-[#999999] text-[14px] font-light">Customize your profile for a personalized experience</p>
                                </div>

                                <div className="mt-12">

                                    <div className="w-full">
                                        <TextField placeholder="Enter tin number" label="TIN Number" />
                                        <p className='text-[#999999] text-[10px]'>Note: Your registered email will be used as your username when logging in</p>
                                    </div>

                                    <div className="mt-4">

                                        <DocumentUploadField
                                            label="Upload Document"
                                            topic="Attach your file"
                                            subTopic="Supported: PDF, DOCX, TXT"
                                            rulesText="Max size: 5MB"
                                            onUpload={(file) => console.log("Uploaded document:", file)}
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