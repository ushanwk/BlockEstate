import NewYork from '../../../assets/images/website/homepage/SectionFive_NewYork.png'
import Mirissa from '../../../assets/images/website/homepage/SectionFive_Mirissa.png'
import Welignton from '../../../assets/images/website/homepage/SectionFive_Welignton.png'
import Stockholm from '../../../assets/images/website/homepage/SectionFive_Stockholm.png'

export const SectionFive = () => {
    return (
        <section className="pb-20 pt-5 flex flex-col items-center justify-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full">

                {/* Large Left Div */}
                <div className="flex flex-col justify-center p-4 rounded-[5px] md:col-span-2">
                    <h1 className='font-light text-[28px] dark:text-white'>Popular Cities</h1>
                    <p className='font-light text-[14px] mt-3 text-gray-400'>"Discover the ideal city that suits your lifestyle, preferences, and financial goals, whether you’re looking for your dream home or a high-return investment property. Explore different cities with various amenities, thriving communities, and strong growth potential to make an informed decision that aligns with both your personal and financial aspirations.</p>
                    <div className='w-16 h-[1px] bg-gray-400 mt-16 dark: dark:bg-white'></div>
                </div>

                {/* 4 Equal-Sized Right Divs */}
                <div className="grid grid-cols-2 md:grid-cols-2 md:col-span-3 gap-4">
                    {/* Box 1 */}
                    <div className="relative flex items-center justify-center text-white p-4 rounded-[5px] h-[200px] sm:h-[200px] md:h-[200px] hover:scale-101">
                        <img
                            src={NewYork}
                            alt="Box 1"
                            className="absolute inset-0 w-full h-full object-cover rounded-[5px]"
                        />
                        {/* Black Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-[5px]"></div>

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <h3 className="text-lg font-medium shadow-md">New York</h3>
                            <p className="text-sm font-light shadow-md">United States</p>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className="relative flex items-center justify-center text-white p-4 rounded-[5px] h-[200px] sm:h-[200px] md:h-[200px] hover:scale-101">
                        <img
                            src={Welignton}
                            alt="Box 2"
                            className="absolute inset-0 w-full h-full object-cover rounded-[5px]"
                        />
                        {/* Black Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-[5px]"></div>

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <h3 className="text-lg font-medium shadow-md">Wellington</h3>
                            <p className="text-sm font-light shadow-md">New Zealand</p>
                        </div>
                    </div>

                    {/* Box 3 */}
                    <div className="relative flex items-center justify-center text-white p-4 rounded-[5px] h-[200px] sm:h-[200px] md:h-[200px] hover:scale-101">
                        <img
                            src={Mirissa}
                            alt="Box 3"
                            className="absolute inset-0 w-full h-full object-cover rounded-[5px]"
                        />
                        {/* Black Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-[5px]"></div>

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <h3 className="text-lg font-medium shadow-md">Mirissa</h3>
                            <p className="text-sm font-light shadow-md">Sri Lanka</p>
                        </div>
                    </div>

                    {/* Box 4 */}
                    <div className="relative flex items-center justify-center text-white p-4 rounded-[5px] h-[200px] sm:h-[200px] md:h-[200px] hover:scale-101">
                        <img
                            src={Stockholm}
                            alt="Box 4"
                            className="absolute inset-0 w-full h-full object-cover rounded-[5px]"
                        />
                        {/* Black Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-[5px]"></div>

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <h3 className="text-lg font-medium shadow-md">Stockholm</h3>
                            <p className="text-sm font-light shadow-md">Sweden</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}