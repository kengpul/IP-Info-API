import { Request, Response } from "express";
import APIClient from "../api-client";
import IpInfo from "../types/IpInfo";


const apiClient = new APIClient<IpInfo>("/json")

export const getInitialIP = async (
    req: Request,
    res: Response,
) => {

    const result = await apiClient.getInitialIp();

    res.json({
        result
    })
}