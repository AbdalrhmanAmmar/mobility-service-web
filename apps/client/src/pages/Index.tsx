import { DollarSign, Users, Package, FileText, TrendingUp, TrendingDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import BranchComparison from "@/components/dashboard/BranchComparison";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import QuickActions from "@/components/dashboard/QuickActions";
import TopProducts from "@/components/dashboard/TopProducts";

const stats = [
  {
    title: "إجمالي المبيعات",
    value: "٢٧٠,٠٠٠ م.ص",
    change: "+١٢.٥٪",
    changeType: "positive" as const,
    icon: DollarSign,
    iconColor: "bg-primary/10 text-primary",
  },
  {
    title: "عدد العملاء",
    value: "١,٢٥٠",
    change: "+٨.٣٪",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "bg-info/10 text-info",
  },
  {
    title: "عدد المنتجات",
    value: "٤٥٠",
    change: "+٢.١٪",
    changeType: "positive" as const,
    icon: Package,
    iconColor: "bg-success/10 text-success",
  },
  {
    title: "عدد الفواتير",
    value: "٣,٨٥٠",
    change: "-٣.٢٪",
    changeType: "negative" as const,
    icon: FileText,
    iconColor: "bg-warning/10 text-warning",
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
        {/* <p className="text-muted-foreground mt-1">
          مرحباً بك، أحمد! هذه نظرة عامة على أداء النظام.
        </p> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <BranchComparison />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentInvoices />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <TopProducts />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
