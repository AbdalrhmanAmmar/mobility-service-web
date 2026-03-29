import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: "coral" | "navy" | "success" | "info";
  delay?: number;
}

const colorMap = {
  coral: {
    bg: "bg-primary/10",
    icon: "text-primary",
    badge: "bg-primary/10 text-primary",
  },
  navy: {
    bg: "bg-navy/10",
    icon: "text-navy",
    badge: "bg-navy/10 text-navy",
  },
  success: {
    bg: "bg-success/10",
    icon: "text-success",
    badge: "bg-success/10 text-success",
  },
  info: {
    bg: "bg-info/10",
    icon: "text-info",
    badge: "bg-info/10 text-info",
  },
};

const StatsCard = ({ title, value, change, icon: Icon, color, delay = 0 }: StatsCardProps) => {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="stat-card group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.badge}`}>
          {change}
        </span>
      </div>
      <p className="text-3xl font-extrabold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </motion.div>
  );
};

export default StatsCard;
