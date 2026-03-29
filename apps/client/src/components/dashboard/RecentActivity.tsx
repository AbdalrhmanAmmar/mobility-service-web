import { motion } from "framer-motion";
import { Package, Wrench, Search, MapPin } from "lucide-react";

const activities = [
  {
    icon: Search,
    text: "بحث عن فلتر زيت لتويوتا كامري 2022",
    time: "منذ 5 دقائق",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Package,
    text: "تم العثور على 3 قطع متوافقة",
    time: "منذ 12 دقيقة",
    color: "bg-success/10 text-success",
  },
  {
    icon: MapPin,
    text: "تم تحديد 5 محلات قريبة",
    time: "منذ ساعة",
    color: "bg-info/10 text-info",
  },
  {
    icon: Wrench,
    text: "حجز موعد صيانة لهوندا أكورد",
    time: "منذ 3 ساعات",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Package,
    text: "تحديث أسعار قطع الفرامل",
    time: "أمس",
    color: "bg-secondary/50 text-secondary-foreground",
  },
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="stat-card"
    >
      <h2 className="text-lg font-bold text-foreground mb-4">النشاط الأخير</h2>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-start gap-3 group"
          >
            <div
              className={`p-2 rounded-lg ${activity.color} shrink-0 transition-transform group-hover:scale-110`}
            >
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-relaxed">{activity.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;
