import express from "express";
import passport from "passport";
import config from "../config";
import asyncWrapper from "../Utilities/AsyncWrapper";
import proxyMIddleWare from "../Utilities/ProxyMiddleWare";
import UserController from "./UserController";

const userRouter: express.Router = express.Router();

userRouter.get(config.userService.newUserCheck, passport.authenticate("shraga", UserController.login));

userRouter.post('/callback', passport.authenticate("shraga"), function (req, res, next) {
    res.redirect('http://localhost:3000/');
});

// personRouter.get(config.userService.logout, asyncWrapper(PersonController.deletePerson));
export default userRouter;
