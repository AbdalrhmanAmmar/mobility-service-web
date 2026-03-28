const products = [
  { name: "منتج أ", sales: 1250, percentage: 85 },
  { name: "منتج ب", sales: 980, percentage: 72 },
  { name: "منتج ج", sales: 850, percentage: 65 },
  { name: "منتج د", sales: 720, percentage: 58 },
  { name: "منتج هـ", sales: 650, percentage: 52 },
];

const TopProducts = () => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card opacity-0 animate-fade-up" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">أفضل المنتجات</h3>
        <span className="text-sm text-muted-foreground">هذا الشهر</span>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{product.name}</span>
              <span className="text-sm text-muted-foreground">{product.sales} مبيعة</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${product.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
