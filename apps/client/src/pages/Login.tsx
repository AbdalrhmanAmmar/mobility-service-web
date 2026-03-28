import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/use-toast";

// استيراد الـ Schema والـ Types
import { loginSchema, type LoginInput } from "@/validation/user";
import { userServices } from "@/api/user";
import { ILoginInput } from "@/interface/user";
import { useAuthStore } from "@/store/useAuthStore";

const Login = () => {
  const { login: loginFromStore, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  // إعادة التوجيه إذا كان المستخدم مسجلاً للدخول بالفعل
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "SALES") {
        navigate("/employee-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  // 1. إعداد React Hook Form مع Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. دالة الإرسال الفعلية
  const onSubmit = async (data: LoginInput) => {
    try {
      await loginFromStore(data as ILoginInput);

      // الحصول على بيانات المستخدم المحدثة من الستور
      const user = useAuthStore.getState().user;

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "جاري توجيهك إلى لوحة التحكم...",
      });

      // التوجيه بناءً على الصلاحية
      if (user?.role === "SALES") {
        navigate("/employee-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      // 🚨 التعديل هنا:
      // نتأكد من إرسال نص (string) وليس كائن الخطأ كاملاً
      const errorMessage =
        error.response?.data?.message || error.message || "اسم المستخدم أو كلمة المرور غير صحيحة";

      toast({
        title: "فشل الدخول",
        description: errorMessage, // تأكد أنه نص
        variant: "destructive",
      });
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* القسم الأيسر - جمالي (كما هو) */}
      <div className="hidden lg:flex lg:w-1/2 gradient-coral relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl font-bold">CRM</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              نظام إدارة الفروع والمبيعات المتكامل
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              حلول متكاملة لإدارة أعمالك بكفاءة عالية.
            </p>
          </div>
        </div>
      </div>

      {/* القسم الأيمن - فورم تسجيل الدخول */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="animate-fade-up">
            <h2 className="text-3xl font-bold text-foreground mb-2">مرحباً بعودتك</h2>
            <p className="text-muted-foreground mb-8">سجل دخولك للوصول إلى لوحة التحكم</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* حقل اسم المستخدم */}
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    {...register("username")}
                    id="username"
                    placeholder="أدخل اسم المستخدم"
                    className={`pr-10 h-12 bg-muted/50 border-border/50 focus:bg-background ${
                      errors.username ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="text-destructive text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* حقل كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pr-10 pl-10 h-12 bg-muted/50 border-border/50 focus:bg-background ${
                      errors.password ? "border-destructive" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button type="button" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base gradient-coral hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري التحقق...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    تسجيل الدخول
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>
            {/* 
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                ليس لديك حساب؟{" "}
                <button className="text-primary hover:underline font-medium">
                  تواصل مع الإدارة
                </button>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
