import { asyncHandler } from "../../middlewares/async-handler";
import { Request, Response } from "express";

// ✅ الحل: فرّق بين الاسمين
import { createVin as createVinService } from "./vin.service";

export const createVinHandler = asyncHandler(async (req: Request, res: Response) => {
  const vin = await createVinService(req.body);
  res.status(201).json({ success: true, message: "VIN created", data: vin });
});
