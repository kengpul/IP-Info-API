import express from "express";
import catchAsync from "../utils/catchAsync";
const router = express.Router();
import * as ipInfo from "../controllers/ipInfo";

router.get("/initial", catchAsync(ipInfo.getInitialIP))
router.get("/get", catchAsync(ipInfo.getIp))

export default router;