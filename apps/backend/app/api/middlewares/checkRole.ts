import { Request, Response, NextFunction } from "express";

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // نفترض أن المستخدم موجود في req بعد عملية الـ Authentication

    if (!user) {
      return res.status(401).json({ message: "غير مصرح لك بالدخول" });
    }

    // 1. إذا كان أدمن، اسمح له بالمرور دائماً (حتى لو ليس له فرع)
    if (user.role === "ADMIN") {
      return next();
    }

    // 2. التحقق من الرتبة المسموح لها
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "ليس لديك صلاحية الوصول لهذه البيانات",
      });
    }

    // 3. إذا كان موظف مبيعات، تأكد من وجود فرع مرتبه به
    if (user.role === "SALES" && !user.branchId) {
      return res.status(403).json({
        message: "خطأ: يجب أن يكون موظف المبيعات مرتبطاً بفرع",
      });
    }

    next();
  };
};
