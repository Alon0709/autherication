import config from "../config";
import { axiosHandler } from "./axiosHandler";

export default class axiosGroup {
    static appenedPerson(body: {id: string, idOfPerson: string}) {
        return axiosHandler('put', `${config.groupService.route}${config.groupService.appenedPerson}`, body, undefined).then((res) => res?.data);
    }

    static deleteGroup(params: {id:string}) {
        return axiosHandler('delete', `${config.groupService.route}${config.groupService.deleteGroup}`, undefined, params).then((res) => res?.data as Array<any>);
    }

    static removePerson(body: {id: string, idOfPerson: string}) {
        return axiosHandler('put', `${config.groupService.route}${config.groupService.removePerson}`, body, undefined).then((res) => res?.data);
    }
    
    static getGierarchy(params: {id:string}) {
        return axiosHandler('get', `${config.groupService.route}${config.groupService.getGierarchy}`, undefined, params).then((res) => res?.data);
    }

    static updateAllGroup(body: {arrayOfGroups: Array<any>; id: string}) {
        return axiosHandler('put', `${config.groupService.route}${config.groupService.updateAllGroups}`, body, undefined)
    }
}