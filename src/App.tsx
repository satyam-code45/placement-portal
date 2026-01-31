import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./features/landing/LandingPage";
import JobBoard from "./pages/JobBoard";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Dashboards
import StudentDashboard from "./features/dashboard/pages/studentDashboard/StudentDashboard";
import CompanyDashboard from "./features/dashboard/pages/CompanyDashboard";
import AdminDashboard from "./features/dashboard/pages/adminDashboard/AdminDashboard";
import SuperAdminDashboard from "./features/dashboard/pages/SuperAdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />
        <Route path="jobs" element={<JobBoard />} />

        {/* Auth Routes */}
        <Route
          path="login"
          element={
            <LoginPage
              role="student"
              title="Student Login"
              description="Enter your university credentials to access the portal."
            />
          }
        />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="company/login"
          element={
            <LoginPage
              role="company"
              title="Company Portal"
              description="Sign in to manage job postings and candidates."
            />
          }
        />

        {/* Hidden Admin Routes */}
        <Route
          path="admin/login"
          element={
            <LoginPage
              role="admin"
              title="Admin Access"
              description="Authorized personnel only."
            />
          }
        />
        <Route
          path="super-admin/login"
          element={
            <LoginPage
              role="super-admin"
              title="System Administration"
              description="Restricted access."
            />
          }
        />

        {/* Dashboard Routes (Protected in real app) */}
        <Route
          path="dashboard/student/*"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "ADMIN", "SUPERADMIN"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/company"
          element={
            <ProtectedRoute allowedRoles={["COMPANY", "ADMIN", "SUPERADMIN"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/super-admin"
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
