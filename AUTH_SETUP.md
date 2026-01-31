# Authentication System Setup

## Overview

The authentication system has been wired up to connect the frontend with the backend API. It now uses real API calls instead of mock data.

## What's Been Implemented

### 1. **API Client** ([src/services/api.ts](src/services/api.ts))

- Axios instance configured with base URL
- Request interceptor that adds JWT token to all requests
- Response interceptor that handles 401 errors and redirects to login
- Automatic token management

### 2. **Auth Service** ([src/services/authService.ts](src/services/authService.ts))

Methods for all authentication endpoints:

- `studentRegister(data)` - Register a new student
- `studentLogin(credentials)` - Student login
- `companyRegister(data)` - Register a new company
- `companyLogin(credentials)` - Company login
- `adminLogin(credentials)` - Admin login
- `superAdminLogin(credentials)` - Super admin login
- `logout()` - Clear authentication data
- `getToken()` - Get stored token
- `getUser()` - Get stored user data
- `isAuthenticated()` - Check if user is logged in

### 3. **Auth Context** ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx))

React context for managing authentication state globally:

- `user` - Current user object
- `token` - JWT token
- `isAuthenticated` - Boolean flag
- `isLoading` - Loading state
- `login(token, user)` - Update auth state
- `logout()` - Clear auth state

### 4. **Protected Routes** ([src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx))

Component that:

- Checks if user is authenticated
- Validates user roles
- Redirects unauthenticated users to login
- Redirects unauthorized users to their appropriate dashboard
- Shows loading state during authentication check

### 5. **Updated Login Page** ([src/features/auth/pages/LoginPage.tsx](src/features/auth/pages/LoginPage.tsx))

Now includes:

- Real API calls to backend
- Error handling and display
- Toast notifications for success/error
- Loading states
- Automatic redirect after successful login

### 6. **Updated Navbar** ([src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx))

- Shows different UI for authenticated vs non-authenticated users
- Dashboard link based on user role
- Logout button for authenticated users
- Works on both desktop and mobile views

### 7. **Updated App.tsx**

- All dashboard routes wrapped with `ProtectedRoute`
- Role-based access control:
  - Student Dashboard: `STUDENT`, `ADMIN`, `SUPERADMIN`
  - Company Dashboard: `COMPANY`, `ADMIN`, `SUPERADMIN`
  - Admin Dashboard: `ADMIN`, `SUPERADMIN`
  - Super Admin Dashboard: `SUPERADMIN` only

## Environment Configuration

Create/Update `.env` file in the frontend:

```env
VITE_API_URL=http://localhost:4000/api
```

## Backend API Endpoints

The following endpoints are used:

### Authentication

- `POST /api/auth/student/register` - Register student
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/company/register` - Register company
- `POST /api/auth/company/login` - Company login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/superadmin/login` - Super admin login

### RBAC Test Endpoints (Protected)

- `GET /api/auth/test/student` - Test student access
- `GET /api/auth/test/company` - Test company access
- `GET /api/auth/test/admin` - Test admin access
- `GET /api/auth/test/superadmin` - Test super admin access

## How to Use

### 1. Start the Backend

```bash
cd placement-portal-backend
npm run dev
```

Backend should run on `http://localhost:4000`

### 2. Start the Frontend

```bash
cd placement-portal
npm run dev
```

Frontend should run on `http://localhost:5173`

### 3. Test Authentication

#### Login Flow:

1. Navigate to login page for your role:
   - Student: `/login`
   - Company: `/company/login`
   - Admin: `/admin/login`
   - Super Admin: `/super-admin/login`

2. Enter credentials (must exist in database)

3. On successful login:
   - Token is stored in localStorage
   - User data is stored in localStorage
   - Auth context is updated
   - Redirected to appropriate dashboard

4. Access protected routes:
   - All dashboard routes require authentication
   - Users are redirected if they don't have proper role

#### Logout Flow:

1. Click logout button in navbar
2. Token and user data are cleared
3. Auth context is reset
4. Redirected to home page

## Token Storage

The JWT token is stored in:

- `localStorage.setItem('token', token)`
- `localStorage.setItem('user', JSON.stringify(user))`

The token is automatically:

- Added to all API requests via axios interceptor
- Checked on protected route access
- Cleared on logout or 401 error

## Error Handling

- Network errors show toast notification
- Invalid credentials show error message
- 401 errors automatically log user out
- Role mismatch redirects to correct dashboard

## Role-Based Access Control (RBAC)

Each protected route defines `allowedRoles`:

```tsx
<ProtectedRoute allowedRoles={["STUDENT", "ADMIN", "SUPERADMIN"]}>
  <StudentDashboard />
</ProtectedRoute>
```

Hierarchy:

- `SUPERADMIN` - Full access to everything
- `ADMIN` - Access to student, company, and admin dashboards
- `STUDENT` - Access to student dashboard only
- `COMPANY` - Access to company dashboard only

## Next Steps

1. **Implement Student Registration**:
   - Create registration page
   - Call `authService.studentRegister(data)`

2. **Implement Company Registration**:
   - Create company registration page
   - Call `authService.companyRegister(data)`

3. **Add Token Refresh**:
   - Implement refresh token logic
   - Add automatic token refresh before expiry

4. **Add Profile Management**:
   - Create profile endpoints
   - Allow users to update their information

5. **Implement Password Reset**:
   - Forgot password flow
   - Reset password via email

## TypeScript Types

User object structure:

```typescript
interface User {
  id: string;
  email: string;
  role: "STUDENT" | "COMPANY" | "ADMIN" | "SUPERADMIN";
  // Additional fields based on role
}
```

Auth response structure:

```typescript
interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}
```

## Testing Checklist

- [ ] Student can login
- [ ] Company can login
- [ ] Admin can login
- [ ] Super admin can login
- [ ] Invalid credentials show error
- [ ] Token is stored in localStorage
- [ ] Protected routes redirect when not authenticated
- [ ] Role-based access works correctly
- [ ] Logout clears authentication
- [ ] Token is sent with API requests
- [ ] 401 errors log user out
- [ ] Navbar shows correct state for authenticated users

## Troubleshooting

### "Network Error" when logging in

- Check if backend is running on port 4000
- Verify CORS is enabled in backend
- Check `.env` file has correct API URL

### Token not being sent with requests

- Check axios interceptor in `api.ts`
- Verify token is in localStorage
- Check browser console for errors

### Redirects not working

- Ensure `AuthProvider` wraps the app in `main.tsx`
- Check `ProtectedRoute` implementation
- Verify navigation logic in `LoginPage`

### Role-based access not working

- Check user object has correct `role` field
- Verify `allowedRoles` array in route definition
- Check backend returns correct user data
