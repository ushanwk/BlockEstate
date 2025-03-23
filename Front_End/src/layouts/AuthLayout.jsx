import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
    return (
        <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-cover bg-center bg-[url('src/assets/images/auth/common/AuthLightBg.png')] bg-gray-100">
            <Outlet />
        </main>

    )
}