import Card1 from '../../../assets/images/website/aboutpage/Sec3_Card1.png'
import Card2 from '../../../assets/images/website/aboutpage/Sec3_Card2.png'
import Card3 from '../../../assets/images/website/aboutpage/Sec3_Card3.png'
import Card4 from '../../../assets/images/website/aboutpage/Sec3_Card4.png'
import Card5 from '../../../assets/images/website/aboutpage/Sec3_Card5.png'
import Card6 from '../../../assets/images/website/aboutpage/Sec3_Card6.png'


export const SectionThree = () => {

    const services = [
        {
            title: "Property Block Investment",
            description: "Invest in fractional property blocks and earn passive rental income securely via blockchain. Security is high.",
            image: Card1
        },
        {
            title: "Property Listing for Agencies",
            description: "Agencies can easily list properties and manage rentals through a seamless user-friendly interface.",
            image: Card2,
        },
        {
            title: "Fractional Ownership",
            description: "Own fractional shares of properties, allowing for diversified investments with minimal capital.",
            image: Card3,
        },
        {
            title: "Secure Transactions",
            description: "Experience tamper-proof transactions with blockchain, ensuring the safety and transparency of your investments.",
            image: Card4,
        },
        {
            title: "Automated Income Distribution",
            description: "Earn automated, transparent income distribution directly into your blockchain wallet, based on ownership.",
            image: Card5,
        },
        {
            title: "Blockchain Wallets",
            description: "Create secure blockchain wallets automatically during registration, simplifying transactions and asset management.",
            image: Card6,
        },
    ];

    return (
        <section className="px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px]">
            <div className="py-16 max-w-7xl mx-auto">
                <h2 className="text-[25px] md:text-[30px] font-light text-center md:text-left dark:text-white">Our Services</h2>
                <p className="text-[#999999] text-[16px] font-light text-center md:text-left mb-10">Innovative solutions for investments</p>

                <div className="grid lg:grid-cols-4 gap-4">
                    <div className="grid grid-cols-2 gap-4 col-span-2">
                        {services.slice(0, 4).map((service, index) => (
                            <div
                                key={index}
                                className="relative bg-gray-800 rounded-[5px] overflow-hidden shadow-md group"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-[320px] object-cover group-hover:scale-102 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                                    <h3 className="text-white text-[16px] font-regular">{service.title}</h3>
                                    <p className="text-white/75 font-regular text-[11px]">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 col-span-2">
                        {services.slice(4).map((service, index) => (
                            <div
                                key={index}
                                className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md group h-full"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                                    <h3 className="text-white text-[16px] font-regular">{service.title}</h3>
                                    <p className="text-white/75 font-regular text-[11px]">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}