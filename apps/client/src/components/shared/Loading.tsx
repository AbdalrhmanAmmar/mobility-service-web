import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // ميثود موجودة في shadcn لدمج الكلاسات

interface LoadingProps {
  className?: string;
  text?: string;
  fullPage?: boolean;
}

export const Loading = ({
  className,
  text = "جاري التحميل...",
  fullPage = false,
}: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-8",
        fullPage && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50", // لو عايزه يغطي الصفحة كلها
        className
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      {text && <p className="text-sm font-medium text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
};
