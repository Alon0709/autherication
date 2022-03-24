import express, {Express} from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
// import { Strategy } from 'passport-shraga';
const { Strategy } = require("passport-shraga");

import './Auth/passportShraga';
import config from './config';
import Router from './Router';
import errorMiddleWare from './Utilities/ErrorMiddleWare';
import {serilize, deserilize, localStrategy} from './Auth/passportShraga';

export default class Compositor {
    app: Express;
    port: number;

    constructor(port: number) {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: '*' }));
        this.app.use(session({
            secret: config.secretKey,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            }
        }));
        this.app.use(cookieParser(config.secretKey));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.serializeUser(serilize);
        passport.deserializeUser(deserilize);
        passport.use(new Strategy({shragaURL: 'https://shraga.shraga.branch-yesodot.org', callbackURL: 'http://localhost:1234/callback'}, localStrategy))

        this.app.use('/', Router);
        this.app.use(errorMiddleWare);
        this.port = port;
    }

    getExpressApp() {
        return this.app;
    }

    startServer() : void {
        this.app.listen(this.port, () => {
            console.log(`'server is listening of port ${config.port}`);
        });
    }
}
