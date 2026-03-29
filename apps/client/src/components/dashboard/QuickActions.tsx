import { motion } from "framer-motion";
import { Search, ScanLine, MapPin, BarChart3 } from "lucide-react";

const actions = [
  {
    title: "البحث عن قطعة",
    desc: "ابحث بدقة عن القطع المتوافقة",
    icon: Search,
    gradient: "gradient-coral",
  },
  {
    title: "مسح VIN",
    desc: "امسح رقم الشاصي بالكاميرا",
    icon: ScanLine,
    gradient: "gradient-navy",
  },
  {
    title: "محلات قريبة",
    desc: "اعثر على أقرب محل قطع غيار",
    icon: MapPin,
    gradient: "gradient-coral",
  },
  {
    title: "تحليل السوق",
    desc: "اطلع على اتجاهات الأسعار",
    icon: BarChart3,
    gradient: "gradient-navy",
  },
];

const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-bold text-foreground mb-4">إجراءات سريعة</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, i) => (
          <motion.button
            key={action.title}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="stat-card flex flex-col items-center text-center gap-3 p-5 group"
          >
            <div
              className={`p-3 rounded-xl ${action.gradient} transition-transform duration-300 group-hover:scale-110`}
            >
              <action.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{action.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
