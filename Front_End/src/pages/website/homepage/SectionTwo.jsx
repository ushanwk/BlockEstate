import {GridViewCard} from "../../../components/property_cards/GridViewCard.jsx";
import PropertyOne from '../../../assets/images/samples/PropertyOne.png'
import PropertyTwo from '../../../assets/images/samples/PropertyTwo.png'
import PropertyThree from '../../../assets/images/samples/PropertyThree.png'
import AgencyOne from '../../../assets/images/samples/AgencyOne.png'
import AgencyTwo from '../../../assets/images/samples/AgencyTwo.png'
import AgencyThree from '../../../assets/images/samples/AgencyThree.png'



export const SectionTwo = () => {

    const sample_data = [
        {
            image: PropertyOne,
            title: 'New Southern Apartment',
            address: '25 Great King St, Dunedin, Southern, New Zeland',
            size: '1200',
            house: '5',
            room: '3',
            garage: '1',
            agency_pic: AgencyOne,
            agency_name: 'Borcelle Construction',
            days: '22',
            price: '12000',
            town: 'Washington',
        },
        {
            image: PropertyTwo,
            title: 'Walk-up Residencies',
            address: '54 Argyll Road, Llandrillo, United Kindom',
            size: '1500',
            house: '7',
            room: '2',
            garage: '3',
            agency_pic: AgencyTwo,
            agency_name: 'Construction Center',
            days: '12',
            price: '15000',
            town: 'New York',
        },
        {
            image: PropertyThree,
            title: 'Sun Way Path Houses',
            address: '2811 Harvest Lane, Los Angeles, California, USA',
            size: '2000',
            house: '10',
            room: '5',
            garage: '1',
            agency_pic: AgencyThree,
            agency_name: 'Leanardo Agencies',
            days: '6',
            price: '22000',
            town: 'Mirissa',
    },
    ]

    return (
        <section className="py-32 bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] flex flex-col items-center justify-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px]">
            <h1 className="font-light drop-shadow-md text-[20px] sm:text-[30px] md:text-[30px] lg:text-[35px] text-black dark:text-white text-center">Discover Our Featured Listings</h1>
            <h2 className="font-light text-[10px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#999999] text-center">Browse our top properties and start investing in high-value blocks</h2>

            <div className="mt-12 w-full flex flex-wrap justify-center">
                <GridViewCard img={sample_data[0].image} title={sample_data[0].title} address={sample_data[0].address} town={sample_data[0].town} size={sample_data[0].size} house={sample_data[0].house} room={sample_data[0].room} garage={sample_data[0].garage} days={sample_data[0].days} agency={sample_data[0].agency_name} agency_img={sample_data[0].agency_pic} price={sample_data[0].price} />
                <GridViewCard img={sample_data[1].image} title={sample_data[1].title} address={sample_data[1].address} town={sample_data[1].town} size={sample_data[1].size} house={sample_data[1].house} room={sample_data[1].room} garage={sample_data[1].garage} days={sample_data[1].days} agency={sample_data[1].agency_name} agency_img={sample_data[1].agency_pic} price={sample_data[1].price} />
                <GridViewCard img={sample_data[2].image} title={sample_data[2].title} address={sample_data[2].address} town={sample_data[2].town} size={sample_data[2].size} house={sample_data[2].house} room={sample_data[2].room} garage={sample_data[2].garage} days={sample_data[2].days} agency={sample_data[2].agency_name} agency_img={sample_data[2].agency_pic} price={sample_data[2].price} />
            </div>

        </section>
    )
}