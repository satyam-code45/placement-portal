import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface LoginPageProps {
  role: "student" | "company" | "admin" | "super-admin";
  title: string;
  description: string;
}

export default function LoginPage({
  role,
  title,
  description,
}: LoginPageProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const credentials = { email, password };
      let response;

      // Call the appropriate login method based on role
      switch (role) {
        case "student":
          response = await authService.studentLogin(credentials);
          break;
        case "company":
          response = await authService.companyLogin(credentials);
          break;
        case "admin":
          response = await authService.adminLogin(credentials);
          break;
        case "super-admin":
          response = await authService.superAdminLogin(credentials);
          break;
        default:
          throw new Error("Invalid role");
      }

      // Update auth context
      login(response.token, response.user);

      // Show success message
      toast.success("Login successful!");

      // Redirect to respective dashboard
      if (role === "student") navigate("/dashboard/student");
      else if (role === "company") navigate("/dashboard/company");
      else if (role === "admin") navigate("/dashboard/admin");
      else if (role === "super-admin") navigate("/dashboard/super-admin");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full px-4">
      <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-500 hover:text-black flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder={
                  role === "student"
                    ? "student@college.edu"
                    : "name@company.com"
                }
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-zinc-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {role === "student" && (
            <div className="mt-4 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="underline underline-offset-4 text-black hover:text-zinc-600"
              >
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
