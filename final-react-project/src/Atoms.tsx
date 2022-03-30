import {atom} from 'recoil';

export const loggedUserState = atom({
    key: "userLoggedState",
    default: {xd:1, name:'yourmom'}
})