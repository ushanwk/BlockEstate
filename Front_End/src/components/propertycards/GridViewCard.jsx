import HeartWhite from '../../assets/icons/HeartWhite.png'
import MaximizeWhite from '../../assets/icons/MaximizeWhite.png'
import { Paperclip } from "lucide-react";
import House from '../../assets/icons/House.png'
import Room from '../../assets/icons/Rooms.png'
import Garage from '../../assets/icons/Garage.png'
import Size from '../../assets/icons/Size.png'



export const GridViewCard = ({ img, town, price, title, address, size, house, room, garage, agency_img, agency, days }) => {
    return (
        <section className="h-full bg-white dark:bg-[var(--color-dark-bg-primary)] shadow-sm m-2 rounded-[5px] overflow-hidden relative w-[90vw] sm:w-[90vw] md:w-[600px] lg:w-[350px] xl:w-[400px] hover:scale-101">
            {/* Image Section with Overlay */}
            <div className="relative w-full h-2/3">
                <img
                    src={img}
                    alt="Image"
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
                        <p className='text-[10px] text-white bg-[#808080] px-2 py-1 rounded-sm hover:scale-105'>{town}</p>
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <h1 className='font-medium text-2xl'>${price}</h1>
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
                <h3 className="text-lg font-light dark:text-white">{title}</h3>
                <p className="text-[12px] text-gray-400 font-light">{address}</p>

                <div className='mt-5 mb-5 flex gap-4'>
                    <div className='flex gap-2'>
                        <img src={Size} width={15} />
                        <p className="text-[10px] dark:text-white  font-medium">{size}sq ft</p>
                    </div>
                    <div className='flex gap-2'>
                        <img src={House} width={15} />
                        <p className="text-[10px] dark:text-white font-medium">{house}</p>
                    </div>
                    <div className='flex gap-2'>
                        <img src={Room} width={15} />
                        <p className="text-[10px] dark:text-white font-medium">{room}</p>
                    </div>
                    <div className='flex gap-2'>
                        <img src={Garage} width={15} />
                        <p className="text-[10px] dark:text-white font-medium">{garage}</p>
                    </div>
                </div>

                <div className='w-full h-[1px] bg-gray-200 dark:bg-gray-700'></div>

                <div className='flex justify-between mt-3'>
                    <div className='flex gap-2 items-center'>
                        <img
                            src={agency_img}
                            alt="Circular Image"
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <p className="text-[10px] dark:text-gray-300 text-gray-700">{agency}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Paperclip size={12} strokeWidth={1.5} className="dark:text-gray-200 text-gray-800" />
                        <p className="text-[10px] dark:text-gray-300 text-gray-700">{days} days ago</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
