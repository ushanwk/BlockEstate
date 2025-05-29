import {Button} from "../../../components/common/Button.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AgencySponsorPaymentSuccess = () => {
    const navigate = useNavigate();

    function saveSponsorship(){
        const sponsorData = JSON.parse(localStorage.getItem("addSponsorship"));
        if (!sponsorData) return;

        const addSponsorship = async () => {
            try {
                console.log(sponsorData);

                const response = await axios.post("http://localhost:5500/api/sponsorship/create", {
                    propertyId: sponsorData.propertyId,
                    startingDate: sponsorData.startingDate,
                    endingDate: sponsorData.endingDate,
                    amountPaid: sponsorData.amountPaid,
                });

                localStorage.removeItem("addSponsorship");

            } catch (error) {
                console.error("Failed to save sponsorship", error.message);
            }
        };

        addSponsorship();
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] shadow-lg dark:shadow-md rounded-xl px-6 py-8 flex flex-col items-center gap-4 w-[260px]">
                {/* Success Checkmark */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-green-500 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Message */}
                <div className="text-center">
                    <p className="text-black dark:text-white font-medium mb-1">
                        Payment Successful!
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your sponsorship was successfully placed.
                    </p>
                </div>

                <div className="text-center flex items-center justify-center w-full">
                    <div className="w-36">
                        <Button children="Go Back" onclick={()=>{
                                navigate("/agency/sponsorships")
                                saveSponsorship();
                            }
                        } />
                    </div>
                </div>
            </div>
        </div>
    )
}