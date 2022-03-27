// import { Strategy } from "passport-shraga";

import passport from "passport";
const { Strategy } = require("passport-shraga");

const users: any[] = [];

passport.serializeUser((user: any, cb: Function) => {
    cb(null, user.id);
});

passport.deserializeUser((id: String, cb: Function) => {
    console.log('xd');
    const user = users.filter(user => user.id === id).length > 0 ? users.filter(user => user.id === id)[0] : {};
    cb(null, user);
});

const configurePassport = () => {
    passport.use(new Strategy({shragaURL: 'https://shraga.shraga.branch-yesodot.org', callbackURL: 'http://localhost:1234/user/callback'}, (profile: unknown | any, done: Function) => {
        console.log(profile.id);
        let length = users.filter(user => user.id === profile.id).length;
        if (length === 0)
            users.push(profile);
        done(null, profile);
    }))
}

export default configurePassport;