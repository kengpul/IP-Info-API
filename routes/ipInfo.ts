import express from "express";
import catchAsync from "../utils/catchAsync";
const router = express.Router();
import * as ipInfo from "../controllers/ipInfo";
import { requireAuth } from "../middlewares";

router.use(catchAsync(requireAuth))

router.get("/initial", catchAsync(ipInfo.getInitialIP))
router.get("/get", catchAsync(ipInfo.getIp))
router.get("/history", catchAsync(ipInfo.getHistory))
router.get("/history/:ip", catchAsync(ipInfo.getOneIpInfo))

export default router;