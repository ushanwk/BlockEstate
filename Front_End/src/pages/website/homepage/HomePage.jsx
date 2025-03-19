import {Button} from "../../../components/common/Button.jsx";
import {SectionOne} from "./SectionOne.jsx";
import {SectionTwo} from "./SectionTwo.jsx";
import {SectionThree} from "./SectionThree.jsx";
import {SectionFour} from "./SectionFour.jsx";
import {SectionFive} from "./SectionFive.jsx";
import {Agencies} from "../../../components/website/Agencies.jsx";
import {Testimonials} from "../../../components/website/Testimonials.jsx";

export const HomePage = () => {


    return (
        <main>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <Agencies />
            <Testimonials />
        </main>
    )
}