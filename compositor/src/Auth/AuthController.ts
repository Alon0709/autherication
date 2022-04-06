import { info } from 'console';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import config from '../config';
import ServerError from '../Utilities/ServerError';

export default class UserController {
    static login(request: Request, response: Response) {
        response.redirect('/');
    }

    static callback(request: Request, response: Response) {
        response.redirect(config.reactSiteUrl);
    }
}
