import {TopBanner} from "../../../components/website/TopBanner.jsx";
import AboutTopImage from "../../../assets/images/website/aboutpage/AboutTopImage.png";
import {SectionOne} from "./SectionOne.jsx";
import {SectionTwo} from "./SectionTwo.jsx";
import {SectionThree} from "./SectionThree.jsx";
import {Agencies} from "../../../components/website/Agencies.jsx";
import {Testimonials} from "../../../components/website/Testimonials.jsx";

export const AboutPage = () => {
    return (
        <main>
            <TopBanner image={AboutTopImage} nav={"About"} title={"About BlockEstate"} />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <Agencies />
            <Testimonials />
        </main>
    )
}