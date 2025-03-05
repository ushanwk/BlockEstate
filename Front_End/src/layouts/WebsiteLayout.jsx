import {Header} from "../components/website/Header.jsx";
import {Footer} from "../components/website/Footer.jsx";
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