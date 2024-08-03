import { NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "./models/user";
import { IUser, RequestAuth } from "./types/user";
import ExpressError from "./utils/ExpressError";
import jwt from "jsonwebtoken"

export const requireAuth = async (
    req: RequestAuth,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization) throw new ExpressError("Unauthorized", 400);

    const token = authorization.split(" ")[1];
    const {userId} = jwt.verify(
        token,
        process.env.SECRET as string
    ) as JwtPayload;
    req.user = (await User.findOne({ _id: userId })) as IUser;

    next();
};