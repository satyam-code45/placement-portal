import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Shield,
  Mail,
  Phone,
  Edit,
  Trash2,
  Key,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "../components/layout";
import { mockAdminUsers } from "../api/mockData";
import type { AdminUser } from "../types";
import { toast } from "sonner";

const roles = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Full system access",
    color: "bg-yellow-100 text-red-700",
    permissions: ["all"],
  },
  {
    id: "admin",
    name: "Admin",
    description: "Manage placements & students",
    color: "bg-gray-100 text-gray-700",
    permissions: ["opportunities", "students", "companies", "reports"],
  },
  {
    id: "coordinator",
    name: "Coordinator",
    description: "Department-level access",
    color: "bg-gray-100 text-gray-700",
    permissions: ["students", "announcements"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access",
    color: "bg-gray-100 text-gray-700",
    permissions: ["view_only"],
  },
];

function UserCard({
  user,
  onToggleStatus,
}: {
  user: AdminUser;
  onToggleStatus: (id: string) => void;
}) {
  const roleInfo = roles.find((r) => r.id === user.role) || roles[3];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-yellow-600/10 flex items-center justify-center">
                <span className="text-lg font-bold text-red-600">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{user.name}</h3>
                  {user.status === "active" ? (
                    <CheckCircle2 className="h-4 w-4 text-gray-700" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <Badge className={roleInfo.color}>{roleInfo.name}</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>

            {user.department && (
              <p className="text-sm text-muted-foreground">
                Department:{" "}
                <span className="font-medium">{user.department}</span>
              </p>
            )}

            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Last login:{" "}
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString("en-IN")
                : "Never"}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Key className="mr-2 h-4 w-4" />
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(user.id)}>
                {user.status === "active" ? (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState(mockAdminUsers);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "active"
                  ? ("inactive" as const)
                  : ("active" as const),
            }
          : user,
      ),
    );
    toast.success("User status updated!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">User & Role Management</h1>
            <p className="text-muted-foreground">
              Admin accounts, coordinators, and role-based access
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new admin account
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="e.g., John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="+91-XXXXXXXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Department (Optional)
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics</SelectItem>
                      <SelectItem value="mech">Mechanical</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={() => toast.success("User created successfully!")}
                >
                  Create User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 bg-gray-50/50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700">Active</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Admins</p>
                  <p className="text-2xl font-bold">
                    {
                      users.filter(
                        (u) => u.role === "admin" || u.role === "super_admin",
                      ).length
                    }
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Coordinators</p>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.role === "coordinator").length}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Users List */}
            <div className="grid gap-4">
              {filteredUsers.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    No users found matching your criteria.
                  </CardContent>
                </Card>
              ) : (
                filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {roles.map((role) => (
                <Card key={role.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${role.color}`}>
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <CardDescription>{role.description}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((perm) => (
                        <Badge
                          key={perm}
                          variant="secondary"
                          className="capitalize"
                        >
                          {perm.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      {users.filter((u) => u.role === role.id).length} users
                      assigned
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
