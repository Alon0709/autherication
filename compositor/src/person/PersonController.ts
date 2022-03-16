import { Request, Response } from 'express';
import PersonManager from './PersonManager';

export default class PersonControllet {
    static async deletePerson(request: Request, response: Response) {
        response.send(await PersonManager.deletePerson(request.query as {id:string}));
    }
}