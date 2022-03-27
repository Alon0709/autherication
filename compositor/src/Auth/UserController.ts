import { info } from 'console';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import ServerError from '../Utilities/ServerError';

export default class UserControllet {
    static login(request: Request, response: Response, next: NextFunction) {
        console.log(request.user);
        response.redirect('http://localhost:3000/');
    }


}
