import { NextFunction, Request, Response } from "express";
import APIClient from "../api-client";
import ipInfo from "../models/ipInfo";
import IpInfo from "../types/IpInfo";
import ExpressError from "../utils/ExpressError";

export const getInitialIP = async (
    req: Request,
    res: Response,
) => {
    const apiClient = new APIClient<IpInfo>("/json")
    const result = await apiClient.getInitialIp();

    res.json({ result })
}

export const getIp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { ip } = req.query;
    if (!ip) return next(new ExpressError("IP cannot be blank", 404));
    const apiClient = new APIClient<IpInfo>("")
    const result = await apiClient.getIp(ip as string);

    const newIpInfo = new ipInfo(result)
    newIpInfo.save();

    res.json({ result })
}