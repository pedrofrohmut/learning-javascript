import { createBrowserRouter, RouterProvider } from "react-router"

import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import JobsPage from "./pages/JobsPage"
import AddJobPage from "./pages/AddJobPage"
import NotFoundPage from "./pages/NotFoundPage"
import JobPage, { jobLoader } from "./pages/JobPage"

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: HomePage },
            { path: "/jobs", Component: JobsPage },
            { path: "/jobs/:id", Component: JobPage, loader: jobLoader },
            { path: "/add-job", Component: AddJobPage },
            { path: "*", Component: NotFoundPage },
        ]
    }
])

const App = () => <RouterProvider router={router} />

export default App
