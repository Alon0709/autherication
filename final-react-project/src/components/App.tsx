import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import PeoplePage from './PeoplePage';
import GroupsPage from './GroupsPage';
import HomePage from './homePage';
import FourOFourPage from './404page';
import Config from '../config';

//https://www.youtube.com/watch?v=-RCnNyD0L-s
//https://www.youtube.com/watch?v=F-sFp_AvHc8
//https://www.youtube.com/watch?v=2so3hh8n-3w

const App: FC = () => {
    // const [cookies, setCookie, removeCookie] = useCookies(Config.cookiesInUse);
    // const logout = () => {
    //     Cookies.remove(Config.cookieName);
    // };

    // const login = ()

    return <div className='App'>
        {/* {() => Cookies.set('xd', 'your mom')} */}
        {/* <Button onClick={() => console.log(Cookies.get(Config.cookieName))}><p>xd</p></Button> */}
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
