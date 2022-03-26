import { info } from 'console';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import ServerError from '../Utilities/ServerError';

export default class UserControllet {
    static login(request: Request, response: Response, next: NextFunction) {
        // if (!request.query.callbackUrl)
        //     throw new ServerError(400, 'no callbackUrl was given');
        passport.authenticate("shraga")(request, response, (next))
    }
}
