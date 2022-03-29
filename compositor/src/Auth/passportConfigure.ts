// import { Strategy } from "passport-shraga";

import axios from "axios";
import passport, { use } from "passport";
import config from "../config";
import { KartoffelUser, User } from "./userInterface";
const { Strategy } = require("passport-shraga");

const transformFunction = (user:KartoffelUser) => {
    const saveUser:User = {} as User;
    saveUser._id = user.genesisId;
    saveUser.firstName = user.name.firstName;
    saveUser.lastName = user.name.lastName;
    saveUser.email = user.email;
    saveUser.clearance = Number(user.clearance);
    saveUser.photo = user.photo;
    saveUser.phoneNumbers = user.phoneNumbers;
    return saveUser;
};

passport.serializeUser((user: any, cb: Function) => {
    cb(null, user._id);
});

passport.deserializeUser((id: String, cb: Function) => {
    console.log(id);
    axios.get(`${config.userService.route}${config.userService.getUserById}`, {params:{id:id}}).then((res) => {
        console.log(res.data);
        cb(null, res.data)
    }).catch((err) => {
        console.log(err);
        
        cb(err)
    });
});
const configurePassport = () => {
    passport.use(new Strategy({shragaURL: config.shragaUrl, callbackURL: config.callbackURL}, (profile: KartoffelUser, done: Function) => {
        const transUser = transformFunction(profile);
        axios.post(`${config.userService.route}${config.userService.newUserCheck}`, {data: transUser}).then((res) => {
            done(null, transUser)
        }).catch((err) => {
            done(err)
        });
    }));
}

export default configurePassport;