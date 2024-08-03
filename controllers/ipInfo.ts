import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import APIClient from "../api-client";
import ipInfo from "../models/ipInfo";
import IpInfo from "../types/IpInfo";
import { RequestAuth } from "../types/user";
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
    req: RequestAuth,
    res: Response,
    next: NextFunction
) => {
    const { ip } = req.query;
    if (!ip) return next(new ExpressError("IP cannot be blank", 404));
    const apiClient = new APIClient<IpInfo>("")
    const result = await apiClient.getIp(ip as string);

    if (result instanceof AxiosError) {
        return next(new ExpressError("Wrong IP, please input a valid IP", 404))
    }

    const newIpInfo = new ipInfo({ ...result, user: req.user._id })
    newIpInfo.save();
    res.json({ result })
}

export const getOneIpInfo = async (
    req: Request,
    res: Response
) => {
    const geIpInfo = await ipInfo.findOne({ ip: req.params.ip });

    res.json({ result: geIpInfo })
}

export const getHistory = async (
    req: RequestAuth,
    res: Response
) => {
    const ipList = await ipInfo.find({ user: req.user._id });

    res.json({ result: ipList })
}