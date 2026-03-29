import {
  Bell,
  ChevronDown,
  Search,
  Moon,
  Sun,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "@/store/useFilterStore";

interface TopBarProps {
  sidebarCollapsed: boolean;
  onToggle: () => void;
}

const TopBar = ({ sidebarCollapsed, onToggle }: TopBarProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // ... داخل المكون
  const { selectedBranchId, setSelectedBranchId } = useFilterStore();

  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const getRoleTitle = (role?: string) => {
    if (role === "ADMIN") return "مدير النظام";
    if (role === "SALES") return "موظف مبيعات";
    return "موظف";
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    // حفظ الاختيار في المتصفح
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 h-16 bg-card/95 backdrop-blur-md border-b border-border z-30 transition-all duration-2000 ease-in-out",
        sidebarCollapsed ? "right-0" : "right-64"
      )}
    >
      <div className="h-full px-6 flex items-center justify-between">
        <button
          onClick={onToggle}
          className="w-10 h-10 flex items-center justify-center rounded-lg 
                   bg-card border border-border hover:bg-muted 
                   transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground transition-transform" />
          )}
        </button>
        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="بحث..."
              className="w-64 h-10 pr-10 pl-4 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Branch Selector */}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pr-4 border-r border-border">
            <div className="text-left">
              <div className="text-right">
                {/* 4. عرض الاسم الحقيقي والوظيفة */}
                <p className="text-sm font-semibold">{user?.fullName || "مستخدم جديد"}</p>
                <p className="text-xs text-muted-foreground">{getRoleTitle(user?.role)}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full gradient-coral flex items-center justify-center cursor-pointer">
              {/* أول حرف من الاسم */}
              <span className="text-primary-foreground font-bold text-sm">
                {user?.fullName?.charAt(0) || "U"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all ml-2"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
