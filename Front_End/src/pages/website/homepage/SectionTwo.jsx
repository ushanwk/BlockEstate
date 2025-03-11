import {GridViewCard} from "../../../components/property_cards/GridViewCard.jsx";
import PropertyOne from '../../../assets/images/samples/PropertyOne.png'

export const SectionTwo = () => {
    return (
        <section className="py-32 bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] flex flex-col items-center justify-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px]">
            <h1 className="font-light drop-shadow-md text-[20px] sm:text-[30px] md:text-[30px] lg:text-[35px] text-black dark:text-white text-center">Discover Our Featured Listings</h1>
            <h2 className="font-light text-[10px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#999999] text-center">Browse our top properties and start investing in high-value blocks</h2>

            <div className="mt-12 w-full flex flex-wrap justify-center">
                <GridViewCard img={PropertyOne} />
                <GridViewCard img={PropertyOne} />
                <GridViewCard img={PropertyOne} />
            </div>

        </section>
    )
}