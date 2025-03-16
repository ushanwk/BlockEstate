import {TeamCard} from "../../../components/teamcard/TeamCard.jsx";
import CeoImage from "../../../assets/images/website/aboutpage/CeoImage.png";
import ChiefTechImage from "../../../assets/images/website/aboutpage/ChiefTechImage.png";
import MarketingManagerImage from "../../../assets/images/website/aboutpage/MarketingManager.png";
import HeadDevImage from "../../../assets/images/website/aboutpage/HeadDev.png";

const teamMembers = [
    {
        name: "Ushan Kaushalya",
        role: "Founder & CEO",
        image: CeoImage,
        description:
            "Tharushi is the visionary behind BlockEstate, dedicated to bridging the gap between donors and charities. Her leadership drives innovation, transparency, and impactful giving.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
    {
        name: "Sophia Reynolds",
        role: "Chief Technology Officer",
        image: ChiefTechImage,
        description:
            "Mark oversees BlockEstate’s technology, ensuring a seamless, secure, and user-friendly experience. His expertise in web and data security keeps donations and causes safe.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
    {
        name: "Emily Foster",
        role: "Marketing Manager",
        image: MarketingManagerImage,
        description:
            "Emily leads the marketing efforts at BlockEstate, spreading awareness and connecting compassionate donors with meaningful causes through strategic campaigns.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
    {
        name: "Daniel Hayes",
        role: "Head of Development",
        image: HeadDevImage,
        description:
            "Daniel specializes in blockchain architecture and security, ensuring seamless integration of blockchain technology into BlockEstate. His expertise drives the platform’s secure transactions, asset management, and decentralization to create a trusted real estate ecosystem.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
];

export const SectionTwo = () => {
    return (
        <section className="py-16 pt-15 bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] text-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px]">
            <h2 className="text-[25px] md:text-[30px] font-light dark:text-white">Visionaries Behind HopeFund</h2>
            <p className="text-[#999999] text-[16px] font-light">
                Meet the passionate minds driving HopeFund’s mission forward.
            </p>
            <div className="mt-14 flex flex-wrap justify-center gap-7">
                {teamMembers.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>
        </section>
    )
}