import { Routes, Route, Navigate } from "react-router-dom";
import {
  AdminDashboardPage,
  OpportunitiesPage,
  AddOpportunityPage,
  CompaniesPage,
  OutreachPage,
  HeadlinesPage,
  StudentsAnalyticsPage,
  CompanyAnalyticsPage,
  MockInterviewsPage,
  ReviewJobsPage,
  AlumniPage,
  AnnouncementsPage,
  ReportsPage,
  UsersPage,
  SettingsPage,
  EligibleStudentsPage,
} from "./pages";
import { ADMIN_ROUTES } from "./types";

export default function AdminDashboard() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={ADMIN_ROUTES.DASHBOARD} replace />}
      />
      <Route path={ADMIN_ROUTES.DASHBOARD} element={<AdminDashboardPage />} />
      <Route
        path={ADMIN_ROUTES.OPPORTUNITIES}
        element={<OpportunitiesPage />}
      />
      <Route
        path={ADMIN_ROUTES.ELIGIBLE_STUDENTS}
        element={<EligibleStudentsPage />}
      />
      <Route
        path={ADMIN_ROUTES.ADD_OPPORTUNITY}
        element={<AddOpportunityPage />}
      />
      <Route path={ADMIN_ROUTES.COMPANIES} element={<CompaniesPage />} />
      <Route path={ADMIN_ROUTES.OUTREACH} element={<OutreachPage />} />
      <Route path={ADMIN_ROUTES.HEADLINES} element={<HeadlinesPage />} />
      <Route
        path={ADMIN_ROUTES.STUDENTS_ANALYTICS}
        element={<StudentsAnalyticsPage />}
      />
      <Route
        path={ADMIN_ROUTES.COMPANY_ANALYTICS}
        element={<CompanyAnalyticsPage />}
      />
      <Route
        path={ADMIN_ROUTES.MOCK_INTERVIEWS}
        element={<MockInterviewsPage />}
      />
      <Route path={ADMIN_ROUTES.REVIEW_JOBS} element={<ReviewJobsPage />} />
      <Route path={ADMIN_ROUTES.ALUMNI} element={<AlumniPage />} />
      <Route
        path={ADMIN_ROUTES.ANNOUNCEMENTS}
        element={<AnnouncementsPage />}
      />
      <Route path={ADMIN_ROUTES.REPORTS} element={<ReportsPage />} />
      <Route path={ADMIN_ROUTES.USERS} element={<UsersPage />} />
      <Route path={ADMIN_ROUTES.SETTINGS} element={<SettingsPage />} />
      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={ADMIN_ROUTES.DASHBOARD} replace />}
      />
    </Routes>
  );
}
