import { Request, Response } from 'express';
import GroupManager from './GroupManager';

export default class GroupController {
    static async groupHierarchy(request: Request, response: Response) {
        response.send(await GroupManager.groupHierarchy(request.query as {id:string}));
    }

    static async removePersonFromGroup(request: Request, response: Response) {
        response.send(await GroupManager.removePersonFromGroup(request.body));
    }

    static async addPersonToGroup(request: Request, response: Response) {
        response.send(await GroupManager.addPersonToGroup(request.body));
    }

    static async deleteGroup(request: Request, response: Response) {
        response.send(await GroupManager.deleteGroupAndUpdatePeople(request.query as {id:string}));
    }
}