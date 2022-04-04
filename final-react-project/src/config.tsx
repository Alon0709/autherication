const Config = {
    groupPostRoute: 'http://localhost:3000/group',
    groupGetAllRoute: 'http://localhost:3000/group/hierarchy?id=*',
    groupPutAddGroup: 'http://localhost:3000/group/append-group',
    groupPutNameUpdate: 'http://localhost:3000/group/name',
    groupPutRemoveGroup: 'http://localhost:3000/group/remove-group',
    groupPutAddPerson: 'http://localhost:3000/group/add-person',
    groupPutRemovePerson: 'http://localhost:3000/group/remove-person',
    groupDeleteRoute: 'http://localhost:3000/group',
    personPostRoute: 'http://localhost:3000/person',
    personGetAllRoute: 'http://localhost:3000/person/?id=*',
    personDeleteRoute: 'http://localhost:3000/person',
    personPutNameRoute: 'http://localhost:3000/person/name',
    logginRoute: 'http://localhost:3000/user/',
    cookieUserName: 'SignInSecret',
    secretSDI: 'connect.sid',
    getUserObject: 'http://localhost:3000/user/get-user',
    cookiesInUse: ['sessionUser', 'sessionPassword'],
};
export default Config;
