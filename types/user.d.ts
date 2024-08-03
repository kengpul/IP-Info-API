import { Request } from "express";

export interface IUser {
    readonly _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
}

export interface RequestAuth extends Request {
    user: IUser
}