// import { Strategy } from "passport-shraga";

import axios from "axios";
import passport, { use } from "passport";
import config from "../config";
import { KartoffelUser, User } from "./userInterface";
const { Strategy } = require("passport-shraga");

export default class ShragaConfig {
    static configurePassport() {
        passport.serializeUser((user: any, cb: Function) => {
            cb(null, user._id);
        });

        passport.deserializeUser((id: String, cb: Function) => {
            axios.get(`${config.authService.route}${config.authService.getUserById}`, {params:{id:id}}).then((res) => {
                cb(null, res.data)
            }).catch((err) => {
                cb(err);
            });
        });

        passport.use(new Strategy({shragaURL: config.shragaUrl, callbackURL: config.callbackURL}, async (profile: KartoffelUser, done: Function) => {
            const transUser = this.transformFunction(profile);
            await axios.post(`${config.authService.route}${config.authService.newUserCheck}`, {data: transUser}).then((res) => {
                done(null, transUser)
            }).catch((err) => {
                done(err)
            });
        }));
    }

    static transformFunction = (user:KartoffelUser) => {
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

    static shragaMiddleWare() {
        return passport.authenticate("shraga");
    }
}
