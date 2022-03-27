import express from 'express';
import groupRouter from './group/GroupRouter';
import personRouter from './person/PersonRouter';
import userRouter from './Auth/UserRouter';
import passport from 'passport';

const Router : express.Router = express.Router();
Router.use('/group', groupRouter);
Router.use('/person', personRouter);
Router.use('/user', userRouter)
Router.get('/test', (req, res) => {
    console.log(req.cookies);
    console.log('test');
    console.log(req.user);
    res.send(req.user)
});

export default Router;
