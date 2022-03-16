import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PeoplePage from './PeoplePage';
import GroupsPage from './GroupsPage';
import HomePage from './homePage';
import FourOFourPage from './404page';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';

const App: FC = () => {
    return <div className='App'>
        {() => Cookies.set('xd', 'your mom')}
        <Button onClick={() => console.log(Cookies.get('xd'))}><p>xd</p></Button>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/peoplepage' element={<PeoplePage />}/>
            <Route path='/groupspage' element={<GroupsPage />}/>
            <Route path='/404page' element={<FourOFourPage />}/>
            <Route path='*' element ={<Navigate replace={true} to='/404page'/>}/>
        </Routes>
    </div>
};

export default App;
