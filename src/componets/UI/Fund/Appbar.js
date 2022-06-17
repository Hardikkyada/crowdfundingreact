import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {storage} from '../../../firebase';
import {getDownloadURL, ref} from 'firebase/storage';

import {SETTOKEN} from '../../../store/scllie/user';
// import Navbar from './Navbar';
import {Fragment} from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const ResponsiveAppBar = () => {
  const [state, setState] = useState(false);

  const user = useSelector(state => state.user.users);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [imgurl, setimgurl] = useState();

  let image;
  const getimage = async () => {
    try {
      image = await getDownloadURL(ref(storage, 'profile/' + user.ProfileImg));
      setimgurl(image);
    } catch (e) {
      console.log(user.ProfileImg, e);
    }
  };
  if (user) {
    getimage();
  }

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(SETTOKEN(''));
  };

  const handleOpenNavMenu = event => {
    setState(true);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    } else {
      setState(false);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
            <Typography
              variant="h6"
              noWrap
              onClick={() => navigate('/home')}
              sx={{
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
              LOGO
            </Typography>

            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}>
                <MenuItem onClick={() => navigate('/ViewOwnPost')}>
                  <Typography textAlign="center">ViewOwnPost</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              // href=""
              onClick={() => navigate('/home')}
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
              LOGO
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              <Button
                onClick={() => navigate('/ViewOwnPost')}
                sx={{my: 2, color: 'white', display: 'block'}}>
                ViewOwnPost
              </Button>
            </Box>

            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt="Remy Sharp" src={imgurl} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem onClick={() => navigate('/Profile')}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Fragment>
        <Drawer
          anchor="left"
          open={state}
          onClose={toggleDrawer('open', false)}>
          <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Fragment>
    </>
  );
};
export default ResponsiveAppBar;
