import { ObjectId } from 'bson';

export default interface PeopleUpdate {
    groupId: string;
    peopleId: ObjectId[];
};
