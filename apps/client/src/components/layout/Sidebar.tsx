import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Car,
  Search,
  ScanLine,
  MapPin,
  Wrench,
  BarChart3,
  Package,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const menuItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Car, label: "مركباتي", path: "/vehicles" },
  { icon: Search, label: "بحث القطع", path: "/parts" },
  { icon: ScanLine, label: "مسح VIN", path: "/vin-scan" },
  { icon: MapPin, label: "المحلات القريبة", path: "/shops" },
  { icon: Wrench, label: "الميكانيكيون", path: "/mechanics" },
  { icon: BarChart3, label: "تحليل السوق", path: "/analytics" },
  { icon: Package, label: "طلباتي", path: "/orders" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <>
      {/* زر تبديل الشريط الجانبي */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? "فتح القائمة" : "إغلاق القائمة"}
        className={cn(
          "fixed top-4 z-50 flex items-center justify-center",
          "w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-lg",
          "transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none",
          collapsed ? "right-3" : "right-[248px]"
        )}
      >
        {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* الشريط الجانبي */}
      <aside
        dir="rtl"
        className={cn(
          "fixed right-0 top-0 h-screen bg-sidebar border-l border-sidebar-border z-40",
          "flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-0 overflow-hidden" : "w-64"
        )}
      >
        {/* الشعار */}
        <div className="h-16 flex items-center gap-3 border-b border-sidebar-border px-5 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl gradient-coral flex items-center justify-center flex-shrink-0">
            <img src="/favicon.ico" alt="شعار النظام" className="w-6 h-6" />
          </div>
          <span className="font-bold text-base text-foreground whitespace-nowrap">
            mobility-service
          </span>
        </div>

        {/* عناصر القائمة */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item, index) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                  "transition-colors duration-150 text-sm font-medium",
                  "animate-in fade-in slide-in-from-right-2",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* معلومات المستخدم */}
        {user && (
          <div className="border-t border-sidebar-border p-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary"></span>
              </div>
              <div className="min-w-0"></div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
