import express, {Express} from 'express';
import cors from 'cors';
import config from './config';
import Router from './Router';
import errorMiddleWare from './Utilities/ErrorMiddleWare';

export default class Compositor {
    app: Express;
    port: number;

    constructor(port: number) {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: '*' }));
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
