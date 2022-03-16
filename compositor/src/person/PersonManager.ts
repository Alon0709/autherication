import axiosPerson from "../Utilities/axiosPerson";
import ServerError from "../Utilities/ServerError";

export default class PersonManager {
    static checkIfFieldExist(fieldValue: string, fieldName: string) {
        if (!fieldValue || !fieldValue.length) throw new ServerError(400, `${fieldName} field doesnt exists or has no content....`);
    }

    static handleError(err: any) {
        throw new ServerError(err.response.status, err.response.data.message);
    }

    static async deletePerson(params: {id:string}) {
        this.checkIfFieldExist(params.id, 'id');
        return axiosPerson.delete(params);
    }
}