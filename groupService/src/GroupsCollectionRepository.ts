import mongoose from 'mongoose';
import Config from './Config';
import { groupSchema, groupInterface } from './GroupInterfaceSchema';
import ServerError from './Utilities/ServerError';

export default class GroupsCollectionRepository {
    static GroupModel: mongoose.Model<groupInterface> = mongoose.model(Config.groupsCollection, groupSchema);

    static createNewGroup(groupToAdd: groupInterface) {
        return this.GroupModel.create(groupToAdd);
    }

    static async getAllGroupsId(): Promise<string[]> {
        const arrayDocs: groupInterface[] = await this.GroupModel.find({});
        const arrayIds: string[] = [];
        arrayDocs.forEach((doc) => {
            if (!doc._id) throw new ServerError(500, 'could not find id of a group....');
            arrayIds.push(doc._id.toString());
        });
        return arrayIds;
    }

    static async getHierarchyOfGroup(idOfGroup: string) {
        const group = await this.findGroupById(idOfGroup).populate({path: 'groupsInGroup'});
        await this.groupPopulateRecursive(group);
        return group;
    }

    static async groupPopulateRecursive(group: any) {
        for (let popGroup of group.groupsInGroup) {
            popGroup = await popGroup.populate({path: 'groupsInGroup'});
            await this.groupPopulateRecursive(popGroup)
        }

    }

    static async removeGroupFromGroup(idOfGroup: string, idOfGroupToRemove: string) {
        if (!await this.GroupModel.exists({ $and: [{ _id: idOfGroup }, { groupsInGroup: idOfGroupToRemove }] })) {
            throw new ServerError(400, `no group by id:${idOfGroupToRemove} was found in group:${idOfGroup}`);
        }
        return this.GroupModel.findByIdAndUpdate(idOfGroup, { $pull: { groupsInGroup: idOfGroupToRemove } }, { new: true });
    }

    static async isGroupAlreadyInGroup(idOfGroupToAdd: string) {
        return this.GroupModel.exists({ groupsInGroup: idOfGroupToAdd });
    }

    static deleteGroup(idObject: string) {
        return this.GroupModel.deleteOne({ _id: idObject }).then(() => this.removeIdFromArrayFromAllGroups(idObject));
    }

    static checkIfPersonIsInGroup(idOfGroup: string, idOfPerson: string) {
        return this.GroupModel.exists({ $and: [{ _id: idOfGroup }, { peopleInGroup: idOfPerson }] });
    }

    static addPersonToGroup(idOfGroup: string, idOfPerson: string) {
        return this.GroupModel.findByIdAndUpdate(idOfGroup, { $push: { peopleInGroup: idOfPerson } }, { new: true });
    }

    static addGroupToGroupList(idOfGroup: string, idOfGroupToAdd: string) {
        return this.GroupModel.findByIdAndUpdate(idOfGroup, { $push: { groupsInGroup: idOfGroupToAdd } }, { new: true });
    }

    static async isGroupAncestorOfGroup(idOfGroup: string, idOfGroupToAdd: string) {
        const doc = await GroupsCollectionRepository.findGroupById(idOfGroupToAdd);
        if (!doc) throw new ServerError(400, `no group by id:${idOfGroupToAdd} this id was found`);
        for (const groupID of doc.groupsInGroup) {
            if (groupID.toString() === idOfGroupToAdd.toString()) return true;
            if (await this.isGroupAncestorOfGroup(idOfGroup, groupID.toString())) return true;
        }
        if (idOfGroup.toString() === idOfGroupToAdd.toString()) return true;
        return false;
    }

    static removePersonFromGroup(idOfGroup: string, idOfPerson: string) {
        return this.GroupModel.findByIdAndUpdate(idOfGroup, { $pull: { peopleInGroup: idOfPerson } });
    }

    static updateName(idOfGroup: string, newName: string) {
        return this.GroupModel.findByIdAndUpdate(idOfGroup, { name: newName }, { new: true });
    }

    static removeIdFromArrayFromAllGroups(idObject: string) {
        return this.GroupModel.updateMany({ groupsInGroup: idObject }, { $pull: { groupsInGroup: idObject } }, { new: true });
    }

    static isExist(idObject: string) {
        return this.GroupModel.exists({ _id: idObject });
    }

    static findGroupById(idObject: string) {
        return this.GroupModel.findById(idObject);
    }
}
