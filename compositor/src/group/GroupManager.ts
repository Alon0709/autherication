import ServerError from '../Utilities/ServerError';
import axiosPerson from '../Utilities/axiosPerson';
import axiosGroup from '../Utilities/axiosGroup';

export default class GroupManager {
    static async addPersonToGroup(body: {id: string, idOfPerson: string}) {
        this.checkIfFieldExist(body.id, 'id');
        this.checkIfFieldExist(body.idOfPerson, 'idOfPerson');
        await axiosPerson.isPersonExist({id: body.idOfPerson});
        const groupToReturn = await axiosGroup.appenedPerson(body);
        await axiosPerson.updateAddedGroup(body);
        return groupToReturn;
    }
    static async deleteGroupAndUpdatePeople(params: {id:string}) {
        this.checkIfFieldExist(params.id, 'id');
        let [peopleChange, deletedGroupTree] = await axiosGroup.deleteGroup(params);
        if(peopleChange.length)
        {
            await axiosPerson.updateRemoveGroup(peopleChange);
        }
        return await axiosPerson.papulatePeople(deletedGroupTree);
    }

    static async groupHierarchy(params: {id:string}) {
        this.checkIfFieldExist(params.id, 'id');
        const groupHierarchyArray = await axiosGroup.getGierarchy(params);
        return axiosPerson.papulatePeople(groupHierarchyArray);
    }

    static async removePersonFromGroup(body: {id: string, idOfPerson: string}) {
        this.checkIfFieldExist(body.id, 'id');
        this.checkIfFieldExist(body.idOfPerson, 'idOfPerson');
        await axiosPerson.isPersonExist({id: body.idOfPerson});
        const groupToReturn = await axiosGroup.removePerson(body);
        await axiosPerson.updateRemoverGroup({idGroup: body.id, idPerson: body.idOfPerson});
        return groupToReturn;
    }

    static checkIfFieldExist(fieldValue: string, fieldName: string) {
        if (!fieldValue || !fieldValue.length) throw new ServerError(400, `${fieldName} field doesnt exists or has no content....`);
    }
}
