import axios from "axios";
import IpInfo from "./types/IpInfo";

const axiosInstance = axios.create({
    baseURL: process.env.IP_API_BASE_URL,
    params: { token: process.env.TOKEN }
})

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    getInitialIp = () => {
        return axiosInstance
            .get<IpInfo>(this.endpoint)
            .then(res => res.data)
            .catch(err => err)
    }
}

export default APIClient