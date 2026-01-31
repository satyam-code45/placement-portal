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
import { authService, type RegisterStudentData } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterStudentData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    rollNo: "",
    graduationYear: new Date().getFullYear(),
    skills: [],
    portfolioUrl: "",
    linkedinUrl: "",
    activeBacklogs: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? parseInt(value) || 0
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.studentRegister(formData);
      login(response.token, response.user);
      toast.success("Registration successful! Welcome aboard!");
      navigate("/dashboard/student");
    } catch (err) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Registration failed. Please try again.";
      setError(errorMessage || "Registration failed. Please try again.");
      toast.error(errorMessage || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 py-8">
      <Card className="w-full max-w-2xl border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-500 hover:text-black flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create Student Account
          </CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="student@college.edu"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="rollNo" className="text-sm font-medium">
                  Roll Number
                </label>
                <Input
                  id="rollNo"
                  name="rollNo"
                  placeholder="STU2024001"
                  value={formData.rollNo}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="graduationYear" className="text-sm font-medium">
                Graduation Year
              </label>
              <Input
                id="graduationYear"
                name="graduationYear"
                type="number"
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 10}
                value={formData.graduationYear}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Professional Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="portfolioUrl" className="text-sm font-medium">
                  Portfolio URL
                </label>
                <Input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="linkedinUrl" className="text-sm font-medium">
                  LinkedIn URL
                </label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Active Backlogs Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                id="activeBacklogs"
                name="activeBacklogs"
                type="checkbox"
                checked={formData.activeBacklogs}
                onChange={handleChange}
                disabled={isLoading}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label htmlFor="activeBacklogs" className="text-sm font-medium">
                I have active backlogs
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-zinc-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 text-black hover:text-zinc-600"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
