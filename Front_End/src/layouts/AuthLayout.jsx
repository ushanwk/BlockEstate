import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
    return (
        <main className='w-[100vw] h-[100vh] bg-amber-100 flex items-center justify-center'>
            <Outlet />
        </main>
    )
}