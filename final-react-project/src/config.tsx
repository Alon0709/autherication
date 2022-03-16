const Config = {
    groupPostRoute: 'http://localhost:1234/group',
    groupGetAllRoute: 'http://localhost:1234/group/hierarchy?id=*',
    groupPutAddGroup: 'http://localhost:1234/group/append-group',
    groupPutNameUpdate: 'http://localhost:1234/group/name',
    groupPutRemoveGroup: 'http://localhost:1234/group/remove-group',
    groupPutAddPerson: 'http://localhost:1234/group/add-person',
    groupPutRemovePerson: 'http://localhost:1234/group/remove-person',
    groupDeleteRoute: 'http://localhost:1234/group',
    personPostRoute: 'http://localhost:1234/person',
    personGetAllRoute: 'http://localhost:1234/person/?id=*',
    personDeleteRoute: 'http://localhost:1234/person',
    personPutNameRoute: 'http://localhost:1234/person/name',
};
export default Config;
