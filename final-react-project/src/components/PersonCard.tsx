import { TreeView, TreeItem } from '@mui/lab';
import { Card, Grid, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Delete from '@mui/icons-material/Delete';
import PersonInterface from '../utilities/PersonInterface';
import config from '../config';
import CreateDialog, { formValueInterface } from './CreateDialog';
import encodeDate from './urlencoderFunction';

interface Props {
    person: PersonInterface;
    handlePersonChange: Function;
}

const PersonCard: FC<Props> = (props: Props) => {
    const [updateOpenDialog, setUpdateDialogState] = useState(false);

    const formEditHandler = (values: formValueInterface) => {
        setUpdateDialogState(false);
        if (values.editName) { axios.put(config.personPutNameRoute, encodeDate({ id: props.person._id, newName: values.editName })).then(() => props.handlePersonChange()); return; }
        alert('no value was put in the name field');
    };
    const deletePerson = () => {
        axios.delete(config.personDeleteRoute, { params: { id: props.person._id } }).then(() => props.handlePersonChange());
    };

    return <Grid item xs={2} sm={4} md={5}>
        <Card>
            <h1>{`name: ${props.person.name}`}</h1>
            <h4>{`id: ${props.person._id}}`}</h4>
            <CreateDialog open={updateOpenDialog} setFunc={setUpdateDialogState} dialogLabel='Choose what to edit!' questionsArray={[
                { questionName: 'editName', questionText: 'new name' },
            ]} formHandler={formEditHandler} />
            <IconButton onClick={deletePerson}><Delete color='error'/></IconButton>
            <IconButton onClick={() => setUpdateDialogState(true)}><EditIcon /></IconButton>
            <TreeView>
                <TreeItem nodeId={`${props.person._id}:groupsList`} label='Groups He Part Of'>
                    {props.person.groupsHePartOf.map((groupId, index) => <p>{`group num:${index}, ${groupId}`}</p>)}
                </TreeItem>
            </TreeView>
        </Card>
    </Grid>;
};

export default PersonCard;
