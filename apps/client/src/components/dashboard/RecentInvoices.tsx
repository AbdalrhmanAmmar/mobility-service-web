import { FileText, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const invoices = [
  {
    id: "INV-001",
    customer: "شركة الأمل للتجارة",
    amount: 12500,
    status: "مدفوعة",
    date: "2024-01-15",
  },
  { id: "INV-002", customer: "مؤسسة النور", amount: 8750, status: "معلقة", date: "2024-01-14" },
  { id: "INV-003", customer: "مجموعة الفجر", amount: 23000, status: "مدفوعة", date: "2024-01-13" },
  {
    id: "INV-004",
    customer: "شركة البناء المتحدة",
    amount: 45000,
    status: "متأخرة",
    date: "2024-01-12",
  },
  { id: "INV-005", customer: "مصنع الاسمدة", amount: 18500, status: "مدفوعة", date: "2024-01-11" },
];

const statusStyles = {
  مدفوعة: "bg-success/10 text-success",
  معلقة: "bg-warning/10 text-warning",
  متأخرة: "bg-destructive/10 text-destructive",
};

const RecentInvoices = () => {
  return (
    <div
      className="bg-card rounded-xl shadow-card opacity-0 animate-fade-up"
      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">آخر الفواتير</h3>
          <button className="text-sm text-primary hover:underline">عرض الكل</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                رقم الفاتورة
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                العميل
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                المبلغ
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                الحالة
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                التاريخ
              </th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={invoice.id}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{invoice.id}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-muted-foreground">{invoice.customer}</td>
                <td className="py-4 px-6 font-medium text-foreground">
                  {invoice.amount.toLocaleString("ar-SA")}ج.م
                </td>
                <td className="py-4 px-6">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      statusStyles[invoice.status as keyof typeof statusStyles]
                    )}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-muted-foreground">{invoice.date}</td>
                <td className="py-4 px-6">
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInvoices;
