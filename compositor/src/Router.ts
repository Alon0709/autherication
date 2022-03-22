import express from 'express';
import groupRouter from './group/GroupRouter';
import personRouter from './person/PersonRouter';
import userRouter from './Auth/UserRouter';

const Router : express.Router = express.Router();
Router.use('/group', groupRouter);
Router.use('/person', personRouter);
Router.use('/user', userRouter)

export default Router;
