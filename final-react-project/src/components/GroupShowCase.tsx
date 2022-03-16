/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { Card, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { TreeItem } from '@mui/lab';
import React, { FC, useEffect, useState } from 'react';
import PlushIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import GroupInterface from '../utilities/GroupInterface';
import PersonInterface from '../utilities/PersonInterface';
import CreateDialog, { formValueInterface } from './CreateDialog';
import encodeDate from './urlencoderFunction';
import config from '../config';

const createGroup = (group: GroupInterface, handleGroupMoveChange: Function) => <div key={group._id}>
    <GroupShowCase key={group._id} group={group} handleGroupMoveChange={handleGroupMoveChange} />
</div>;

const GroupShowCase: FC<{ group:GroupInterface, handleGroupMoveChange: Function }> = (props: { group:GroupInterface, handleGroupMoveChange: Function }) => {
    const [createDialogState, setCreateOpen] = useState<boolean>(false);
    const [editDialogState, setEditOpen] = useState<boolean>(false);
    const [groupsInGroup, setGroupsInGroup] = useState<GroupInterface[]>([]);
    const [peopleInGroup, setPeopleInGroup] = useState<PersonInterface[]>([]);

    const createPerson = (person: PersonInterface) => <div key={person._id}><p>name: {person.name}</p><p>id: {person._id}</p></div>;

    const formCreateHandler = (values: formValueInterface) => {
        setCreateOpen(false);
        if (!values.groupName) {
            alert('name must have at leate one character!');
            return;
        }
        axios.post(config.groupPostRoute, encodeDate({ name: values.groupName })).then((response) => {
            setGroupsInGroup(() => [...groupsInGroup, response.data]);
            axios.put(config.groupPutAddGroup, encodeDate({ id: props.group._id, idOfGroupToAdd: response.data._id }));
        }).catch((error) => alert(error.data));
    };

    const handleUpdate = async (updateName: string, route: string, body: formValueInterface) => {
        axios.put(route, encodeDate(body)).catch((err) => {
            console.log(`there was err in ${updateName}: ${err}`);
        });
    };

    const formEditHandler = (values: formValueInterface) => {
        setEditOpen(false);
        let isThereChange: boolean = false;
        const arrayOfPromises: Promise<any>[] = [];
        if (values.editName) {
            isThereChange = true;
            arrayOfPromises.push(handleUpdate('name', config.groupPutNameUpdate, { id: props.group._id, newName: values.editName }));
        }
        if (values.groupToAdd) {
            isThereChange = true;
            arrayOfPromises.push(handleUpdate('group to add', config.groupPutAddGroup, { id: props.group._id, idOfGroupToAdd: values.groupToAdd }));
        }
        if (values.groupToRemove) {
            isThereChange = true;
            arrayOfPromises.push(handleUpdate('group to remove', config.groupPutRemoveGroup, { id: props.group._id, idOfGroupToRemove: values.groupToRemove }));
        }
        if (values.personToAdd) {
            isThereChange = true;
            console.log(values.personToAdd);
            arrayOfPromises.push(handleUpdate('person to add', config.groupPutAddPerson, { id: props.group._id, idOfPerson: values.personToAdd }));
        }
        if (values.personRemove) {
            isThereChange = true;
            arrayOfPromises.push(handleUpdate('person to remove', config.groupPutRemovePerson, { id: props.group._id, idOfPerson: values.personRemove }));
        }
        if (isThereChange) {
            Promise.allSettled(arrayOfPromises).then(() => props.handleGroupMoveChange());
        }
    };

    useEffect(() => {
        setGroupsInGroup(props.group.groupsInGroup);
        setPeopleInGroup(props.group.peopleInGroup);
    }, []);

    return <div><Card elevation={5}>
        <h1>name of group: {props.group.name}</h1>
        <h3>_id: {props.group._id}</h3>
        <Box>
            <CreateDialog open={editDialogState} setFunc={setEditOpen} dialogLabel='Choose what to edit!' questionsArray={[
                { questionName: 'editName', questionText: 'new name' },
                { questionName: 'groupToAdd', questionText: 'group id to add' },
                { questionName: 'groupToRemove', questionText: 'group id to remove' },
                { questionName: 'personToAdd', questionText: 'person id to add' },
                { questionName: 'personRemove', questionText: 'person id to remove' },
            ]} formHandler={formEditHandler} />
            <IconButton onClick={() => {
                axios.delete(config.groupDeleteRoute, { params: { id: props.group._id } }).then(() => props.handleGroupMoveChange());
            }}><Delete color='error'/></IconButton>
            <IconButton onClick={() => setEditOpen(true)}><EditIcon /></IconButton>
        </Box>
        <TreeItem nodeId={`${props.group._id}-groupsList`} label='group list'>
            <IconButton onClick={() => setCreateOpen(true)}><PlushIcon color='success'/></IconButton>
            <CreateDialog open={createDialogState} setFunc={setCreateOpen} dialogLabel={`create a new Group inside ${props.group.name}:${props.group._id}`}
                questionsArray={[{ questionName: 'groupName', questionText: 'Group name' }]} formHandler={formCreateHandler} />
            {groupsInGroup.map((group) => createGroup(group, props.handleGroupMoveChange))}
        </TreeItem>
        <TreeItem nodeId={`${props.group._id}-peopleList`} label='people list'>
            {peopleInGroup.map((person) => createPerson(person))}
        </TreeItem>
    </Card></div>;
};

export default GroupShowCase;
export { createGroup };
