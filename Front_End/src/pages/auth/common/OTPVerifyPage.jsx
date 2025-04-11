import OtpBg from "../../../assets/images/auth/common/OtpBg.png";
import { CommonAuth } from "../CommonAuth.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { OTPField } from "../../../components/common/OTPField.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // 🔥 Make sure you've installed & imported Sonner toast

export const OTPVerifyPage = () => {
    const [typedOtp, setTypedOtp] = useState("");
    const [correctOtp, setCorrectOtp] = useState("");
    const [expiresAt, setExpiresAt] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    // Format time like 01:25
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, "0");
        const sec = (seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    };

    // Fetch OTP from backend
    const fetchOtp = async () => {
        try {
            const savedData = JSON.parse(localStorage.getItem("dataOne"));
            const userEmail = savedData.email;

            const response = await axios.post("http://localhost:5500/api/auth/register-otp", {
                email: userEmail,
            });

            setCorrectOtp(response.data.otp);
            setExpiresAt(response.data.expiresAt);
            setTypedOtp("");

            toast.success("OTP Sent", {
                description: "A new OTP has been sent to your email.",
            });
        } catch (error) {
            console.error("Error fetching OTP:", error);
            toast.error("OTP Error", {
                description: "Error sending OTP. Please try again.",
            });
        }
    };

    // Run once to fetch OTP
    useEffect(() => {
        fetchOtp();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (!expiresAt) return;

        const interval = setInterval(() => {
            const remainingTime = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
            setTimeLeft(remainingTime);

            if (remainingTime <= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    // Handle verification
    const handleVerify = () => {
        if (timeLeft <= 0) {
            toast.error("OTP Expired", {
                description: "OTP expired. Please request a new one.",
            });
            return;
        }

        if (typedOtp == correctOtp) {
            toast.success("OTP Verified", {
                description: "OTP Verified Successfully!",
            });
            // Proceed to next step here...
        } else {
            toast.error("Invalid OTP", {
                description: "Invalid OTP. Please try again.",
            });
        }
    };

    // Resend OTP
    const resendOtp = async () => {
        await fetchOtp();
    };

    return (
        <CommonAuth
            image={OtpBg}
            topic="Your Security, Our Priority"
            text="Reset your password safely with our secure verification process"
            section={
                <div className="mt-16 flex items-center justify-center">
                    <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                        <div>
                            <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Verify Your Identity</h1>
                            <p className="text-[#999999] text-[14px] font-light">Enter the OTP that was sent to your email</p>
                        </div>

                        <div className="flex gap-4 my-8 mt-[45px]">
                            <OTPField
                                label="One Time Password"
                                onChange={(otp) => setTypedOtp(otp)}
                                disabled={timeLeft === 0}
                            />
                        </div>

                        {expiresAt === 0 ? (
                            <p className="text-[12px] text-[#999] mt-2">Loading OTP...</p>
                        ) : timeLeft > 0 ? (
                            <p className="text-[12px] text-[#999] mt-2">
                                OTP will expire in{" "}
                                <span className="text-[#0274F9]">{formatTime(timeLeft)}</span>
                            </p>
                        ) : (
                            <p className="text-[12px] text-red-500 mt-2">OTP expired</p>
                        )}


                        <div className="mt-12">
                            <Button onclick={handleVerify} disabled={timeLeft === 0} children="Verify" />
                        </div>

                        {timeLeft === 0 && (
                            <div className="text-center mt-4">
                                <button
                                    onClick={resendOtp}
                                    className="text-[12px] text-[#0274F9] hover:text-[#00B3FE] underline"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        )}

                        <div className="mt-3 text-center">
                            <span className="text-[10px] text-black/60 dark:text-white/50">Don’t have an account? </span>
                            <a href="/auth" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">
                                Login now
                            </a>
                        </div>
                    </div>
                </div>
            }
        />
    );
};
