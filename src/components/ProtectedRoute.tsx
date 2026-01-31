import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("STUDENT" | "COMPANY" | "ADMIN" | "SUPERADMIN")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - isLoading:", isLoading);
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - location:", location.pathname);

  if (isLoading) {
    console.log("ProtectedRoute - Showing loading...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-sm text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute - Not authenticated, redirecting to login");
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.log(
      "ProtectedRoute - User role not allowed:",
      user.role,
      "Allowed:",
      allowedRoles,
    );
    // Redirect to their appropriate dashboard
    const roleDashboardMap = {
      STUDENT: "/dashboard/student",
      COMPANY: "/dashboard/company",
      ADMIN: "/dashboard/admin",
      SUPERADMIN: "/dashboard/super-admin",
    };
    return <Navigate to={roleDashboardMap[user.role]} replace />;
  }

  console.log("ProtectedRoute - Rendering children");
  return <>{children}</>;
}
