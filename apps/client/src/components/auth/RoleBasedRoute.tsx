import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { UserRole } from "@/interface/user";

interface Props {
  children: React.ReactNode;
  allowedRoles: UserRole[]; // تحديد الأدوار المسموح لها
}

const RoleBasedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // 1. التحقق من التوثيق
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. التحقق من وجود بيانات المستخدم (حماية إضافية ضد الأخطاء)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. التحقق من الصلاحيات
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // إذا كان كل شيء تمام، اعرض الصفحة
  return <>{children}</>;
};

export default RoleBasedRoute;
