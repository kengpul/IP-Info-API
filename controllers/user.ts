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
    if (!email || !password) return next(new ExpressError("email and password field required", 404))

    const existEmail = await User.findOne({ email });
    if (existEmail) return next(new ExpressError("Email already in use", 400));

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hash });
    const userID = user._id;

    user.save();

    const token = jwt.sign({ userID }, process.env.SECRET as string, {
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

    if (!user) return res.status(404).send("Email does not exist");

    if (password && user.password) {
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(404).send("Wrong Password ");
    }

    const userId = user._id

    const token = jwt.sign({ userId }, process.env.SECRET as string, {
        expiresIn: "3d",
    });

    res.json({
        _id: userId,
        email,
        token
    })

}