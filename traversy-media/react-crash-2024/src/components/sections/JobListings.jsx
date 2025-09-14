import { useState } from "react"
import { FaMapMarker } from "react-icons/fa"

import jobs from "../../jobs.json"

const JobListing = ({ job }) => {
    const [show, setShow] = useState(false)

    const description = show ? job.description : job.description.slice(0, 90) + "..."

    return (
        <div className="bg-white rounded-xl shadow-md relative" key={job.id}>
            <div className="p-4">
                <div className="mb-6">
                    <div className="text-gray-600 my-2">{job.type}</div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                </div>
                <div className="mb-5">{description}</div>
                <button className="text-indigo-500 mb-5 hover:text-indigo-600" onClick={() => setShow(!show)}>
                    {show ? "show less" : "show more"}
                </button>
                <h3 className="text-indigo-500 mb-2">{job.salary}</h3>
                <div className="border border-gray-100 mb-5"></div>
                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3">
                        <i className="fa-solid fa-location-dot text-lg"></i>
                        <FaMapMarker className="inline text-lg mb-1 mr-1" />
                        {job.location}
                    </div>
                    <a
                        href="job.html"
                        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                        onClick={() => { setShow(!show) }}
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    )
}

const JobListings = () => {
    const recentJobs = jobs.slice(0, 3)
    return (
        <section className="bg-blue-100 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Browse Jobs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentJobs.length > 0 && recentJobs.map((job, index) => <JobListing job={job} key={index} />)}
                </div>
            </div>
        </section>
    )
}

export default JobListings
