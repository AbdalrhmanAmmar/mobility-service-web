// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { prisma } from "../../packages/db/Prisma";

// export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "يجب تسجيل الدخول أولاً" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//     });

//     if (!user) {
//       return res.status(401).json({ success: false, message: "المستخدم غير موجود" });
//     }

//     if (user.status !== "ACTIVE") {
//       return res.status(403).json({ success: false, message: "هذا الحساب معطل" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "توكن غير صالح أو منتهي الصلاحية" });
//   }
// };
