import express from "express";
import { validate } from "../../middlewares/handleError";
import { vinSchema } from "@crm/shared";
import { createVinHandler, getAllVinsHandler } from "./vin.controller";

const router = express.Router();

router.post("/", validate(vinSchema), createVinHandler);
router.get("/", getAllVinsHandler);

export default router;
