import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import axios from 'axios';

import PeoplePage from './PeoplePage';
import GroupsPage from './GroupsPage';
import HomePage from './homePage';
import FourOFourPage from './404page';
import Config from '../config';
import MenuAppBar from './NavBar';
import { RecoilRoot } from 'recoil';

const App: FC = () => {
    const login = () => {
        window.location = 'http://localhost:1234/user/' as any;
    };

    useEffect(() => {
        
    },[]);

    return (
        <RecoilRoot>
            <div className="App">
                <MenuAppBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/peoplepage" element={<PeoplePage />} />
                    <Route path="/groupspage" element={<GroupsPage />} />
                    <Route path="/404page" element={<FourOFourPage />} />
                    <Route
                        path="*"
                        element={<Navigate replace={true} to="/404page" />}
                    />
                </Routes>
            </div>
        </RecoilRoot>
    );
};

export default App;
