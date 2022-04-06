import { Request, Response } from 'express';
import UserManager from './UserManager';

export default class GroupController {
    static getUserBack(request: Request, response: Response) {
        response.json(request.user);
    }
}