import PersonInterface from './PersonInterface';
/* eslint-disable */
export default interface GroupInterface {
    _id: string;
    name: string;
    peopleInGroup: PersonInterface[];
    groupsInGroup: GroupInterface[];
};