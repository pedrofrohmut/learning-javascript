import { createBrowserRouter, RouterProvider } from "react-router"

import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import JobsPage from "./pages/JobsPage"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"
import NotFoundPage from "./pages/NotFoundPage"
import JobPage from "./pages/JobPage"

const jobLoader = async ({ params }) => {
    const response = await fetch(`/api/jobs/${params.id}`)
    const job = await response.json()
    return job
}

const addJob = newJob => (
    fetch("/api/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json"
        },
        body: JSON.stringify(newJob)
    })
)

const deleteJob = jobId => (
    fetch(`/api/jobs/${jobId}`, {
        method: "DELETE"
    })
)

const updateJob = updatedJob => (
    fetch(`/api/jobs/${updatedJob.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/Json"
        },
        body: JSON.stringify(updatedJob)
    })
)

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/jobs", element: <JobsPage /> },
            { path: "/jobs/:id", element: <JobPage deleteJob={deleteJob} />, loader: jobLoader },
            { path: "/add-job", element: <AddJobPage addJob={addJob} /> },
            { path: "/jobs/edit/:id", element: <EditJobPage updateJob={updateJob} />, loader: jobLoader },
            { path: "*", element: <NotFoundPage /> }
        ]
    }
])

const App = () => <RouterProvider router={router} />

export default App
