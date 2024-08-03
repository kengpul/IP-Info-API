import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import APIClient from "../api-client";
import ipInfo from "../models/ipInfo";
import IpInfo from "../types/IpInfo";
import { RequestAuth } from "../types/user";

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
    if (!ip) return res.status(400).json({error: "IP cannot be blank"});
    const apiClient = new APIClient<IpInfo>("")
    const result = await apiClient.getIp(ip as string);

    if (result instanceof AxiosError) {
        return res.status(400).json({error: "Wrong IP, please input a valid IP"})
    }

    const existIpInfo = await ipInfo.findOne({ip: result.ip})
    if(!existIpInfo) {
        const newIpInfo = new ipInfo({ ...result, user: req.user._id })
        newIpInfo.save();
    }

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
    const ipList = (await ipInfo.find({ user: req.user._id })).reverse();

    res.json({ result: ipList })
}