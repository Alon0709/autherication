import React, { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import axios from 'axios';

import PeoplePage from './PeoplePage';
import GroupsPage from './GroupsPage';
import HomePage from './homePage';
import FourOFourPage from './404page';
import Config from '../config';

//https://www.youtube.com/watch?v=-RCnNyD0L-s
//https://www.youtube.com/watch?v=F-sFp_AvHc8
//https://www.youtube.com/watch?v=2so3hh8n-3w

const App: FC = () => {
    const login = () => {
        window.location = 'http://localhost:1234/user/' as any;
    };

    const test = () => {
        axios.get('http://localhost:1234/test', { withCredentials: true }).then((res) => {
            console.log(res.data);
        });
    };

    return <div className='App'>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                Photos
                </Typography>
            </Toolbar>
        </AppBar>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/peoplepage' element={<PeoplePage />}/>
            <Route path='/groupspage' element={<GroupsPage />}/>
            <Route path='/404page' element={<FourOFourPage />}/>
            <Route path='*' element ={<Navigate replace={true} to='/404page'/>}/>
        </Routes>
    </div>;
};

export default App;
