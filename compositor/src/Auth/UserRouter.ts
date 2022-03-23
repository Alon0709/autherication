import express from "express";
import passport from "passport";
import config from "../config";
import asyncWrapper from "../Utilities/AsyncWrapper";
import proxyMIddleWare from "../Utilities/ProxyMiddleWare";
import UserController from "./UserController";

const userRouter: express.Router = express.Router();

userRouter.get(
  config.userService.login,
  passport.authenticate("shraga", { failureRedirect: "/", failureFlash: true }),
  asyncWrapper(UserController.login)
);

// personRouter.get(config.userService.logout, asyncWrapper(PersonController.deletePerson));
export default userRouter;
