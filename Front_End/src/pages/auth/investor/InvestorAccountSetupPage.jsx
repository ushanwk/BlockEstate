import InvestorSetupBg from "../../../assets/images/auth/investor/InvestorAccountSetupBg.png";
import {TextField} from "../../../components/common/TextField.jsx";
import {Button} from "../../../components/common/Button.jsx";
import {CommonAuth} from "../CommonAuth.jsx";
import {PasswordField} from "../../../components/common/PasswordField.jsx";
import {ImageUploadField} from "../../../components/common/ImageUploadField.jsx";
import {useState} from "react";
import {toast} from "sonner";
import imageCompression from "browser-image-compression";
import axios from "axios";
import {FullScreenLoader} from "../../../components/common/FullScreenLoader.jsx";
import {Section} from "lucide-react";

export const InvestorAccountSetupPage = () => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        displayName: "",
        password: "",
        confirmPassword: "",
        profilePicture: null,
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const handleImageUpload = async (file) => {
        if (!file) return;

        try {
            const compressedFile = await handleImageResize(file);

            if (compressedFile.size > 500 * 1024) {
                toast.error("Image too large", {
                    description: "Profile picture must be less than 500KB.",
                });
                return;
            }

            const resizedFile = await resizeImage(compressedFile, 200, 200);

            if (resizedFile) {
                // Save the file to state (for later upload)
                handleInputChange("profilePicture", resizedFile);
            }

        } catch (err) {
            console.error("Error during image processing", err);
            toast.error("Image upload failed", {
                description: "Something went wrong while processing the image.",
            });
        }
    };

    const handleImageResize = async (file) => {
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 200,
            useWebWorker: true,
        };
        return await imageCompression(file, options);
    };


    const resizeImage = (file, width, height) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error("Canvas is empty"));
                            return;
                        }

                        if (blob.size > 500 * 1024) {
                            toast.error("Resized image too large", {
                                description: "Try uploading a lower resolution image.",
                            });
                            resolve(null);
                        } else {
                            const resizedFile = new File([blob], file.name, { type: file.type });
                            resolve(resizedFile);
                        }
                    }, file.type);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };


    const handleSubmit = async () => {
        const {displayName, password, confirmPassword, profilePicture} = formData;

        if (!displayName || !password || !confirmPassword || !profilePicture) {
            toast.error("All fields required", {
                description: "Please fill out all fields including a profile picture.",
            });
            return;
        }

        if (password.length < 6) {
            toast.error("Password size", {
                description: "Password should be at least 6 characters.",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password mismatch", {
                description: "Both passwords should be the same.",
            });
            return;
        }


        const savedData = JSON.parse(localStorage.getItem("dataOne"));

        if(savedData.google === true){

            const formDataToSend = new FormData();

            formDataToSend.append("email", savedData.email);
            formDataToSend.append("firebaseId", savedData.uid);
            formDataToSend.append("displayName", formData.displayName);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("profilePicture", formData.profilePicture);

            try {

                setLoading(true);

                await axios.post(
                    "http://localhost:5500/api/auth/register-investor-google",
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

            } catch (error) {
                console.error("Error fetching:", error);
                toast.error("Error", {
                    description: "Error sending. Please try again.",
                });
            } finally {
                localStorage.removeItem("dataOne");
            }

            return;
        }

        const formDataToSend = new FormData();

        formDataToSend.append("email", savedData.email);
        formDataToSend.append("firstName", savedData.firstName);
        formDataToSend.append("lastName", savedData.lastName);
        formDataToSend.append("address", savedData.address);
        formDataToSend.append("nic", savedData.nic);
        formDataToSend.append("role", savedData.role);
        formDataToSend.append("displayName", formData.displayName);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("profilePicture", formData.profilePicture);


        try {

            setLoading(true);

            await axios.post(
                "http://localhost:5500/api/auth/register-investor",
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

        } catch (error) {
            console.error("Error fetching:", error);
            toast.error("Error", {
                description: "Error sending. Please try again.",
            });
        } finally {
            localStorage.removeItem("dataOne");
        }

    };


    return (
        loading?
            <FullScreenLoader />
            :
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
                                        <TextField
                                            placeholder="Enter your display name"
                                            label="Display Name"
                                            onChange={(e) => handleInputChange("displayName", e.target.value)}
                                        />
                                        <p className="text-[#999999] text-[10px]">Note: Your registered email will be used as your username when logging in</p>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <div className="w-full">
                                            <PasswordField
                                                placeholder="Enter your password"
                                                label="Password"
                                                onChange={(e) => handleInputChange("password", e.target.value)}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <PasswordField
                                                placeholder="Re-enter your password"
                                                label="Confirm Password"
                                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <ImageUploadField
                                            label="Profile Picture"
                                            topic="Pick a Profile Picture"
                                            subTopic="A profile picture reflects your personality and professionalism."
                                            rulesText="SVG, PNG, JPG or GIF (max 800x800px, 500KB)"
                                            onUpload={handleImageUpload}
                                        />
                                    </div>

                                    <div className="mt-12">
                                        <Button children="Create Account" onclick={handleSubmit} />
                                    </div>

                                    <div className="mt-3 text-center">
                                        <span className="text-[10px] text-black/60 dark:text-white/50">Don’t have an account? </span>
                                        <a href="/auth" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">
                                            Login now
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    } />
    )
}