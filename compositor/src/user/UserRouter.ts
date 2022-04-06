import express from 'express';
import ShragaConfig from '../Auth/PassportConfigure';
import config from '../config';
import asyncWrapper from '../Utilities/AsyncWrapper';
import proxyMIddleWare from '../Utilities/ProxyMiddleWare';
import PersonController from './UserController';

const userRouter: express.Router = express.Router();
userRouter.get(config.getUserObject, ShragaConfig.shragaMiddleWare(), PersonController.getUserBack);

export default userRouter;
