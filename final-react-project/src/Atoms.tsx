import { atom } from 'recoil';

export const loggedUserState = atom({
    key: "userLoggedState",
    default: undefined
});