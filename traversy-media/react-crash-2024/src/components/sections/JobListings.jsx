import { useEffect, useState } from "react"
import { FaMapMarker, FaSpinner } from "react-icons/fa"
import { Link } from "react-router"

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
                    <Link
                        to={`/jobs/${job.id}`}
                        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

const fetchJobs = async (isHome) => {
    const url = isHome ? "/api/jobs?_limit=3" : "/api/jobs"
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("ERROR Error to fecth jobs. Response status: " + response.status)
        }
        return response.json()
    } catch (err) {
        throw new Error("ERROR Error to fetch jobs: " + err)
    }
}

const JobListings = ({ isHome = false }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        setIsLoading(true)
        fetchJobs(isHome)
            .then(data => {
                setJobs(data)
            })
            .catch(err => {
                console.error(err)
                setIsError(true)
            })
            .finally(() => {
                setTimeout(() => setIsLoading(false), 500) // Adds delay for ease transition
            })
    }, [setJobs, setIsError, setIsLoading])

    const renderTitle = () => {
        if (isLoading) {
            return "Loading..."
        }
        if (isError) {
            return "Error to fetch jobs"
        }
        if (isHome) {
            return "Recent Jobs"
        }
        return "Browse Jobs"
    }

    const renderJobs = () => {
        if (isLoading || jobs.length == 0) {
            return null
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jobs.map((job, i) => <JobListing job={job} key={i} />)}
            </div>
        )
    }

    const renderLoading = () => (
        <div className="flex justify-center">
            <FaSpinner className="animate-spin text-6xl" />
        </div>
    )

    return (
        <section className="bg-blue-100 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {renderTitle()}
                </h2>
                {isLoading && !isError ? renderLoading() : renderJobs()}
            </div>
        </section>
    )
}

export default JobListings
