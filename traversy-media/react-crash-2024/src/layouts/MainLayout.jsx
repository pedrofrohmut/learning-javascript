import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <div className="text-center text-gray-400 py-4 mt-3">
                Copyright Pedro Frohmut &copy; 2025-09-15
            </div>
        </>
    )
}

export default MainLayout
