import { info } from 'console';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import ServerError from '../Utilities/ServerError';

export default class UserController {
    static login(request: Request, response: Response, next: NextFunction) {
        response.redirect('http://localhost:3000/');
    }

    static getUserBack(request: Request, response: Response) {
        response.json(request.user);
    }
}
