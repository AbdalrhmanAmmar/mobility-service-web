import { useQuery } from "@tanstack/react-query";
import { vinService, Vin } from "@/api/vin";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Hash, Calendar, Palette, Tag, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Vehicles = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vins"],
    queryFn: () => vinService.getAll(),
  });

  const vins = data?.data || [];

  return (
    <DashboardLayout>
      <div className="space-y-8" dir="rtl">
        <header className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          >
            مركباتي
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            إدارة ومتابعة جميع المركبات المسجلة في النظام عبر أرقام الهيكل (VIN).
          </motion.p>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-destructive">
            <AlertCircle className="w-12 h-12" />
            <p className="font-medium">عذراً، حدث خطأ أثناء جلب البيانات</p>
            <p className="text-sm opacity-80">{(error as any)?.message || "خطأ غير معروف"}</p>
          </div>
        ) : vins.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-muted-foreground border-2 border-dashed rounded-2xl border-muted/50 transition-colors hover:border-primary/20">
            <Car className="w-16 h-16 opacity-20" />
            <p className="text-xl font-medium">لا توجد مركبات مسجلة حالياً</p>
            <p className="text-sm">ابدأ بإضافة أول مركبة من خلال مسح رقم الهيكل (VIN).</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vins.map((vin: Vin, index: number) => (
              <motion.div
                key={vin.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group relative overflow_hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Car className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="font-mono text-[10px] tracking-wider bg-background/50">
                        {vin.status || "نشط"}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 flex items-center gap-2 group-hover:text-primary transition-colors">
                      <span className="text-lg font-bold">
                        {vin.make} {vin.model}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Hash className="w-4 h-4 shrink-0" />
                        <span className="font-mono bg-muted/50 px-2 py-0.5 rounded border border-border/50 group-hover:border-primary/20 transition-colors">
                          {vin.vin}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{vin.year || "----"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Palette className="w-4 h-4 text-muted-foreground" />
                          <span>{vin.color || "----"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border_border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <Tag className="w-3 h-3" />
                        <span>أضيف بتاريخ: {new Date(vin.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vehicles;
