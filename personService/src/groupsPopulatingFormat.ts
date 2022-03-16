
export default interface groupsPopulateFormat {
    _id: string;
    name: string;
    peopleInGroup:string;
    groupsInGroup:groupsPopulateFormat[];
    __v: number;
}
