/* eslint-disable no-undef */
// eslint-disable-next-line object-curly-newline
import { Container, Grid, IconButton, Stack } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import PlushIcon from '@mui/icons-material/Add';
import { TreeView } from '@mui/lab';
import GroupInterface from '../utilities/GroupInterface';
import { createGroup } from './GroupShowCase';
import CreateDialog, { formValueInterface } from './CreateDialog';
import encodeDate from './urlencoderFunction';
import config from '../config';

const GroupsPage: FC = () => {
    const [groupsList, setGroups] = useState<GroupInterface[]>([]);
    const [open, setOpen] = useState(false);

    const getAllGroup = (async () => {
        setGroups([]);
        axios.get(config.groupGetAllRoute).then((response: AxiosResponse<GroupInterface[], any>) => {
            setGroups(response.data);
        });
    });

    const createGroupForm = (values: formValueInterface) => {
        setOpen(false);
        axios.post(config.groupPostRoute, encodeDate({ name: values.groupName })).then((response) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            setGroups([...groupsList, response.data])).catch((err) => alert(err.data));
    };

    useEffect(() => { getAllGroup(); }, []);

    return <Grid item xs={2} sm={4} md={4}>
        <Container>
            <IconButton onClick={() => setOpen(true)}><PlushIcon color="success"/></IconButton>
            <CreateDialog open={open} setFunc={setOpen} dialogLabel="create a new Group!"
                questionsArray={[{ questionName: 'groupName', questionText: 'Group name' }]} formHandler={createGroupForm} />
            <Stack direction="row" spacing={2} alignItems="center">
                {groupsList.map((group) => <TreeView key={group._id}>{createGroup(group, getAllGroup)}</TreeView>)}
            </Stack>
        </Container>
    </Grid>;
};

export default GroupsPage;
