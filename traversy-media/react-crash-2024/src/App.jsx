import { BrowserRouter, Route, Routes } from "react-router"

import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import JobsPage from "./pages/JobsPage"
import AddJobPage from "./pages/AddJobPage"
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/add-job" element={<AddJobPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
