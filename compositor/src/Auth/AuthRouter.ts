import express from "express";
import passport from "passport";
import config from "../config";
import asyncWrapper from "../Utilities/AsyncWrapper";
import AuthController from "./AuthController";
import ShragaConfig from './PassportConfigure'

const userRouter: express.Router = express.Router();

userRouter.get(config.authService.newUserCheck, ShragaConfig.shragaMiddleWare());

userRouter.post('/callback', ShragaConfig.shragaMiddleWare(), AuthController.callback);
// personRouter.get(config.userService.logout, asyncWrapper(PersonController.deletePerson));
export default userRouter;
