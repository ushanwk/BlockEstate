import LogoBarColor from '../../assets/icons/LogoBarColor.png'

export const CommonAuth = ({section}) => {
    return (
        <section className='w-[1100px] h-[700px] bg-white flex'>
            <section className='border-2 w-full'>
                <img src={LogoBarColor} />
                {section}
            </section>

            <section className='border-2 w-full hidden lg:block'>

            </section>
        </section>
    )
}