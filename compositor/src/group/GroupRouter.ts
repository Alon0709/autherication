import express from 'express';
import config from '../config';
import asyncWrapper from '../Utilities/AsyncWrapper';
import proxyMIddleWare from '../Utilities/ProxyMiddleWare';
import GroupController from './GroupControllet';

const groupRouter: express.Router = express.Router();
groupRouter.post(config.groupService.createNewGroup, asyncWrapper(proxyMIddleWare(`${config.groupService.route}${config.groupService.createNewGroup}`)));
groupRouter.get(config.groupService.getGroup, asyncWrapper(proxyMIddleWare(`${config.groupService.route}${config.groupService.getGroup}`)));
groupRouter.put(config.groupService.updateName, asyncWrapper(proxyMIddleWare(`${config.groupService.route}${config.groupService.updateName}`)));
groupRouter.put(config.groupService.updateAppendGroup, asyncWrapper(proxyMIddleWare(`${config.groupService.route}${config.groupService.updateAppendGroup}`)));
groupRouter.put(config.groupService.updateRemoveGroup, asyncWrapper(proxyMIddleWare(`${config.groupService.route}${config.groupService.updateRemoveGroup}`)));
groupRouter.delete(config.groupService.deleteGroup, asyncWrapper(GroupController.deleteGroup));
groupRouter.get(config.groupService.getGierarchy, asyncWrapper(GroupController.groupHierarchy));
groupRouter.put(config.groupService.appenedPerson, asyncWrapper(GroupController.addPersonToGroup));
groupRouter.put(config.groupService.removePerson, asyncWrapper(GroupController.removePersonFromGroup));

export default groupRouter;
