import { Request, Response } from 'express';
import GroupManager from './GroupManager';

export default class GroupController {
    static async createGroup(request: Request, response: Response) {
        response.send(await GroupManager.createNewGroup(request.body));
    }

    static async updateAllGroups(request: Request, response: Response) {
        const body = request.body as {arrayOfGroups: string[], id: string}
        await Promise.all(GroupManager.deletePersonFromGroups(body.arrayOfGroups, body.id));
        response.send('ok');
    }
    
    static async deleteGroup(request: Request, response: Response) {
        response.send(await GroupManager.deleteGroup(request.query as {id:string}));
    }

    static async readGroup(request: Request, response: Response) {
        response.send(await GroupManager.readGroup(request.query as {id:string}));
    }

    static async groupHierarchy(request: Request, response: Response) {
        response.send(await GroupManager.groupHierarchy(request.query as {id:string}));
    }

    static async removeGroupFromGroup(request: Request, response: Response) {
        response.send(await GroupManager.removeGroupFromGroup(request.body));
    }

    static async addGroupToGroup(request: Request, response: Response) {
        response.send(await GroupManager.addGroupToGroupList(request.body));
    }

    static async removePersonFromGroup(request: Request, response: Response) {
        response.send(await GroupManager.removePersonFromGroup(request.body));
    }

    static async addPersonToGroup(request: Request, response: Response) {
        response.send(await GroupManager.addPersonToGroup(request.body));
    }

    static async updateName(request: Request, response: Response) {
        response.send(await GroupManager.updateName(request.body));
    }

}
