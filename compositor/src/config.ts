export default {
    port: 3000,

    groupService: {
        route: 'http://group-service:3000',
        createNewGroup: '/',
        getGroup: '/get-by-id',
        deleteGroup: '/',
        updateName: '/name',
        updateAppendGroup: '/append-group',
        updateRemoveGroup: '/remove-group',
        getGierarchy: '/hierarchy',
        appenedPerson: '/add-person',
        removePerson:'/remove-person',
        updateGroupsAboutDeletePerson: '/update-groups-person-delete',
        updateAllGroups: '/update-all-groups-delete-person'
    },
    personService: {
        route: 'http://person-service:3000',
        createNewPerson: '/',
        getPerson: '/',
        deletePerson: '/',
        updateName: '/name',
        groupsOfPerson: '/groups_of_person',
        updateAboutGroupDelete: '/deleted-groups-update',
        papulatePeople: '/populate-people',
        updateAddedGroup: '/added-person-to-group',
        updateRemoverGroup: '/remove-group-from-person',
        isPersonExist: '/is-person-exist',
    },
}