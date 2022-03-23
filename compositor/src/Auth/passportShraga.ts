// import { Strategy } from "passport-shraga";

export function localStrategy(profile: any, done: Function) { 
    console.log(`My Profile Is: ${profile}`);
    done(null, profile);
}

export function serilize(user : any, cb: Function) {
    console.log('2');
    cb(null, user.id);
}

export function deserilize(id: string, cb: Function) {
    console.log('3');
    cb(null, {username: 'xd', gomo: 'boyass'})
}

