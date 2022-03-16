import { Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/HomePage.css';

const HomePage: FC = () => <header>
    <Grid justifyContent="center" alignItems="center" container={true}>
        <NavLink to="/peoplepage">
            <Button className="Button" href='/' variant='contained' >People</Button>
        </NavLink>
        <NavLink to="/groupspage">
            <Button className="Button" href='/' variant='contained'>Groups</Button>
        </NavLink>
    </Grid>
</header>;

export default HomePage;
