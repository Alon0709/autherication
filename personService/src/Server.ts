import express, {Express} from "express";
import cors from 'cors';
import personRouter from "./PersonRouter";
import Config from './Config';
import errorMiddleWare from "./Utilities/ErrorMiddleWare";

export default class server {
    app: Express;
    port: number;

    constructor(port: number) {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors({ origin: '*' }));
        this.app.use('/', personRouter);
        this.app.use(errorMiddleWare);
        this.port = port;
    }

    getExpressApp() {
        return this.app;
    }

    startServer() : void {
        this.app.listen(this.port, () => {
            console.log(`'server is listening of port ${Config.port}`);
        });
    }
}
