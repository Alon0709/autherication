import express from 'express';
import groupRouter from './group/GroupRouter';
import personRouter from './person/PersonRouter';
import userRouter from './Auth/UserRouter';
import passport from 'passport';

const Router : express.Router = express.Router();
Router.use('/group', groupRouter);
Router.use('/person', personRouter);
Router.use('/user', userRouter)
Router.post('/callback', passport.authenticate("shraga"), function (req, res, next) {
    console.log(req.query.callbackUrl);
    // console.log(res);
    res.redirect('/');
});

export default Router;
