import express from "express";
import catchAsync from "../utils/catchAsync";
const router = express.Router();
import * as user from "../controllers/user"

router.post("/signup", catchAsync(user.signup))
router.post("/login", catchAsync(user.login))

export default router;