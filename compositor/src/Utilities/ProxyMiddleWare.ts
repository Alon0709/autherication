import { Response, Request } from "express";
import axios from "axios";
import ServerError from "./ServerError";

const proxyMIddleWare = (proxyPath: string) => {
    return async (request: Request, response: Response): Promise<void> => {
        const axiosOptions: Object = {
            method: request.method,
            url: proxyPath,
            data: request.body,
            params: request.query
        }
        await axios(axiosOptions).then((res) => {
            if (res.status >= 400) throw new ServerError(res.status, res.data);
            response.send(res.data);
        }).catch((error) => {
            throw new ServerError(error.response.status, error.response.data.message)
        });
    }
}

export default proxyMIddleWare;
