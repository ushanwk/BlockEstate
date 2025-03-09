import {Button} from "../../components/common/Button.jsx";

export const HomePage = () => {


    return (
        <main>
            <section className="w-full h-[100vh] bg-cover bg-center relative" style={{ backgroundImage: `url('src/assets/images/website/homepage/HeroicBg.png')` }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#003975] opacity-60 dark:bg-[#001E3D] dark:opacity-70"></div>

                {/* Section Content */}
                <div className="relative flex flex-col justify-center items-center w-full h-full text-white text-4xl font-bold z-20">
                    <h3 className="text-5xl font-light drop-shadow-md mb-3">Welcome To</h3>
                    <div className="bg-white h-1 w-[530px] drop-shadow-md"></div>
                    <h1 className="text-[90px] drop-shadow-md">BlockEstate</h1>
                    <div className="bg-white px-2 py-1 text-[15px] font-medium text-[var(--color-primary)] rounded-[5px] drop-shadow-md">Turning Real Estate Dreams into Reality with Secure Block Ownership</div>
                    <p className="text-xl font-light drop-shadow-md text-center w-[1000px] mt-8">
                        At BlockEstate, we empower you to invest in real estate by owning blocks of property, earning passive income, and enjoying secure, transparent blockchain backed transactions
                    </p>
                    <div className="mt-8">
                        <Button children={"Get Your Own BLOCK"} border={"border"} large={true} />
                    </div>
                </div>
            </section>


        </main>
    )
}