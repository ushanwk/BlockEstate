import AgencyAprroveBg from "../../../assets/images/auth/agency/AgencyApproveBg.png";
import {TextField} from "../../../components/common/TextField.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {CommonAuth} from "../CommonAuth.jsx";
import {DocumentUploadField} from "../../../components/common/DocumentUploadField.jsx";
import {useState} from "react";
import {toast} from "sonner";
import axios from "axios";
import {FullScreenLoader} from "../../../components/common/FullScreenLoader.jsx";

export const AgencyApprovePage = () => {

    const [formData, setFormData] = useState({
        tinNumber: "",
        documentFile: null,
    });

    const [loading, setLoading] = useState(false);

    function base64ToFile(base64String, filename) {
        const arr = base64String.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }


    const handleSubmit = async () => {

        if (!formData.tinNumber.trim()) {
            toast.error("TIN number is required", {
                description: "Please enter your TIN number before continuing.",
            });
            return;
        }

        if (!formData.documentFile) {
            toast.error("Document is required", {
                description: "Please upload a supported document file.",
            });
            return;
        }

        const savedData = JSON.parse(localStorage.getItem("dataOne"));

        if(savedData.google === true){
            const imageFile = base64ToFile(savedData.profilePicture, "profile.jpg");

            const formDataToSend = new FormData();
            formDataToSend.append("email", savedData.email);
            formDataToSend.append("password", savedData.password);
            formDataToSend.append("displayName", savedData.displayName);
            formDataToSend.append("profilePicture", imageFile);
            formDataToSend.append("tinNumber", formData.tinNumber);
            formDataToSend.append("document", formData.documentFile);
            formDataToSend.append("firebaseId", savedData.uid);

            try{
                setLoading(true);

                await axios.post(
                    "http://localhost:5500/api/auth/register-agency-google",
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setLoading(false);

                toast.success("Registration successfully!", {
                    description: "Your account created successfully",
                });
            }catch (error) {
                console.error("Error fetching:", error);
                toast.error("Registration Failed", {
                    description: "Error sending. Please try again.",
                });
            } finally {
                localStorage.removeItem("dataOne");
            }

            return;
        }


        const imageFile = base64ToFile(savedData.profilePicture, "profile.jpg");

        const formDataToSend = new FormData();
        formDataToSend.append("email", savedData.email);
        formDataToSend.append("password", savedData.password);
        formDataToSend.append("displayName", savedData.displayName);
        formDataToSend.append("profilePicture", imageFile);
        formDataToSend.append("role", savedData.role);
        formDataToSend.append("agencyName", savedData.agencyName);
        formDataToSend.append("contactPerson", savedData.contactPerson);
        formDataToSend.append("country", savedData.country);
        formDataToSend.append("tinNumber", formData.tinNumber);
        formDataToSend.append("document", formData.documentFile);

        try{
            setLoading(true);

            await axios.post(
                "http://localhost:5500/api/auth/register-agency",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setLoading(false);

            toast.success("Registration successfully!", {
                description: "Your account created successfully",
            });

        }catch(error){
            console.error("Error fetching:", error);
            toast.error("Error", {
                description: "Error sending. Please try again.",
            });
        } finally {
            localStorage.removeItem("dataOne");
        }

    }


    return (

        loading?
            <FullScreenLoader />
            :
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
                                        <TextField
                                            placeholder="Enter tin number"
                                            label="TIN Number"
                                            value={formData.tinNumber}
                                            onChange={(e) => setFormData(prev => ({ ...prev, tinNumber: e.target.value }))}
                                        />

                                        <p className='text-[#999999] text-[10px]'>Note: Your registered email will be used as your username when logging in</p>
                                    </div>

                                    <div className="mt-4">
                                        <DocumentUploadField
                                            label="Upload Document"
                                            topic="Attach your file"
                                            subTopic="Supported: PDF, DOCX, TXT"
                                            rulesText="Max size: 5MB"
                                            onUpload={(file) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    documentFile: file,
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="mt-12">
                                        <Button onclick={handleSubmit} children="Create Account"/>
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