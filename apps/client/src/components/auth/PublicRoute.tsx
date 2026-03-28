// src/components/auth/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    const targetPath = user.role === "SALES" ? "/employee-dashboard" : "/";
    return <Navigate to={targetPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
