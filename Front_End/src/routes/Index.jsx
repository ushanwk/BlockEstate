import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WebsiteLayout} from "../layouts/WebsiteLayout.jsx";
import {HomePage} from "../pages/website/homepage/HomePage.jsx";
import {AboutPage} from "../pages/website/aboutpage/AboutPage.jsx";
import {AuthLayout} from "../layouts/AuthLayout.jsx";
import {LoginPage} from "../pages/auth/LoginPage.jsx";
import {RegisterTypePage} from "../pages/auth/RegisterTypePage.jsx";
import {ContactPage} from "../pages/website/contactpage/ContactPage.jsx";

export const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Website Routes */}
                <Route path="/" element={<WebsiteLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="type" element={<RegisterTypePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}