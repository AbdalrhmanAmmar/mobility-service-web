import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "يناير", sales: 4000, target: 3500 },
  { month: "فبراير", sales: 3000, target: 3500 },
  { month: "مارس", sales: 5000, target: 4000 },
  { month: "أبريل", sales: 4500, target: 4000 },
  { month: "مايو", sales: 6000, target: 4500 },
  { month: "يونيو", sales: 5500, target: 5000 },
  { month: "يوليو", sales: 7000, target: 5500 },
  { month: "أغسطس", sales: 6500, target: 6000 },
  { month: "سبتمبر", sales: 8000, target: 6500 },
  { month: "أكتوبر", sales: 7500, target: 7000 },
  { month: "نوفمبر", sales: 9000, target: 7500 },
  { month: "ديسمبر", sales: 8500, target: 8000 },
];

const SalesChart = () => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card opacity-0 animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">المبيعات الشهرية</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">المبيعات</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-sm text-muted-foreground">الهدف</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(5, 100%, 69%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(5, 100%, 69%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 27%, 74%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 27%, 74%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "var(--shadow-lg)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="hsl(0, 27%, 74%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTarget)"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(5, 100%, 69%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
