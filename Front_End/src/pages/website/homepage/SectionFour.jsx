import SectionFour_Map from '../../../assets/images/website/homepage/SectionFour_Map.png'
import SectionFour_Map_Dark from '../../../assets/images/website/homepage/SectionFour_Map_Dark.png'


export const SectionFour = () => {
    return (
        <section className='w-full h-auto py-10'>
            <h1 className="font-light drop-shadow-md text-[20px] sm:text-[30px] md:text-[30px] lg:text-[35px] text-black dark:text-white text-center">Discover Our Featured Listings</h1>
            <h2 className="font-light text-[10px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#999999] text-center">Browse our top properties and start investing in high-value blocks</h2>

            <img src={SectionFour_Map} alt="map" className='mt-10 dark:hidden'/>
            <img src={SectionFour_Map_Dark} alt="map" className='mt-10 hidden dark:block'/>
        </section>
    )
}