import LogoBarColor from '../../assets/icons/common/LogoBarColor.png'

export const CommonAuth = ({section, image, topic, text}) => {
    return (
        <section className='xl:w-[1200px] lg:w-[1000px] md:w-[700px] sm:w-[90%] w-full h-full sm:h-[800px] md:h-[800px] lg:h-[800px] bg-white dark:bg-[var(--color-dark-bg-secondary)] flex rounded-[10px]'>
            <section className='w-full'>
                <div className="flex justify-between items-center">
                    <img src={LogoBarColor} alt="logo" className="max-w-[180px] h-auto mt-[50px] lg:ml-[50px] mx-auto"/>
                </div>

                <div className="xl:px-13 lg:px-8 md:px-10 sm:px-8 px-8 py-8">
                    {section}
                </div>
            </section>

            <section className='p-[15px] w-full hidden lg:block relative'>
                <div className="h-full rounded-[10px] w-full relative">
                    <img src={image} className="h-full object-cover rounded-[10px] w-full" alt="Login"/>
                    <div className="absolute inset-0 bg-[#003F82]/40 flex flex-col items-center justify-end p-8 text-white rounded-[10px]">
                        <h2 className="text-[26px] font-light text-center max-w-[350px]">{topic}</h2>
                        <p className="text-[14px] font-light text-center mt-2 max-w-[400px]">{text}</p>
                    </div>
                </div>
            </section>
        </section>
    )
}