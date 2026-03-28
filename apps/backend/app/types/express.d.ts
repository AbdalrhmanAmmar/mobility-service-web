import { User } from "@prisma/client"; // إذا كنت تستخدم بريزما

declare global {
  namespace Express {
    interface Request {
      // هنا نضيف الخاصية الجديدة للـ Request
      user?: {
        id: string;
        username: string;
        role: "ADMIN" | "SALES";
        branchId?: string | null;
      };
    }
  }
}
