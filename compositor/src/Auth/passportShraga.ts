// import { Strategy } from "passport-shraga";

const users: any[] = [];

export function localStrategy(profile: any, done: Function) {
    console.log(profile.id);
        let length = users.filter(user => user.id === profile.id).length;
        if (length === 0)
            users.push(profile);
        done(null, profile);
    }

export function serilize(user : any, cb: Function) {
    console.log('2');
    cb(null, user.id);
}

export function deserilize(id: string, cb: Function) {
    const user = users.filter(user => user.id === id).length > 0 ? users.filter(user => user.id === id)[0] : {};
    cb(null, user);
}
