import { ObjectID } from 'bson';
import { Schema } from 'mongoose';

export interface groupInterface {
    _id?: string
    name: string;
    peopleInGroup: ObjectID[];
    groupsInGroup: ObjectID[];
}
export const groupSchema = new Schema<groupInterface>({
    name: { type: String, required: true },
    peopleInGroup: { type: [ObjectID], required: true, ref: 'people' },
    groupsInGroup: { type: [ObjectID], required: true, ref: 'groups' },
});
