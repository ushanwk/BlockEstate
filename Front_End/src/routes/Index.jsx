import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WebsiteLayout} from "../layouts/WebsiteLayout.jsx";
import {HomePage} from "../pages/website/HomePage.jsx";
import {AboutPage} from "../pages/website/AboutPage.jsx";

export const Index = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<WebsiteLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                </Route>

            </Routes>

        </BrowserRouter>
    )
}