import { Schema } from 'mongoose';
import { ObjectId } from 'bson';

export interface personInterface {
    name: string;
    groupsHePartOf: ObjectId[];
}

export const personSchema = new Schema<personInterface>({
    name: { type: String, required: true },
    groupsHePartOf: { type: [ObjectId], required: true },
});
