import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function StudentGuard() {
  const { pathname } = useLocation();

  if (!pathname.startsWith("/dashboard/student")) {
    return <Navigate to="/dashboard/student" replace />;
  }

  return <Outlet />;
}
