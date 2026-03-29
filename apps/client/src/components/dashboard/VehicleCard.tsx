import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle } from "lucide-react";

interface VehicleCardProps {
  brand: string;
  year: string;
  vin: string;
  status: string;
  image: string;
}

const VehicleCard = ({ brand, year, vin, status, image }: VehicleCardProps) => {
  const isActive = status === "نشط";

  return (
    <motion.div whileHover={{ y: -4 }} className="stat-card overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{image}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-foreground">{brand}</h3>
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono truncate mb-3" dir="ltr">
            VIN: {vin}
          </p>
          <div
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              isActive ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
            }`}
          >
            {isActive ? (
              <ShieldCheck className="w-3.5 h-3.5" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            {status}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
