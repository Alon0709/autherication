import GroupsCollectionRepository from './GroupsCollectionRepository';
import { groupInterface } from './GroupInterfaceSchema';
import ServerError from './Utilities/ServerError';
import PeopleUpdate from './PeopleUpdateListInterface';

export default class GroupManager {

    static async groupHierarchy(params: {id:string}) {
        if (params.id === '*') {
            const allGroupsId: string[] = await GroupsCollectionRepository.getAllGroupsId();
            const allGroupsHierarchy: Record<string, unknown>[] = [];
            while (true) {
                const id = allGroupsId.pop();
                if (!id) return allGroupsHierarchy;
                const groupHierarchy = await GroupsCollectionRepository.getHierarchyOfGroup(id);
                this.deleteIdsFromArrayBasedOnDoc(groupHierarchy, allGroupsId, allGroupsHierarchy);
                allGroupsHierarchy.push(groupHierarchy as any);
            }
        }
        await this.checkIfGroupIdExist(params.id);
        return GroupsCollectionRepository.getHierarchyOfGroup(params.id);
    }

    static deleteIdsFromArrayBasedOnDoc(group:any, GroupsId: string[], arrDocs:Record<string, unknown>[]) {
        group.groupsInGroup.forEach((groupDoc:any) => {
            const indexId = GroupsId.indexOf(groupDoc._id.toString());
            if (indexId !== -1) GroupsId.splice(indexId, 1);
            const indexDoc = arrDocs.findIndex((element: any) => element._id.toString() === groupDoc.id);
            if (indexDoc !== -1) arrDocs.splice(indexDoc, 1);
            this.deleteIdsFromArrayBasedOnDoc(groupDoc, GroupsId, arrDocs);
        });
    }

    static checkIfFieldExist(fieldValue: string, fieldName: string) {
        if (!fieldValue || !fieldValue.length) throw new ServerError(400, `${fieldName} field doesnt exists or has no content....`);
    }

    static createNewGroup(body: {name: string}) {
        this.checkIfFieldExist(body.name, 'name');
        const groupObj : groupInterface = { name: body.name, peopleInGroup: [], groupsInGroup: [] };
        return GroupsCollectionRepository.createNewGroup(groupObj);
    }

    static async deleteGroup(params: {id:string}) {
        await this.checkIfGroupIdExist(params.id);
        const groupsDeleted = await GroupsCollectionRepository.getHierarchyOfGroup(params.id);
        const arrayOfPeopleToUpdate: PeopleUpdate[] = await this.deleteGroupAndGetPeopleToUpdate(params.id).catch((err) => { throw err; });
        return [arrayOfPeopleToUpdate, groupsDeleted];
    }

    static async deleteGroupAndGetPeopleToUpdate(idObject: string) {
        const arrayOfPeopleToUpdate: PeopleUpdate[] = [];
        const doc = await GroupsCollectionRepository.findGroupById(idObject);
        if (!doc) throw new ServerError(400, 'no group by this id was found');
        if (doc.peopleInGroup.length) arrayOfPeopleToUpdate.push({ groupId: idObject, peopleId: doc.peopleInGroup });
        for (const groupID of doc.groupsInGroup) {
            const arrayOfPeopleToAdd = await this.deleteGroupAndGetPeopleToUpdate(groupID.toString());
            arrayOfPeopleToUpdate.push(...arrayOfPeopleToAdd);
        }
        await GroupsCollectionRepository.deleteGroup(idObject);
        await GroupsCollectionRepository.removeIdFromArrayFromAllGroups(idObject);
        return arrayOfPeopleToUpdate;
    }

    static async isGroupExist(idOfGroup: string) {
        return GroupsCollectionRepository.isExist(idOfGroup);
    }

    static async updateName(body: {id: string, newName: string}) {
        this.checkIfFieldExist(body.id, 'id');
        this.checkIfFieldExist(body.newName, 'newName');
        await this.checkIfGroupIdExist(body.id);
        return GroupsCollectionRepository.updateName(body.id, body.newName);
    }

    static deletePersonFromGroups(arrayOfGroups: string[], personID: string) {
        const arrayOfPromises = [];
        for (const groupID of arrayOfGroups) {
            arrayOfPromises.push(GroupsCollectionRepository.removePersonFromGroup(groupID, personID));
        }
        return arrayOfPromises;
    }

    static async addGroupToGroupList(body: {id: string, idOfGroupToAdd: string}) {
        this.checkIfFieldExist(body.id, 'id');
        this.checkIfFieldExist(body.idOfGroupToAdd, 'idOfGroupToAdd');
        if (body.id === body.idOfGroupToAdd) throw new ServerError(400, 'you cant add group to itself');
        await this.checkIfGroupIdExist(body.id);
        if (await GroupsCollectionRepository.isGroupAlreadyInGroup(body.idOfGroupToAdd)) throw new ServerError(400, 'you cant add a group that is already under a diffrent group');
        if (await GroupsCollectionRepository.isGroupAncestorOfGroup(body.id, body.idOfGroupToAdd)) throw new ServerError(400, 'you cant add group ancestor to itself....');
        return GroupsCollectionRepository.addGroupToGroupList(body.id, body.idOfGroupToAdd);
    }

    static async removePersonFromGroup(body: {id: string, idOfPerson: string}) {
        await this.checkIfGroupIdExist(body.id);
        if (!await GroupsCollectionRepository.checkIfPersonIsInGroup(body.id, body.idOfPerson)) throw new ServerError(400, 'there is no person by this id in the group....');
        return GroupsCollectionRepository.removePersonFromGroup(body.id, body.idOfPerson);
    }

    static async addPersonToGroup(body: {id: string, idOfPerson: string}) {
        await this.checkIfGroupIdExist(body.id);
        if (await GroupsCollectionRepository.checkIfPersonIsInGroup(body.id, body.idOfPerson)) throw new ServerError(400, 'person is already in the group....');
        return GroupsCollectionRepository.addPersonToGroup(body.id, body.idOfPerson);
    }

    static async removeGroupFromGroup(body: {id: string, idOfGroupToRemove: string}) {
        this.checkIfFieldExist(body.id, 'id');
        this.checkIfFieldExist(body.idOfGroupToRemove, 'idOfGroupToRemove');
        await this.checkIfGroupIdExist(body.id);
        return GroupsCollectionRepository.removeGroupFromGroup(body.id, body.idOfGroupToRemove);
    }

    static async checkIfGroupIdExist(id: string) {
        const isExist = await GroupsCollectionRepository.isExist(id);
        if (!isExist) throw new ServerError(400, 'group with this id doesnt exists....');
    }

    static async readGroup(params: {id:string}) {
        this.checkIfFieldExist(params.id, 'id');
        await this.checkIfGroupIdExist(params.id);
        return GroupsCollectionRepository.findGroupById(params.id);
    }
}
