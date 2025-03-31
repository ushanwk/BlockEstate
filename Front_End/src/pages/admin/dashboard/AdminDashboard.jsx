import {Header} from "../../../components/admin/Header.jsx";
import AgencyCount from '../../../assets/icons/admin/dashboard/AgencyCount.png';
import InvestorCount from '../../../assets/icons/admin/dashboard/InvestorCount.png';
import PropertyCount from '../../../assets/icons/admin/dashboard/PropertyCount.png';
import ResaleCount from '../../../assets/icons/admin/dashboard/ResaleCount.png';

export const AdminDashboard = () => {
    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Hello Ushan!</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Effortlessly Manage properties, users, and transactions.</p>
            </section>

            <section className="w-full mt-10 flex justify-between">
                <div className="w-[24%] h-18 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 hover:scale-101 flex gap-4 items-center justify-center">
                    <div className="flex gap-4 justify-center items-center">
                        <img src={PropertyCount} className="w-6"  alt="Property"/>
                        <p className="text-[#999999] font-light">Properties</p>
                    </div>

                    <div>
                        <p className="dark:text-white">1200</p>
                    </div>
                </div>

                <div className="w-[24%] h-18 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 hover:scale-101 flex gap-4 items-center justify-center">
                    <div className="flex gap-4 justify-center items-center">
                        <img src={AgencyCount} className="w-6"  alt="Property"/>
                        <p className="text-[#999999] font-light">Agencies</p>
                    </div>

                    <div>
                        <p className="dark:text-white">40</p>
                    </div>
                </div>

                <div className="w-[24%] h-18 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 hover:scale-101 flex gap-4 items-center justify-center">
                    <div className="flex gap-4 justify-center items-center">
                        <img src={InvestorCount} className="w-6"  alt="Property"/>
                        <p className="text-[#999999] font-light">Investors</p>
                    </div>

                    <div>
                        <p className="dark:text-white">8000</p>
                    </div>
                </div>

                <div className="w-[24%] h-18 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 hover:scale-101 flex gap-4 items-center justify-center">
                    <div className="flex gap-4 justify-center items-center">
                        <img src={ResaleCount} className="w-6"  alt="Property"/>
                        <p className="text-[#999999] font-light">Properties</p>
                    </div>

                    <div>
                        <p className="dark:text-white">1000</p>
                    </div>
                </div>
            </section>

            <section className="w-full h-96 mt-8 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 py-5 px-6">
                <h1 className="dark:text-white text-[18px] font-light">Platform Growth Analytics</h1>
            </section>

            <section className="flex gap-5 mt-8">
                <section className="w-full h-96 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 py-5 px-6">
                    <h1 className="dark:text-white text-[18px] font-light">Platform Growth Analytics</h1>
                </section>

                <section className="w-full h-96 rounded-[5px] bg-white dark:bg-[var(--color-dark-bg-primary)] border border-[var(--color-primary)]/10 py-5 px-6">
                    <h1 className="dark:text-white text-[18px] font-light">Platform Growth Analytics</h1>
                </section>
            </section>
        </main>
    )
}