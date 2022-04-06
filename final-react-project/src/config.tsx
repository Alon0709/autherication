const compPort: string = process.env.REACT_APP_COMPOSITOR_PORT || '3000';
const Config = {
    groupPostRoute: `http://localhost:${compPort}/group`,
    groupGetAllRoute: `http://localhost:${compPort}/group/hierarchy?id=*`,
    groupPutAddGroup: `http://localhost:${compPort}/group/append-group`,
    groupPutNameUpdate: `http://localhost:${compPort}/group/name`,
    groupPutRemoveGroup: `http://localhost:${compPort}/group/remove-group`,
    groupPutAddPerson: `http://localhost:${compPort}/group/add-person`,
    groupPutRemovePerson: `http://localhost:${compPort}/group/remove-person`,
    groupDeleteRoute: `http://localhost:${compPort}/group`,
    personPostRoute: `http://localhost:${compPort}/person`,
    personGetAllRoute: `http://localhost:${compPort}/person/?id=*`,
    personDeleteRoute: `http://localhost:${compPort}/person`,
    personPutNameRoute: `http://localhost:${compPort}/person/name`,
    logginRoute: `http://localhost:${compPort}/auth/`,
    cookieUserName: 'SignInSecret',
    secretSDI: 'connect.sid',
    getUserObject: `http://localhost:${compPort}/user/get-user`,
};
export default Config;
