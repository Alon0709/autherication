import express from 'express';
import groupRouter from './group/GroupRouter';
import personRouter from './person/PersonRouter';
import authRouter from './Auth/AuthRouter';
import passport from 'passport';
import config from './config';

const Router : express.Router = express.Router();
Router.use('/auth', authRouter);
Router.use('/', (req, res) => {
    if(!req.user) res.redirect(`/auth${config.authService.newUserCheck}`)
});
Router.use('/group', groupRouter);
Router.use('/person', personRouter);
Router.use('/user')

export default Router;
