import { Plus, Building2, Users, Package, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { icon: Building2, label: "إضافة فرع", color: "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground" },
  { icon: Users, label: "إضافة موظف", color: "bg-info/10 text-info hover:bg-info hover:text-primary-foreground" },
  { icon: Package, label: "إضافة منتج", color: "bg-success/10 text-success hover:bg-success hover:text-primary-foreground" },
  { icon: UserCircle, label: "إضافة عميل", color: "bg-warning/10 text-warning hover:bg-warning hover:text-primary-foreground" },
];

const QuickActions = () => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card opacity-0 animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">إجراءات سريعة</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl transition-all duration-200",
                action.color
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
