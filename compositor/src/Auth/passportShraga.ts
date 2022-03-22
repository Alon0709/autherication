// import { Strategy } from "passport-shraga";

export function localStrategy(username: string, password: string, done: Function) { 
    console.log('1');
    return done(null, {username: 'xd', password: 'yourmom'});
}

export function serilize(user : any, cb: Function) {
    console.log('2');
    cb(null, user.id);
}

export function deserilize(id: string, cb: Function) {
    console.log('3');
    cb(null, {username: 'xd', gomo: 'boyass'})
}

