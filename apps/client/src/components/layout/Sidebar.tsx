import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  UserCircle,
  FileText,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  Zap,
  Clock,
  AlignVerticalSpaceAround,
  User,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar } from "@radix-ui/react-avatar";

const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", path: "/", roles: ["ADMIN"] },
  { icon: Target, label: "لوحة الموظف", path: "/employee-dashboard", roles: ["SALES"] },

  { icon: Building2, label: "الفروع", path: "/branches", roles: ["ADMIN"] },
  { icon: Users, label: "الموظفين", path: "/employees", roles: ["ADMIN"] },
  { icon: Clock, label: "الحضور والانصراف", path: "/attendance", roles: ["SALES"] },
  // { icon: Package, label: "المنتجات", path: "/products" },
  // { icon: Zap, label: "زيادة المبيعات", path: "/sales-boost" },
  // { icon: UserCircle, label: "العملاء", path: "/customers" },
  // { icon: FileText, label: "الفواتير", path: "/invoices" },
  // { icon: BarChart3, label: "التقارير", path: "/reports" },
  // { icon: Settings, label: "الإعدادات", path: "/settings" },
  {
    icon: User,
    label: "الملف الشخصي",
    path: "/profile",
    roles: ["ADMIN", "SALES"],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 h-screen bg-sidebar border-l border-sidebar-border z-40",
        "w-64 transform transition-all duration-300 ease-in-out",
        collapsed ? "translate-x-full" : "translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center">
            <img src="./favicon.ico" alt="" />
          </div>
          <span className="font-bold text-lg text-foreground">نظام الإدارة</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems
          // 4. الفلترة بناءً على صلاحية المستخدم
          .filter((item) => item.roles?.includes(user?.role || ""))
          .map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground",
                  collapsed && "justify-center px-3"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
      </nav>

      {/* Collapse Toggle */}
    </aside>
  );
};

export default Sidebar;
