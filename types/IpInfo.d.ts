import { Request } from "express";

export default interface IpInfo {
    readonly _id: mongoose.Types.ObjectId;
    ip: String,
    hostname: String,
    city: String,
    region: String,
    country: String,
    loc: String,
    org: String,
    postal: String,
    timezone: String,
    user: mongoose.Types.ObjectId
}