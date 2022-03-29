import mongoose from 'mongoose';
import Config from './Config';
import { personSchema, personInterface } from './PersonSchemaInterface';
import halfPopulated from './populateInterface';
import ServerError from './Utilities/ServerError';

export default class peopleCollectionRepository {

    static async populateGroupPeople(group: halfPopulated) {
        for (let [index, personId] of group.peopleInGroup.entries()) {
            group.peopleInGroup[index] = await this.findPersonById(personId);
        }
        if(group.groupsInGroup && group.groupsInGroup.length) await this.populateGroupPeopleInside(group);
        return group;
    }

    static async populateGroupPeopleInside(groupToGoOver: halfPopulated) {
        if(!groupToGoOver.groupsInGroup) groupToGoOver.groupsInGroup = [];
            for (let popGroup of groupToGoOver.groupsInGroup) {
                if(!popGroup.peopleInGroup) popGroup.peopleInGroup = [];
                    for (let personId of popGroup.peopleInGroup) {
                        personId = await this.findPersonById(personId);
                    }
                await this.populateGroupPeopleInside(popGroup);
            }
    }

    static PersonModel = mongoose.model(Config.peopleCollection, personSchema);

    static createNewPerson(personToAdd: personInterface) {
        return this.PersonModel.create(personToAdd);
    }

    static getAllPeople() {
        return this.PersonModel.find({});
    }



    static updatePersonName(idObject:string, newName:string) {
        return this.PersonModel.findByIdAndUpdate(idObject, { name: newName }, { new: true });
    }

    static deletePerson(idObject:string) {
        return this.PersonModel.deleteOne({ _id: idObject });
    }

    static removeGroupFromPerson(idOfPerson: string, idOfGroup: string) {
        return this.PersonModel.findByIdAndUpdate(idOfPerson, { $pull: { groupsHePartOf: idOfGroup } });
    }

    static getPersonGroups(idObject: string) {
        return this.PersonModel.findById(idObject).then((doc) => {
            if (!doc) throw new ServerError(400, 'no person by this id was found'); return doc.groupsHePartOf;
        });
    }

    static addGroupToList(idPerson: string, idGroup: string) {
        return this.PersonModel.findByIdAndUpdate(idPerson, { $push: { groupsHePartOf: idGroup } }, { new: true });
    }

    static isExist(idObject: string) {
        return this.PersonModel.exists({ _id: idObject });
    }

    static findPersonById(idObject: string) {
        return this.PersonModel.findById(idObject);
    }
}
