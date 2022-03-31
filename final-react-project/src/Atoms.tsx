import { atom } from 'recoil';
import userType from './userInterface';

export default atom({
    key: 'userLoggedState',
    default: {} as userType,
});
