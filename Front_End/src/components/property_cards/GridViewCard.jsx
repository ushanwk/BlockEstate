import HeartWhite from '../../assets/icons/HeartWhite.png'
import MaximizeWhite from '../../assets/icons/MaximizeWhite.png'
import Size from '../../assets/icons/Size.png'
import House from '../../assets/icons/House.png'
import Room from '../../assets/icons/Rooms.png'
import Garage from '../../assets/icons/Garage.png'


export const GridViewCard = ({ img }) => {
    return (
        <section className="h-full bg-white dark:bg-[var(--color-dark-bg-primary)] shadow-sm m-2 rounded-[5px] overflow-hidden relative w-[350px] sm:w-[500px] md:w-[600px] lg:w-[22vw] xl:w-[22vw] hover:scale-101">
            {/* Image Section with Overlay */}
            <div className="relative w-full h-2/3">
                <img
                    src={img}
                    alt="Your Image"
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

                {/* Text Content on Overlay */}
                <div className="absolute inset-0 p-4 text-white text-sm">
                    <div className="absolute top-4 left-4 cursor-default">
                        <p className='text-[10px] text-white bg-[var(--color-primary)] px-2 py-1 rounded-sm hover:scale-105'>Sponsored</p>
                    </div>
                    <div className="absolute top-4 right-4 cursor-default">
                        <p className='text-[10px] text-white bg-[#808080] px-2 py-1 rounded-sm hover:scale-105'>New York</p>
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <h1 className='font-medium text-2xl'>$12,0000</h1>
                        <p>per block</p>
                    </div>
                    <div className="absolute bottom-4 right-4  flex gap-2">
                        <div className='bg-white/30 dark:bg-[var(--color-dark-bg-primary)]/50 p-2 rounded-[5px] hover:scale-105'>
                            <img src={HeartWhite}  alt="Heart" width={20}/>
                        </div>
                        <div className='bg-white/30 dark:bg-[var(--color-dark-bg-primary)]/50 p-2 rounded-[5px] hover:scale-105'>
                            <img src={MaximizeWhite}  alt="Heart" width={20}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Content */}
            <div className="p-4">
                <h3 className="text-lg font-light dark:text-white">New Southern Apartment</h3>
                <p className="text-[12px] text-gray-400 font-light">25 Great King St, Dunedin, Southern, New Zeland</p>
                <div className='mt-4 flex gap-4'>
                    <div className='flex gap-2'>
                        <img src={Size} width={15} />
                        <p className="text-[10px] text-white font-medium">12</p>
                    </div>
                    <div className='bg-black'></div>
                    <div className='bg-black'></div>
                    <div className='bg-black'></div>
                </div>
            </div>
        </section>
    );
};
