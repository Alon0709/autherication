import mongoose from 'mongoose';
import Config from './Config';
import { userInterface, userSchema } from './UserInterfaceSchema';
// import { groupSchema, groupInterface } from './GroupInterfaceSchema';
import ServerError from './Utilities/ServerError';

export default class UserCollectionRepository {

    static UserModel = mongoose.model(Config.usersCollection, userSchema);

    static async checkIfExist(id:string): Promise<boolean> {
        const count = await this.UserModel.countDocuments({_id: id}).exec();
        return Boolean(count);
    }

    static findUserById(id:string): Promise<userInterface | null> {
        console.log(typeof id);
        return this.UserModel.findById({_id: id}).then((user) => {
            if(!user) throw new ServerError(400, 'no user by this id was found');
            return user;
        });
    } 

    static createNewUser(userToAdd: userInterface) {
        return this.UserModel.create(userToAdd);
    }
}

