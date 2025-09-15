import { Link } from "react-router"
import Hero from "../components/sections/Hero"
import HomeCards from "../components/sections/HomeCards"
import JobListings from "../components/sections/JobListings"

const HomePage = () => {
    return (
        <>
            <Hero title="Test title" subtitle="This is the test subtitle" />
            <HomeCards />
            <JobListings />
            <section className="m-auto max-w-lg my-10 px-6">
                <Link to="/jobs" className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
                    View All Jobs
                </Link>
            </section>
        </>
    )
}

export default HomePage
