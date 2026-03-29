import { asyncHandler } from "../../middlewares/async-handler";
import { Request, Response } from "express";

// ✅ الحل: فرّق بين الاسمين
import { createVin as createVinService, getAllVins } from "./vin.service";

export const createVinHandler = asyncHandler(async (req: Request, res: Response) => {
  const vin = await createVinService(req.body);
  res.status(201).json({ success: true, message: "VIN created", data: vin });
});

export const getAllVinsHandler = asyncHandler(async (req: Request, res: Response) => {
  const vins = await getAllVins();
  res.status(200).json({ success: true, message: "VINs retrieved", data: vins });
});
