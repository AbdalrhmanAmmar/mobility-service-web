import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { env } from "../../config/env";

// ── AppError ──────────────────────────────────────────────────────
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

// ── Validate Middleware ───────────────────────────────────────────
export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);
    req.body = result.data;
    next();
  };

// ── Error Middleware ──────────────────────────────────────────────
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  // ZodError
  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: err.flatten().fieldErrors,
    });
  }

  // AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Unexpected
  console.error(err);
  return res.status(500).json({
    success: false,
    message: env.NODE_ENV === "development" ? err.message : "Internal server error",
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
