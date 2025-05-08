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
import {AdminUserManagement} from "../pages/admin/user/AdminUserManagement.jsx";
import {AdminSingleUserManagement} from "../pages/admin/user/AdminSingleUserManagement.jsx";
import {AdminAgenciesManagement} from "../pages/admin/agency/AdminAgenciesManagement.jsx";
import {AdminSingleAgencyManagement} from "../pages/admin/agency/AdminSingleAgencyManagement.jsx";
import {AgencyDashboardLayout} from "../layouts/AgencyDashboardLayout.jsx";
import {AgencyDashboard} from "../pages/agency/dashboard/AgencyDashboard.jsx";
import {AgencyPropertyManagement} from "../pages/agency/property/AgencyPropertyManagement.jsx";
import {AgencyProfileManagement} from "../pages/agency/profile/AgencyProfileManagement.jsx";
import {AgencySponsorshipManagement} from "../pages/agency/sponsorship/AgencySponsorshipManagement.jsx";
import {AgencyFinanceManagement} from "../pages/agency/financial/AgencyFinanceManagement.jsx";
import {AgencyAddNewProperty} from "../pages/agency/property/AgencyAddNewProperty.jsx";
import {AgencySinglePropertyManagement} from "../pages/agency/property/AgencySinglePropertyManagement.jsx";
import {AdminPropertyManagement} from "../pages/admin/property/AdminPropertyManagement.jsx";
import {AdminSinglePropertyManagement} from "../pages/admin/property/AdminSinglePropertyManagement.jsx";
import {AdminProfileManagement} from "../pages/admin/profile/AdminProfileManagement.jsx";
import {AgencyAddSponsorship} from "../pages/agency/sponsorship/AgencyAddSponsorship.jsx";

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

                    <Route path="user" element={<AdminUserManagement />} />
                    <Route path="user/:userId" element={<AdminSingleUserManagement />} />

                    <Route path="property" element={<AdminPropertyManagement />} />
                    <Route path="property/:id" element={<AdminSinglePropertyManagement />} />


                    <Route path="agency" element={<AdminAgenciesManagement />} />
                    <Route path="agency/:agencyId" element={<AdminSingleAgencyManagement />} />



                    <Route path="resale" element={<AdminUserManagement />} />
                    <Route path="transaction" element={<AdminUserManagement />} />
                    <Route path="sponsored" element={<AdminUserManagement />} />
                    <Route path="analytic" element={<AdminUserManagement />} />
                    <Route path="setting" element={<AdminUserManagement />} />

                    <Route path="profile" element={<AdminProfileManagement />} />
                </Route>

                {/* Agency Routes */}
                <Route path="/agency" element={<AgencyDashboardLayout />}>
                    <Route index element={<AgencyDashboard />} />

                    <Route path="properties" element={<AgencyPropertyManagement />} />
                    <Route path="properties/:id" element={<AgencySinglePropertyManagement />}></Route>
                    <Route path="properties/add" element={<AgencyAddNewProperty />} />

                    <Route path="profile" element={<AgencyProfileManagement />} />

                    <Route path="sponsorships" element={<AgencySponsorshipManagement />} />
                    <Route path="sponsorships/add" element={<AgencyAddSponsorship />} />

                    <Route path="financials" element={<AgencyFinanceManagement />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}