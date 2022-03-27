import express, {Express} from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
// import { Strategy } from 'passport-shraga';

import passportConfig from './Auth/passportConfigure';
import config from './config';
import Router from './Router';
import errorMiddleWare from './Utilities/ErrorMiddleWare';

export default class Compositor {
    app: Express;
    port: number;

    constructor(port: number) {
        passportConfig();
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors({ origin: ['http://localhost:3000','http://localhost:1234'], credentials: true}));
        this.app.use(cookieParser());
        this.app.use(session({
            secret: config.secretKey,
            resave: false,
            saveUninitialized: true,
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
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
