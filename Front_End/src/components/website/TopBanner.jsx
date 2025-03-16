export const TopBanner = ({ title, nav, image }) => {
    return (
        <section>
            <div
                className="relative h-95 bg-cover bg-bottom flex items-center justify-center text-white text-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-[#003975] opacity-60 dark:bg-[#181823]"></div>

                <div className="relative z-10 mt-10">
                    <h2 className="text-[35px] font-light shadow-sm"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >{title}</h2>

                    <p className="text-[15px] mt-2 font-light"
                       style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >Home &gt; {nav}</p>
                </div>
            </div>
        </section>
    )
}