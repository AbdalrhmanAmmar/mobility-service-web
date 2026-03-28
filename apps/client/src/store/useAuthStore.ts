import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/interface/user";
import { userServices } from "@/api/user";
import { ILoginInput } from "@/interface/user";

// تعريف شكل البيانات في الستور
interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: ILoginInput) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // دالة تسجيل الدخول
      login: async (credentials) => {
        try {
          const response = await userServices.login(credentials);
          if (response.success) {
            const { user, token } = response.data;
            set({
              user,
              token,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          throw error; // نمرر الخطأ ليتم التعامل معه في صفحة Login
        }
      },

      // دالة تسجيل الخروج
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("auth-storage"); // تنظيف التخزين
      },
    }),
    {
      name: "auth-storage", // اسم المفتاح في الـ LocalStorage
      storage: createJSONStorage(() => localStorage), // تحديد مكان التخزين
    }
  )
);
