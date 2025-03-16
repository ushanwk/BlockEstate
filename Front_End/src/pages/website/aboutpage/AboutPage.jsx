import {TopBanner} from "../../../components/website/TopBanner.jsx";
import AboutTopImage from "../../../assets/images/website/aboutpage/AboutTopImage.png";
import {SectionOne} from "./SectionOne.jsx";
import {SectionTwo} from "./SectionTwo.jsx";

export const AboutPage = () => {
    return (
        <main>
            <TopBanner image={AboutTopImage} nav={"About"} title={"About BlockEstate"} />
            <SectionOne />
            <SectionTwo />
        </main>
    )
}