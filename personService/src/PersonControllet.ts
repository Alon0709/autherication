import { Request, Response } from 'express';
import groupsPopulateFormat from './groupsPopulatingFormat';
import PeopleUpdate from './PeopleUpdateListInterface';
import PersonManager from './PersonManager';

export default class PersonControllet {
    static async addGroupToPersonList(request: Request, response: Response) {
        await PersonManager.addGroupToPersonList(request.body.idOfPerson, request.body.id);
        response.send('ok');
    }
    static async checkIfPersonExist(request: Request, response: Response) {
        response.send({isExist: await PersonManager.checkPersonIdExist((request.query as {id: string}).id)});
    }
    static async populatePeople(request: Request, response: Response) {
        response.send(await PersonManager.populatePeople(request.body));
    }
    static async deleteGroupsFromPeople(request: Request, response: Response) {
        await PersonManager.deleteGroupFromPeople(request.body as PeopleUpdate[]);
        response.send('OK');
    }
    static async createPerson(request: Request, response: Response) {
        response.send(await PersonManager.createNewPerson(request.body));
    }

    static async updateName(request: Request, response: Response) {
        response.send(await PersonManager.updatePersonName(request.body));
    }

    static async getPersonGroups(request: Request, response: Response) {
        response.send(await PersonManager.getPersonGroups(request.query as {id:string}));
    }

    static async deletePerson(request: Request, response: Response) {
        response.send(await PersonManager.deletePerson(request.query as {id:string}));
    }

    static async removeGroupFromPerson(request: Request, response: Response) {
        await PersonManager.removeGroupFromPersonList(request.body.idPerson, request.body.idGroup);
        response.send('ok');
    }

    static async readPerson(request: Request, response: Response) {
        response.send(await PersonManager.readPerson(request.query as {id:string}));
    }
}
