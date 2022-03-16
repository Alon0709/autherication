import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PeoplePage from './PeoplePage';
import GroupsPage from './GroupsPage';
import HomePage from './homePage';
import FourOFourPage from './404page';

const App: FC = () => (
    <div className='App'>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/peoplepage' element={<PeoplePage />}/>
            <Route path='/groupspage' element={<GroupsPage />}/>
            <Route path='/404page' element={<FourOFourPage />}/>
            <Route path='*' element ={<Navigate replace={true} to='/404page'/>}/>
        </Routes>
    </div>
);

export default App;
