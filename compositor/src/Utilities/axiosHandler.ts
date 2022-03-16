import axios, { Method } from "axios";
import ServerError from "./ServerError";

export function axiosHandler(method: string, path: string, body: any, query: any) {
    return axios(path ,{
        method: method as Method,
        data: body,
        params: query
    }).catch(errorCatch)
}


export function errorCatch (err: any) {
    throw new ServerError(err.response.status, err.response.data.message);
}
