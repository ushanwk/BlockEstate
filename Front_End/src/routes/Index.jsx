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
import {InvestorAccountSetupPage} from "../pages/auth/investor/InvestorAccountSetupPage.jsx";
import {AgencyAccountSetup} from "../pages/auth/agency/AgencyAccountSetup.jsx";
import {AgencyApprovePage} from "../pages/auth/agency/AgencyApprovePage.jsx";
import {AdminDashboardLayout} from "../layouts/AdminDashboardLayout.jsx";
import {AdminDashboard} from "../pages/admin/dashboard/AdminDashboard.jsx";
import {UserManagement} from "../pages/admin/user/UserManagement.jsx";
import {SingleUserManagement} from "../pages/admin/user/SingleUserManagement.jsx";
import {AgenciesManagement} from "../pages/admin/agency/AgenciesManagement.jsx";
import {SingleAgencyManagement} from "../pages/admin/agency/SingleAgencyManagement.jsx";
import {AgencyDashboardLayout} from "../layouts/AgencyDashboardLayout.jsx";
import {AgencyDashboard} from "../pages/agency/dashboard/AgencyDashboard.jsx";
import {PropertyManagement} from "../pages/agency/property/PropertyManagement.jsx";
import {ProfileManagement} from "../pages/agency/profile/ProfileManagement.jsx";
import {SponsorshipManagement} from "../pages/agency/sponsorship/SponsorshipManagement.jsx";
import {FinanceManagement} from "../pages/agency/financial/FinanceManagement.jsx";
import {AddNewProperty} from "../pages/agency/property/AddNewProperty.jsx";
import {SinglePropertyManagement} from "../pages/agency/property/SinglePropertyManagement.jsx";

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
                    <Route path="investor-setup" element={<InvestorAccountSetupPage />} />

                    <Route path="agency-register" element={<AgencyRegisterPage />} />
                    <Route path="agency-setup" element={<AgencyAccountSetup />} />
                    <Route path="agency-approve" element={<AgencyApprovePage />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboardLayout />}>
                    <Route index element={<AdminDashboard />} />

                    <Route path="user" element={<UserManagement />} />
                    <Route path="user/:userId" element={<SingleUserManagement />} />

                    <Route path="property" element={<UserManagement />} />

                    <Route path="agency" element={<AgenciesManagement />} />
                    <Route path="agency/:agencyId" element={<SingleAgencyManagement />} />


                    <Route path="resale" element={<UserManagement />} />
                    <Route path="transaction" element={<UserManagement />} />
                    <Route path="sponsored" element={<UserManagement />} />
                    <Route path="analytic" element={<UserManagement />} />
                    <Route path="setting" element={<UserManagement />} />
                    <Route path="profile" element={<UserManagement />} />
                </Route>

                {/* Agency Routes */}
                <Route path="/agency" element={<AgencyDashboardLayout />}>
                    <Route index element={<AgencyDashboard />} />

                    <Route path="properties" element={<PropertyManagement />} />
                    <Route path="properties/:id" element={<SinglePropertyManagement />}></Route>
                    <Route path="properties/add" element={<AddNewProperty />} />

                    <Route path="profile" element={<ProfileManagement />} />
                    <Route path="sponsorships" element={<SponsorshipManagement />} />
                    <Route path="financials" element={<FinanceManagement />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}