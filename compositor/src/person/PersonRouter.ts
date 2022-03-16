import express from 'express';
import config from '../config';
import asyncWrapper from '../Utilities/AsyncWrapper';
import proxyMIddleWare from '../Utilities/ProxyMiddleWare';
import PersonController from './PersonController';

const personRouter: express.Router = express.Router();
personRouter.post(config.personService.createNewPerson, asyncWrapper(proxyMIddleWare(`${config.personService.route}${config.personService.createNewPerson}`)));
personRouter.delete(config.personService.deletePerson, asyncWrapper(PersonController.deletePerson));
personRouter.get(config.personService.createNewPerson, asyncWrapper(proxyMIddleWare(`${config.personService.route}${config.personService.createNewPerson}`)));
personRouter.put(config.personService.updateName, asyncWrapper(proxyMIddleWare(`${config.personService.route}${config.personService.updateName}`)));
personRouter.get(config.personService.groupsOfPerson, asyncWrapper(proxyMIddleWare(`${config.personService.route}${config.personService.groupsOfPerson}`)));
export default personRouter;
