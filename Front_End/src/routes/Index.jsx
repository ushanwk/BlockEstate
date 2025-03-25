import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WebsiteLayout} from "../layouts/WebsiteLayout.jsx";
import {HomePage} from "../pages/website/homepage/HomePage.jsx";
import {AboutPage} from "../pages/website/aboutpage/AboutPage.jsx";
import {AuthLayout} from "../layouts/AuthLayout.jsx";
import {LoginPage} from "../pages/auth/common/LoginPage.jsx";
import {InvestorRegisterPage} from "../pages/auth/investor/InvestorRegisterPage.jsx";
import {ContactPage} from "../pages/website/contactpage/ContactPage.jsx";
import {AgencyRegisterPage} from "../pages/auth/agency/AgencyRegisterPage.jsx";
import {TypeSelectPage} from "../pages/auth/common/TypeSelectPage.jsx";
import {OTPVerifyPage} from "../pages/auth/common/OTPVerifyPage.jsx";
import {ForgetPasswordPage} from "../pages/auth/forgetpassword/ForgetPasswordPage.jsx";
import {NewPasswordPage} from "../pages/auth/forgetpassword/NewPasswordPage.jsx";

export const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Website Routes */}
                <Route path="/" element={<WebsiteLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="properties" element={<ContactPage />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="type" element={<TypeSelectPage />} />
                    <Route path="otp" element={<OTPVerifyPage />} />
                    <Route path="forget" element={<ForgetPasswordPage />} />
                    <Route path="new-password" element={<NewPasswordPage />} />
                    <Route path="investor-register" element={<InvestorRegisterPage />} />
                    <Route path="agency-register" element={<AgencyRegisterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}