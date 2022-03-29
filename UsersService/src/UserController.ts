import { Request, Response } from 'express';
import UserManager from './UserManager';

export default class UserController {
    static async userLoginCheck(request: Request, response: Response) {
        await UserManager.userLoginCheck(request.body.data);
        response.send('ok');
    }

    static async getUser(request: Request, response: Response) {
        response.json(await UserManager.userFindById(request.query.id as string));
    }
}