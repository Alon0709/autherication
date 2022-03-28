import express from 'express';
import asyncWrapper from './Utilities/AsyncWrapper';
import UserController from './UserController';

const usersRouter: express.Router = express.Router();
usersRouter.post('/', asyncWrapper(UserController.userLoginCheck))


export default usersRouter;
