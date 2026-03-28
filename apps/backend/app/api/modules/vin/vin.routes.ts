import express from "express";
import { validate } from "../../middlewares/handleError";
import { vinSchema } from "@crm/shared";
import { createVinHandler } from "./vin.controller";

const router = express.Router();

router.post("/", validate(vinSchema), createVinHandler);

export default router;
