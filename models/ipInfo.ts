import mongoose from "mongoose";
import IpInfo from "../types/IpInfo";

const ipInfoSchema = new mongoose.Schema({
    ip: String,
    hostname: String,
    city: String,
    region: String,
    country: String,
    loc: String,
    org: String,
    postal: String,
    timezone: String
})

const ipInfo = mongoose.model<IpInfo>("IpInfo", ipInfoSchema)

export default ipInfo;