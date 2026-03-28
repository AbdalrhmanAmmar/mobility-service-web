import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { branch: "الفرع الرئيسي", sales: 85000, color: "hsl(5, 100%, 69%)" },
  { branch: "فرع فرع القاهره", sales: 72000, color: "hsl(218, 55%, 25%)" },
  { branch: "فرع اسكندريه", sales: 65000, color: "hsl(0, 27%, 74%)" },
  { branch: "فرع المنصوره", sales: 48000, color: "hsl(142, 76%, 36%)" },
];

const BranchComparison = () => {
  return (
    <div
      className="bg-card rounded-xl p-6 shadow-card opacity-0 animate-fade-up"
      style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">مقارنة الفروع</h3>
        <span className="text-sm text-muted-foreground">هذا الشهر</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <YAxis
              type="category"
              dataKey="branch"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "var(--shadow-lg)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value: number) => [`${value.toLocaleString("ar-SA")} ر.س`, "المبيعات"]}
            />
            <Bar dataKey="sales" radius={[0, 8, 8, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BranchComparison;
