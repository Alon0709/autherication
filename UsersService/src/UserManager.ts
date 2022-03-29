import { userInterface } from './UserInterfaceSchema';
import UserCollectionRepository from './UserCollectionRepository';
// import { groupInterface } from './GroupInterfaceSchema';
import ServerError from './Utilities/ServerError';

export default class UserManager {
    static async userLoginCheck(userLoggedIn: userInterface) {
        if(!await UserCollectionRepository.checkIfExist(userLoggedIn._id))
            console.log(await UserCollectionRepository.createNewUser(userLoggedIn));
    }

    static checkIfFieldExist(fieldValue: string, fieldName: string) {
        if (!fieldValue || !fieldValue.length) throw new ServerError(400, `${fieldName} field doesnt exists or has no content....`);
    }
    
    static async userFindById(id: string) {
        this.checkIfFieldExist(id, 'id');
        return UserCollectionRepository.findUserById(id);
    }
}