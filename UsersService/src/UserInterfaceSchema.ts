import { Schema } from 'mongoose';

export interface userInterface {
    _id: string
    firstName: string;
    lastName: string;
    email: string;
    clearance: number;
    photo: string;
    phoneNumbers: string[];
}
export const groupSchema = new Schema<userInterface>({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    clearance: { type: Number, required: true },
    photo: { type: String, required: true },
    phoneNumbers: { type: [String], required: true }
});
