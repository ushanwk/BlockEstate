export const SectionOne = () => {
    return (
        <section className="py-24 px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px] text-center md:text-left">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[25px] md:text-[30px] font-light text-center md:text-left mb-8 dark:text-white">
                    Redefining Real Estate with Innovation
                </h2>
                <div className="grid md:grid-cols-2 gap-4 text-[15px] text-[#999999] dark:text-gray-400 dark: font-light">
                    <div>
                        <p>
                            BlockEstate is a <strong className="text-black dark:text-white">blockchain-powered</strong> real estate platform that ensures{" "}
                            <strong className="text-black dark:text-white">security, transparency, and accessibility</strong> for property investments. Users can invest in{" "}
                            <strong className="text-black dark:text-white">property blocks</strong>, earn passive income, and manage transactions effortlessly.
                        </p>
                        <p className="mt-6">
                            With tamper-proof ownership records, seamless transactions, and automated income distribution, BlockEstate provides a{" "}
                            <strong className="text-black dark:text-white">secure and efficient</strong> real estate solution for both investors and agencies.
                        </p>
                    </div>
                    <div>
                        <p>
                            Our vision is to make real estate investments accessible and profitable for everyone by introducing{" "}
                            <strong className="text-black dark:text-white">fractional ownership</strong> and blockchain security. We aim to create a{" "}
                            <strong className="text-black dark:text-white">decentralized, efficient, and trustworthy</strong> property marketplace.
                        </p>
                        <p className="mt-6">
                            Our mission is to <strong className="text-black dark:text-white">empower investors</strong> and agencies with a platform that offers secure transactions, passive income opportunities, and{" "}
                            <strong className="text-black dark:text-white">simplified property management</strong> through innovative technology.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}