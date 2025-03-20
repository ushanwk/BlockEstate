import LogoBarColor from '../../assets/icons/common/LogoBarColor.png'
import {TextField} from "../../components/common/TextField.jsx";

export const CommonAuth = ({section}) => {
    return (
        <section className='w-[1100px] h-[700px] bg-white flex'>
            <section className='border-2 w-full'>
                <img src={LogoBarColor} />
                {section}
            </section>

            <section className='border-2 w-full hidden lg:block'>
                <TextField placeholder={"Hello"} />
            </section>
        </section>
    )
}