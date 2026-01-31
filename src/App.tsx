import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./features/landing/LandingPage";
import JobBoard from "./pages/JobBoard";
import LoginPage from "./features/auth/pages/LoginPage";

// Dashboards
import StudentDashboard from "./features/dashboard/pages/studentDashboard/StudentDashboard";
import CompanyDashboard from "./features/dashboard/pages/CompanyDashboard";
import AdminDashboard from "./features/dashboard/pages/AdminDashboard";
import SuperAdminDashboard from "./features/dashboard/pages/SuperAdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />
        <Route path="jobs" element={<JobBoard />} />

        {/* Auth Routes */}
        <Route path="login" element={<LoginPage role="student" title="Student Login" description="Enter your university credentials to access the portal." />} />
        <Route path="company/login" element={<LoginPage role="company" title="Company Portal" description="Sign in to manage job postings and candidates." />} />

        {/* Hidden Admin Routes */}
        <Route path="admin/login" element={<LoginPage role="admin" title="Admin Access" description="Authorized personnel only." />} />
        <Route path="super-admin/login" element={<LoginPage role="super-admin" title="System Administration" description="Restricted access." />} />

        {/* Dashboard Routes (Protected in real app) */}
        <Route path="dashboard/student/*" element={<StudentDashboard />} />
        <Route path="dashboard/company" element={<CompanyDashboard />} />
        <Route path="dashboard/admin" element={<AdminDashboard />} />
        <Route path="dashboard/super-admin" element={<SuperAdminDashboard />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;