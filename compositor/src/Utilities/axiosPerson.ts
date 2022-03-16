import config from "../config"
import axiosGroup from "./axiosGroup";
import { axiosHandler } from "./axiosHandler"

export default class axiosPerson {
    static isPersonExist(params: {id: string}) {
        return axiosHandler('get', `${config.personService.route}${config.personService.isPersonExist}`, undefined, params)
    }

    static updateAddedGroup(body: {id: string, idOfPerson: string}) {
        return axiosHandler('put', `${config.personService.route}${config.personService.updateAddedGroup}`, body, undefined);
    }

    static updateRemoveGroup(arrayOfGroups: Array<any>) {
        return axiosHandler('put', `${config.personService.route}${config.personService.updateAboutGroupDelete}`, arrayOfGroups, undefined );
    }

    static papulatePeople(papulateDoc : Record<string, unknown>) {
        return axiosHandler('patch', `${config.personService.route}${config.personService.papulatePeople}`, papulateDoc, undefined).then((res) => res?.data);
    }

    static updateRemoverGroup(body: {idGroup: string, idPerson: string}) {
        return axiosHandler('put', `${config.personService.route}${config.personService.updateRemoverGroup}`, body, undefined);
    }

    static delete(params: {id:string}) {
        return axiosHandler('delete', `${config.personService.route}${config.personService.deletePerson}`, undefined, params).then((res) => {
            return axiosGroup.updateAllGroup({arrayOfGroups: res?.data[1], id: res?.data[0]._id}).then(() => res?.data[0]);
        })
    }

}