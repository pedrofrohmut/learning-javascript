import Navbar from "./components/Navbar"
import Hero from "./components/sections/Hero"
import HomeCards from "./components/sections/HomeCards"
import JobListings from "./components/sections/JobListings"

const App = () => {
    return (
        <>
            <Navbar />
            <Hero title="Test title" subtitle="This is the test subtitle" />
            <HomeCards />
            <JobListings />
            <section className="m-auto max-w-lg my-10 px-6">
                <a href="jobs.html" className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
                    View All Jobs
                </a>
            </section>
        </>
    )
}

export default App
