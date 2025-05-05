import {Header} from "../../../components/agency/Header.jsx";

export const AgencyDashboard = () => {
    return (
        <main>
            <Header />

            <section className="w-full mt-16">
                <h1 className="dark:text-white text-[30px] font-light">Hello Ushan!</h1>
                <p className="text-[12px] font-light mt-[-5px] text-[#999999]">Effortlessly Manage your properties and transactions.</p>
            </section>
        </main>
    )
}