import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import {Outlet} from "react-router-dom";

export const WebsiteLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}