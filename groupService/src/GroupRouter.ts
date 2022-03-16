import express from 'express';
import asyncWrapper from './Utilities/AsyncWrapper';
import GroupController from './GroupController';

const groupRouter: express.Router = express.Router();
groupRouter.post('/', asyncWrapper(GroupController.createGroup));
groupRouter.get('/get-by-id', asyncWrapper(GroupController.readGroup));
groupRouter.put('/name', asyncWrapper(GroupController.updateName));
groupRouter.put('/append-group', asyncWrapper(GroupController.addGroupToGroup));
groupRouter.put('/remove-group', asyncWrapper(GroupController.removeGroupFromGroup));
groupRouter.delete('/', asyncWrapper(GroupController.deleteGroup));
groupRouter.get('/hierarchy', asyncWrapper(GroupController.groupHierarchy));
groupRouter.put('/add-person', asyncWrapper(GroupController.addPersonToGroup));
groupRouter.put('/remove-person', asyncWrapper(GroupController.removePersonFromGroup));
groupRouter.put('/update-all-groups-delete-person', asyncWrapper(GroupController.updateAllGroups))


export default groupRouter;
