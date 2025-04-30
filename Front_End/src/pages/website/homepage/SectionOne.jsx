import { Button } from "../../../components/common/Button.jsx";
import DownArrow from "../../../assets/images/website/homepage/DownArrow.png";
import {useAuth} from "../../../context/AuthContext.jsx";

export const SectionOne = () => {

    const { user } = useAuth();

    async function handleClick() {
        if (user) {
            const token = await user.getIdToken();

            const response = await fetch("http://localhost:5500/api/auth/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data);
        }
    }

    return (
        <section
            className="w-full h-[100vh] bg-cover bg-center relative flex items-center justify-center px-4"
            style={{ backgroundImage: `url('src/assets/images/website/homepage/HeroicBg.png')` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#003975] opacity-70 dark:bg-[#181823] dark:opacity-70"></div>

            {/* Section Content */}
            <div className="relative flex flex-col items-center text-white text-center z-20">

                {/* Heading */}
                <h3 className="mb-2 font-light drop-shadow-md text-[20px] sm:text-[30px] md:text-[40px] lg:text-[45px]">
                    Welcome To
                </h3>

                {/* Line */}
                <div className="bg-white h-1 drop-shadow-md w-[300px] sm:w-[420px] md:w-[540px] lg:w-[600px]"></div>

                {/* Main Title */}
                <h1 className="font-bold mt-1 mb-1 drop-shadow-md text-[50px] sm:text-[70px] md:text-[90px] lg:text-[100px] m-0 leading-none">
                    BlockEstate
                </h1>


                {/* Tagline */}
                <div className="bg-white px-3 py-2 text-[var(--color-primary)] rounded-[5px] drop-shadow-md font-bold
                                text-[8px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                    Turning Real Estate Dreams into Reality with Secure Block Ownership
                </div>

                {/* Description */}
                <p className="font-light drop-shadow-md mt-6 w-[320px] sm:w-[600px] md:w-[700px] lg:w-[800px]
                              text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
                    At BlockEstate, we empower you to invest in real estate by owning blocks of property,
                    earning passive income, and enjoying secure, transparent blockchain-backed transactions.
                </p>

                {/* CTA Button */}
                <div className="mt-8">
                    <Button children={"Get Your Own BLOCK"} border={"border"} large={true} onclick={handleClick} />
                </div>

                <img
                    src={DownArrow} alt="DownArrow"
                    className="absolute bottom-[-180px] animate-bounce w-6"
                />
            </div>

        </section>
    )
}
