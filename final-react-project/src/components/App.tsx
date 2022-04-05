import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import Cookies from 'js-cookie';

import PeoplePage from './PeoplePage';
import GroupsPage from './GroupsPage';
import HomePage from './homePage';
import FourOFourPage from './404page';
import Config from '../config';
import MenuAppBar from './NavBar';
import loggedUserState from '../Atoms';
import userType from '../userInterface';

const App: FC = () => {
    const [, setUser] = useRecoilState<userType>(loggedUserState);

    const login = () => {
        window.location = Config.logginRoute as any;
    };

    useEffect(() => {
        if (!Cookies.get(Config.cookieUserName)) login();
        axios.get(Config.getUserObject, { withCredentials: true }).then((res) => {
            console.log(res.data);
            setUser(res.data);
        }).catch((err) => console.log(err));
    }, []);

    return (
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
    );
};

export default App;
