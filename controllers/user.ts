import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/user";


export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) return next(new ExpressError("Email already in use", 400));

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hash });
    const userID = user._id;

    user.save();

    const token = jwt.sign({ userID }, "Secret" as string, {
        expiresIn: "3d",
    });

    res.json({ email, token });
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new ExpressError("Email does not exist", 404));

    const match = await bcrypt.compare(password, user.password)

    if (!match) return next(new ExpressError("Wrong Password", 404));

    const userId = user._id

    const token = jwt.sign({ userId }, "Secret" as string, {
        expiresIn: "3d",
    });

    res.json({
        _id: userId,
        email,
        token
    })

}