import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../packages/db/Prisma";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. استخراج التوكن من الهيدر
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "يجب تسجيل الدخول أولاً" });
    }

    const token = authHeader.split(" ")[1];

    // 2. التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // 3. جلب المستخدم من قاعدة البيانات (للحصول على أحدث Role و BranchId)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        role: true,
        branchId: true, // سيكون null للأدمن الجديد
        status: true,
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "المستخدم غير موجود" });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({ success: false, message: "هذا الحساب معطل" });
    }

    // 4. تخزين بيانات المستخدم في الـ Request لاستخدامها في الـ Controller
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "توكن غير صالح أو منتهي الصلاحية" });
  }
};
