import express from "express";
import passport from "passport";
import config from "../config";
import asyncWrapper from "../Utilities/AsyncWrapper";
import proxyMIddleWare from "../Utilities/ProxyMiddleWare";
import UserController from "./UserController";

const userRouter: express.Router = express.Router();

userRouter.get(config.userService.newUserCheck, passport.authenticate("shraga", UserController.login));

userRouter.post('/callback', passport.authenticate("shraga"), function (req, res, next) {
    
    res.redirect(config.reactSiteUrl);
});

userRouter.get(config.getUserObject, passport.authenticate("shraga"), UserController.getUserBack);

// personRouter.get(config.userService.logout, asyncWrapper(PersonController.deletePerson));
export default userRouter;
