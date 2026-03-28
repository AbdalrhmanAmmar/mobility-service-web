// @/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// هذا هو "المصب النهائي" الذي يستلم الأخطاء من الـ asyncHandler
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // 1. نفس منطق الـ BaseController الخاص بـ Zod
  if (err instanceof ZodError) {
    const formattedErrors = err.flatten();
    return res.status(422).json({
      success: false,
      message: "خطأ في البيانات المدخلة",
      errors: formattedErrors.fieldErrors,
    });
  }

  // 2. معالجة الأخطاء العادية
  const statusCode = err.statusCode || 400;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "حدث خطأ في النظام",
  });
};
