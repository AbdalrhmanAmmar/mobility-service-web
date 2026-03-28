import { Router } from "express";
import VinRoutes from "./../backend/app/api/modules/vin/vin.routes";

const router = Router();

router.use("/vin", VinRoutes);

export default router;
