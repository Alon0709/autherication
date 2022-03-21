import 'dotenv/config'

export default {
    port: Number(process.env.INNER_PORT) || 1234,

    groupService: {
        route: `http://${process.env.GROUP_IP || 'localhost'}:${process.env.INNER_PORT || 4321}`,
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
        route: `http://${process.env.PERSON_IP || 'localhost'}:${process.env.INNER_PORT || 2314}`,
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