import { Navigate, useRoutes } from "react-router-dom"; 
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/Profilepage";
import ResumePage from "./pages/ResumePage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ApplicationsPage from "./pages/ApplicationPage";
import SavedJobsPage from "./pages/SavedJobPage"; 
import MockInterviewPage from "./pages/MockInterviewPage"

export default function StudentDashboard() {
  return useRoutes([
    {
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "resume", element: <ResumePage /> },
        { path: "jobs", element: <JobsPage /> },
        { path: "jobs/:id", element: <JobDetailsPage /> },
        { path: "applications", element: <ApplicationsPage /> },
        { path: "saved-jobs", element: <SavedJobsPage /> },
        { path: "mock-interview", element: <MockInterviewPage /> },
        { path: "*", element: <Navigate to="." replace /> },
      ],
    },
  ]);
}
