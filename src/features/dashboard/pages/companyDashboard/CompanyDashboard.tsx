import { Routes, Route, Navigate } from "react-router-dom";
import { CompanyLayout } from "./components/layout";
import { COMPANY_ROUTES } from "./types";

// Pages
import {
  CompanyDashboardPage,
  PostJobPage,
  MyJobsPage,
  ApplicationsPage,
  CandidatesPage,
  CompanyAnalyticsPage,
  CompanyProfilePage,
  CompanySettingsPage,
} from "./pages";

export default function CompanyDashboard() {
  return (
    <CompanyLayout>
      <Routes>
        <Route
          index
          element={<Navigate to={COMPANY_ROUTES.DASHBOARD} replace />}
        />
        <Route
          path={COMPANY_ROUTES.DASHBOARD}
          element={<CompanyDashboardPage />}
        />
        <Route path={COMPANY_ROUTES.POST_JOB} element={<PostJobPage />} />
        <Route path={COMPANY_ROUTES.MY_JOBS} element={<MyJobsPage />} />
        <Route
          path={COMPANY_ROUTES.APPLICATIONS}
          element={<ApplicationsPage />}
        />
        <Route path={COMPANY_ROUTES.CANDIDATES} element={<CandidatesPage />} />
        <Route
          path={COMPANY_ROUTES.ANALYTICS}
          element={<CompanyAnalyticsPage />}
        />
        <Route path={COMPANY_ROUTES.PROFILE} element={<CompanyProfilePage />} />
        <Route
          path={COMPANY_ROUTES.SETTINGS}
          element={<CompanySettingsPage />}
        />
      </Routes>
    </CompanyLayout>
  );
}
