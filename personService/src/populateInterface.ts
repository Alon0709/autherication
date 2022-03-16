import { personInterface } from "./PersonSchemaInterface";

export default interface halfPopulated {
    _id: string;
    name: string;
    peopleInGroup: string[] | any;
    groupsInGroup: any;
}