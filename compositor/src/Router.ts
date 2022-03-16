import express from 'express';
import groupRouter from './group/GroupRouter';
import personRouter from './person/PersonRouter';

const Router : express.Router = express.Router();
Router.use('/group', groupRouter);
Router.use('/person', personRouter);

export default Router;
