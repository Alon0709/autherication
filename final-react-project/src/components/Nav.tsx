import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';

const Nav: FC = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <NavLink to="/">View Tasks</NavLink>
                <NavLink to="/createtask">Create/Edit Tasks</NavLink>
            </Toolbar>
        </AppBar>
    </Box>
);

export default Nav;
