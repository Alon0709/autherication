/* eslint-disable no-undef */
import { Grid, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import axios, { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import PlushIcon from '@mui/icons-material/Add';
import config from '../config';
import PersonInterface from '../utilities/PersonInterface';
import CreateDialog, { formValueInterface } from './CreateDialog';
import PersonCard from './PersonCard';
import encodeDate from './urlencoderFunction';

const PeoplePage: FC = () => {
    const [peopleList, setPeople] = useState<PersonInterface[]>([]);
    const [createDialogState, setDialog] = useState(false);

    const getPeopleFromDataBase = () => {
        setPeople([]);
        axios.get(config.personGetAllRoute).then((response: AxiosResponse<PersonInterface[], any>) => {
            setPeople(response.data);
        });
    };

    const createPersonForm = (values: formValueInterface) => {
        setDialog(false);
        axios.post(config.personPostRoute, encodeDate({ name: values.personName }))
            .then((response: AxiosResponse<PersonInterface, any>) => setPeople([...peopleList, response.data]))
            .catch((err) => console.log(err.data));
    };

    useEffect(getPeopleFromDataBase, []);

    return <div className= "App">
        <CreateDialog open={createDialogState} setFunc={setDialog} dialogLabel="create a new Person!"
            questionsArray={[{ questionName: 'personName', questionText: 'Person name' }]} formHandler={createPersonForm} />
        <IconButton onClick={() => setDialog(true)}><PlushIcon color="success"/></IconButton>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {peopleList.map((person) => <Grid item xs={2} sm={4} md={4} key={person._id}><PersonCard person={person} handlePersonChange={getPeopleFromDataBase} /></Grid>)};
            </Grid>
        </Box>
    </div>;
};

export default PeoplePage;
