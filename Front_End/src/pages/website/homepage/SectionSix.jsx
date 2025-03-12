import AgencyOne from '../../../assets/images/samples/AgencyOne.png'
import AgencyTwo from '../../../assets/images/samples/AgencyTwo.png'

export const SectionSix = () => {
    return (
        <section className="py-20 flex flex-col items-center justify-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px] border-t-1 border-gray-200 dark:border-gray-700">
            <h1 className="font-light drop-shadow-md text-[20px] sm:text-[30px] md:text-[30px] lg:text-[35px] text-black dark:text-white text-center">Our Top Real Estate Agencies</h1>
            <h2 className="font-light text-[10px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#999999] text-center">Connecting You with the Most Reputable Real Estate Experts</h2>

            <section className="pt-12 pb-5 flex items-center justify-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px] gap-3 xl:flex-nowrap flex-wrap">
                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyOne} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Borcelle Contructions</p>
                </div>

                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyTwo} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Contruction Ceter</p>
                </div>

                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyOne} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Borcelle Contructions</p>
                </div>

                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyTwo} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Contruction Ceter</p>
                </div>

                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyOne} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Borcelle Contructions</p>
                </div>
            </section>

            <section className="flex items-center justify-center px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px] gap-3 xl:flex-nowrap flex-wrap">
                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyOne} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Borcelle Contructions</p>
                </div>

                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyTwo} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Contruction Ceter</p>
                </div>

                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyOne} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Borcelle Contructions</p>
                </div>

                <div className="w-52 h-12 border-[1px] border-gray-300 dark:border-gray-500 rounded-full px-3 flex items-center gap-3">
                    <img src={AgencyTwo} alt="AgencyOne" className='w-8' />
                    <p className='text-[12px] font-medium dark:text-white'>Contruction Ceter</p>
                </div>
            </section>

        </section>
    )
}