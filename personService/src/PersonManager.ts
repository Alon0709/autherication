import peopleCollectionRepository from './peopleCollectionRepository';
import ServerError from './Utilities/ServerError';
import { personInterface } from './PersonSchemaInterface';
import PeopleUpdate from './PeopleUpdateListInterface';
import halfPopulated from './populateInterface';

export default class PersonManager {
    static async populatePeople(body: halfPopulated | halfPopulated[]) {
        if(Array.isArray(body)) {
            return Promise.all(body.map(async (group: halfPopulated) => peopleCollectionRepository.populateGroupPeople(group)))
        }
        return peopleCollectionRepository.populateGroupPeople(body);
    }

    static createNewPerson(body: {name: string}) {
        this.checkIfFieldExist(body.name, 'name');
        const personObj: personInterface = { name: body.name, groupsHePartOf: [] };
        return peopleCollectionRepository.createNewPerson(personObj);
    }

    static checkIfFieldExist(fieldValue: string, fieldName: string) {
        if (!fieldValue || !fieldValue.length) throw new ServerError(400, `${fieldName} field doesnt exists or has no content....`);
    }

    static async getPersonGroups(params: {id:string}) {
        this.checkIfFieldExist(params.id, 'id');
        await this.checkPersonIdExist(params.id);
        return peopleCollectionRepository.getPersonGroups(params.id);
    }

    static async updatePersonName(body: {id: string, newName: string}) {
        this.checkIfFieldExist(body.id, 'id');
        this.checkIfFieldExist(body.newName, 'newName');
        await this.checkPersonIdExist(body.id);
        return peopleCollectionRepository.updatePersonName(body.id, body.newName);
    }

    static async deleteGroupFromPeople(updateList: PeopleUpdate[]) {
        const arrayOfPromises = [];
        for (const groupAndPeople of updateList) {
            for (const personID of groupAndPeople.peopleId) {
                arrayOfPromises.push(peopleCollectionRepository.removeGroupFromPerson(personID.toString(), groupAndPeople.groupId));
            }
        }
        Promise.all(arrayOfPromises).catch(() => {throw new ServerError(500, 'something failed while updating people')});
    }

    static async deletePerson(params: {id:string}) {
        await this.checkPersonIdExist(params.id);
        const groupsOfPerson = await peopleCollectionRepository.getPersonGroups(params.id);
        const personDeleted = await peopleCollectionRepository.findPersonById(params.id);
        await peopleCollectionRepository.deletePerson(params.id);
        console.log(personDeleted);
        return [personDeleted, groupsOfPerson];
    }

    static async addGroupToPersonList(idPerson: string, idGroup: string) {
        console.log(await peopleCollectionRepository.addGroupToList(idPerson, idGroup));
    }

    static async removeGroupFromPersonList(idPerson: string, idGroup: string) {
        return peopleCollectionRepository.removeGroupFromPerson(idPerson, idGroup);
    }

    static async checkPersonIdExist(id: string) {
        const isExist = await peopleCollectionRepository.isExist(id);
        if (!isExist) throw new ServerError(400, 'person with this id doesnt exists....');
    }

    static async readPerson(params: {id:string}) {
        this.checkIfFieldExist(params.id, 'id');
        if (params.id === '*') return peopleCollectionRepository.getAllPeople();
        await this.checkPersonIdExist(params.id);
        return peopleCollectionRepository.findPersonById(params.id);
    }
}
