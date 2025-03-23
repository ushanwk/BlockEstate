import {TopBanner} from "../../../components/website/TopBanner.jsx";
import TopImage from '../../../assets/images/website/contactpage/ContactTopImage.png'
import Phone from '../../../assets/icons/website/contactpage/Phone.png'
import Email from '../../../assets/icons/website/contactpage/Email.png'
import Location from '../../../assets/icons/website/contactpage/Location.png'
import {Button} from "../../../components/common/Button.jsx";
import {TextField} from "../../../components/common/TextField.jsx";

export const ContactPage = () => {
    return (
        <section>
            <TopBanner
                title="Contact BlockEstate"
                breadcrumb="Contact"
                image={TopImage}
            />

            <section className="py-24 px-[25px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[200px] text-center md:text-left bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)]">

                <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div>
                        <h1 className="text-[25px] md:text-[30px] font-light text-center md:text-left dark:text-white mt-8">Contact Us</h1>
                        <p className="text-[#999999] text-[16px] font-light">We're here to assist you anytime</p>

                        <div className="mt-8 space-y-6">
                            <p className="text-[#999999] text-[14px] mb-10 font-light">
                                Have questions or <span className="text-black dark:text-white">need assistance?</span>  We're here to help! Reach out to us for any inquiries about donations, charity partnerships, or general support. Our team is <span className="text-black dark:text-white">ready to assist you</span> with the best solutions.
                            </p>

                            <div className="flex flex-col items-center md:items-start pb-5">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center space-x-4">
                                        <img src={Phone} alt="phone" className="w-[40px]
                                        h-auto" />
                                        <div>
                                            <p className="text-[12px] text-[#999999] font-light">Contact Number</p>
                                            <p className="font-[15px] font-light dark:text-white">(+94) 71 4742 066</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <img src={Email} alt="email" className="w-[40px] h-auto" />
                                        <div>
                                            <p className="text-[12px] text-[#999999] font-light">Email</p>
                                            <p className="font-[15px] font-light dark:text-white">Blockestate.info@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <img src={Location} alt="location" className="w-[40px] h-auto" />
                                        <div>
                                            <p className="text-[12px] text-[#999999] font-light">Location</p>
                                            <p className="font-[15px] font-light dark:text-white">Bosewell place, Colombo 06, Srilanka</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t py-8 border-[#999999] w-full flex items-center md:items-start">
                                <div className="w-full">
                                    <h3 className="text-[14px] font-medium dark:text-white">Business Hours</h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-[12px] text-[#999999]">Monday to Friday: 9 AM – 6 PM</p>
                                        <p className="text-[12px] text-[#999999]">Saturday: 10 AM – 2 PM</p>
                                        <p className="text-[12px] text-[#999999]">Sunday: Closed</p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <h3 className="text-[14px] font-medium dark:text-white">Support Policy</h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-[12px] text-[#999999]">
                                            We aim to respond to all inquiries <br/> within 24 hours. For urgent <br/> matters, please call us directly
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="bg-white dark:bg-[var(--color-dark-bg-primary)] p-12 rounded-[5px] shadow-lg">
                        <h2 className="text-[25px] md:text-[30px] font-light text-center md:text-left dark:text-white">Get in touch</h2>
                        <p className="text-[#999999] text-[16px] font-light">Drop us a message today!</p>

                        <form className="mt-12 flex flex-col gap-3">
                            <div className="flex justify-between gap-8 w-full">
                                <div className='w-full'>
                                    <TextField label="First Name" />
                                </div>

                                <div className="w-full">
                                    <TextField label="Last Name" />
                                </div>
                            </div>

                            <TextField label="Email" />

                            <TextField label="Message" />

                            <div className="mt-6">
                                <Button children="Send Message"/>
                            </div>
                        </form>
                    </div>


                </div>


            </section>
        </section>
    )
}