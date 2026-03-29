import { Car, Package, Wrench, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "@/components/dashboard/StatsCard";
import VehicleCard from "@/components/dashboard/VehicleCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatsCard
            title="المركبات المسجلة"
            value="12"
            change="+3 هذا الشهر"
            icon={Car}
            color="coral"
            delay={0}
          />
          <StatsCard
            title="طلبات القطع"
            value="48"
            change="+12 هذا الأسبوع"
            icon={Package}
            color="navy"
            delay={0.1}
          />
          <StatsCard
            title="الميكانيكيون القريبون"
            value="23"
            change="في نطاق 10 كم"
            icon={Wrench}
            color="success"
            delay={0.2}
          />
          <StatsCard
            title="عمليات البحث"
            value="156"
            change="+28% من الشهر الماضي"
            icon={TrendingUp}
            color="info"
            delay={0.3}
          />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions + Vehicles */}
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />

            {/* My Vehicles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">مركباتي</h2>
                <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                  <Plus className="w-4 h-4" />
                  إضافة مركبة
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VehicleCard
                  brand="تويوتا كامري"
                  year="2022"
                  vin="1HGBH41JXMN109186"
                  status="نشط"
                  image="🚗"
                />
                <VehicleCard
                  brand="هوندا أكورد"
                  year="2021"
                  vin="5YJSA1DG9DFP14705"
                  status="بحاجة لصيانة"
                  image="🚙"
                />
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
