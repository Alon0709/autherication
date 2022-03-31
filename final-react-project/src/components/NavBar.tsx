import { FC, useState, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';

import loggedUserState from '../Atoms';
import userType from '../userInterface';

const MenuAppBar: FC = () => {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useRecoilState<userType>(loggedUserState);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} component={NavLink} to="/">
                            <Typography variant="h6" component="div">
                                Home Page
                            </Typography>
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} component={NavLink} to="/peoplepage">
                            <Typography variant="h6" component="div">
                                People
                            </Typography>
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} component={NavLink} to="/groupspage">
                            <Typography variant="h6" component="div">
                                Groups
                            </Typography>
                        </Button>
                    </Box>
                    { auth && (
                        <Box sx={ { display: { xs: 'none', md: 'flex' } } }>
                            <Typography variant="h6">
                                {`welcome ${auth.firstName} ${auth.lastName}`}
                            </Typography>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit">
                                <AccountCircle />

                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MenuAppBar;
