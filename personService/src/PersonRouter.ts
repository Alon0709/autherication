import express from 'express';
import asyncWrapper from './Utilities/AsyncWrapper';
import PersonControllet from './PersonControllet';

const personRouter: express.Router = express.Router();
personRouter.post('/', asyncWrapper(PersonControllet.createPerson));
personRouter.delete('/', asyncWrapper(PersonControllet.deletePerson));
personRouter.patch('/populate-people', asyncWrapper(PersonControllet.populatePeople))
personRouter.get('/', asyncWrapper(PersonControllet.readPerson));
personRouter.put('/name', asyncWrapper(PersonControllet.updateName));
personRouter.put('/deleted-groups-update', asyncWrapper(PersonControllet.deleteGroupsFromPeople))
personRouter.get('/groups_of_person', asyncWrapper(PersonControllet.getPersonGroups));
personRouter.get('/is-person-exist', asyncWrapper(PersonControllet.checkIfPersonExist));
personRouter.put('/added-person-to-group', asyncWrapper(PersonControllet.addGroupToPersonList));
personRouter.put('/remove-group-from-person', asyncWrapper(PersonControllet.removeGroupFromPerson))
export default personRouter;
