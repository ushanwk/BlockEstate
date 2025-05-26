import {Button} from "../../../components/common/Button.jsx";
import {useNavigate} from "react-router-dom";

export const AgencySponsorPaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] shadow-lg dark:shadow-md rounded-xl px-6 py-8 flex flex-col items-center gap-4 w-[260px]">
                {/* Error X Mark */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-500 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                {/* Message */}
                <div className="text-center">
                    <p className="text-black dark:text-white font-medium mb-1">
                        Payment Failed!
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your sponsorship could not be placed.
                    </p>
                </div>

                <div className="text-center flex items-center justify-center w-full">
                    <div className="w-36">
                        <Button
                            children="Go Back"
                            onclick={() => navigate("/agency/sponsorships")}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}