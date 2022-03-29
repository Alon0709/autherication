import express from 'express';
import asyncWrapper from './Utilities/AsyncWrapper';
import UserController from './UserController';

const usersRouter: express.Router = express.Router();
usersRouter.post('/', asyncWrapper(UserController.userLoginCheck));
usersRouter.get('/', asyncWrapper(UserController.getUser));

export default usersRouter;
