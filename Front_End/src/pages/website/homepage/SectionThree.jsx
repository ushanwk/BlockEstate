import SectionTwo_One from '../../../assets/images/website/homepage/SetcionThree_One.png'
import SectionTwo_Two from '../../../assets/images/website/homepage/SectionThree_Two.png'
import SectionTwo_Three from '../../../assets/images/website/homepage/SectionThree_Three.png'
import SectionTwo_Four from '../../../assets/images/website/homepage/SectionThree_Four.png'
import SectionTwo_Five from '../../../assets/images/website/homepage/SectionThree_Five.png'

export const SectionThree = () => {
    return (
        <section className='py-20 flex flex-col items-center justify-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px]'>
            <section className="md:grid md:grid-cols-3 gap-4 w-full p-4 h-[90vh] hidden">
                {/* Column 1: 3 Equal Rows */}
                <div className="grid grid-rows-3 gap-4">
                    <div className="p-4 rounded-[5px]">
                        <h1 className='font-light text-[20px] dark:text-white'>What is BlockState</h1>
                        <p className='font-light text-[14px] mt-3 text-gray-400'>BlockEstate is a blockchain-powered platform that transforms real estate investments by allowing users to own property blocks and earn secure, passive income.</p>
                        <div className='w-16 h-[1px] bg-gray-400 mt-16 dark: dark:bg-white'></div>
                    </div>
                    <div className="relative p-4 rounded-[5px] overflow-hidden mb-1">
                        {/* Full-Sized Image */}
                        <img
                            src={SectionTwo_One}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="relative z-10">
                            <h1 className='font-light text-[20px] text-white'>What is BlockState</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>BlockEstate is a blockchain-powered platform that transforms real estate investments by allowing users to own property blocks and earn secure, passive income.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40 "></div>
                    </div>
                    <div className="p-4 rounded-[5px]">
                        <h1 className='font-light text-[20px] dark:text-white'>How It Works</h1>
                        <p className='font-light text-[14px] mt-3 text-gray-400'>Create an account, explore featured properties, invest in blocks, and start earning proportional rental income—all seamlessly integrated with blockchain technology.</p>
                        <div className='w-16 h-[1px] bg-gray-400 mt-16 dark:bg-white'></div>
                    </div>
                </div>

                {/* Column 2: Tall Row + Short Row */}
                <div className="grid grid-rows-[2fr_1fr] gap-4">
                    <div className="relative p-4 rounded-[5px] overflow-hidden">
                        <img
                            src={SectionTwo_Two}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="z-10 absolute bottom-4">
                            <h1 className='font-light text-[20px] text-white'>Our Mission</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>We make real estate simple, secure, and accessible to all. Let's make big one.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    <div className="relative p-4 rounded-[5px] overflow-hidden">
                        <img
                            src={SectionTwo_Three}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="z-10 relative">
                            <h1 className='font-light text-[20px] text-white'>Our Unique Approach</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>BlockEstate is a blockchain-powered platform that transforms real estate investments by allowing users to own property blocks and earn secure, passive income.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                </div>

                {/* Column 3: Short Row + Tall Row (Fixed) */}
                <div className="grid grid-rows-[1fr_2fr] gap-4">
                    <div className="relative p-4 rounded-[5px] overflow-hidden">
                        <img
                            src={SectionTwo_Four}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="z-10 absolute bottom-4 pl-1">
                            <h1 className='font-light text-[20px] text-white'>Your Future with BlockEstate</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>Join us to redefine property ownership and build wealth.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                    <div className="relative p-4 rounded-[5px] overflow-hidden">
                        <img
                            src={SectionTwo_Five}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="z-10 relative">
                            <h1 className='font-light text-[20px] text-white'>Security & Transparency</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>Blockchain ensures secure, tamper-proof, and transparent transactions.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                </div>
            </section>

            <section className='md:hidden flex flex-col items-center justify-center'>
                <h1 className="font-light drop-shadow-md text-[28px] sm:text-[30px] md:text-[30px] lg:text-[35px] text-black dark:text-white text-center">What is BlockEstate</h1>
                <h2 className="font-light text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#999999] text-center mb-5">BlockEstate is a blockchain-powered platform that transforms real estate investments by allowing users to own property blocks and earn secure, passive income.</h2>

                <section className="h-full dark:bg-[var(--color-dark-bg-primary)] shadow-sm m-2 rounded-[5px] overflow-hidden relative w-[350px] sm:w-[500px] md:w-[600px] lg:w-[350px] xl:w-[400px]">
                    <div className="relative p-4 rounded-[5px] overflow-hidden h-44">
                        <img
                            src={SectionTwo_Two}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="z-10 absolute bottom-4">
                            <h1 className='font-light text-[20px] text-white'>Our Mission</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>We make real estate simple, secure, and accessible to all. Let's make big one.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                </section>

                <section className="h-44  dark:bg-[var(--color-dark-bg-primary)] shadow-sm m-2 rounded-[5px] overflow-hidden relative w-[350px] sm:w-[500px] md:w-[600px] lg:w-[350px] xl:w-[400px]">
                    <div className="relative p-4 rounded-[5px] overflow-hidden h-44">
                        <img
                            src={SectionTwo_Three}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="z-10 absolute bottom-4">
                            <h1 className='font-light text-[20px] text-white'>Our Unique Approach</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>Combining real estate with blockchain for smarter investments.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                </section>

                <section className="h-full bg-amber-400 dark:bg-[var(--color-dark-bg-primary)] shadow-sm m-2 rounded-[5px] overflow-hidden relative w-[350px] sm:w-[500px] md:w-[600px] lg:w-[350px] xl:w-[400px]">
                    <div className="relative p-4 rounded-[5px] overflow-hidden h-44">
                        <img
                            src={SectionTwo_Four}
                            alt="Background Image"
                            className="absolute inset-0 w-full h-full object-fit"
                        />

                        {/* Overlay Text */}
                        <div className="z-10 absolute bottom-4">
                            <h1 className='font-light text-[20px] text-white'>Your Future with BlockEstate</h1>
                            <p className='font-light text-[14px] mt-3 text-gray-200'>Join us to redefine property ownership and build wealth.</p>
                        </div>

                        {/* Optional: Dark Overlay for Better Visibility */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                </section>

            </section>
        </section>
    )
}