import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Star from '@mui/icons-material/Star';
import Menu from '@mui/icons-material/Menu';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import People from '@mui/icons-material/People';
import Devices from '@mui/icons-material/Devices'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import HolidayVillage from '@mui/icons-material/HolidayVillage';
import Task from '@mui/icons-material/Task';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Notification from './Notification';
import Schedule from '@mui/icons-material/Schedule';

import { Link, useNavigate } from 'react-router-dom';

import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AuthServ from '../Auth';


function NavBar() {


  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Automatically remove notification after 10 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 10000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  const navigation = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    AuthServ.logout();
    navigation("/");
    window.location.reload();
  }

  const handleProfile = (event) => {
    event.preventDefault();

    navigation("/myinfo");
    window.location.reload();
  }

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Machine', icon: <Devices />, path: '/machine' },
    { text: 'Lecture', icon: <LibraryBooks />, path: '/lecture' },
    { text: 'Vocation', icon: <HolidayVillage />, path: '/vocation' },
    { text: 'Member', icon: <People />, path: '/user', visible: AuthServ.isAdmin() },
    { text: 'Task', icon: <Task />, path: '/task' },
    { text: 'My Information', icon: <AccountCircle />, path: '/Myinfo' },
    { text: 'Logout', icon: <Logout />, path: '#', onClick: handleLogout }
  ];




  return (
    // <AppBar position="fixed" color="success">
    //   <Container maxWidth="false">
    //     <Toolbar disableGutters>
    //       <Star fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, ml: 5, mr: 2 }} />
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component={Link}
    //         to="/"
    //         sx={{
    //           mr: 20,
    //           display: { xs: 'none', md: 'flex' },
    //           fontFamily: 'sans-serif',
    //           fontWeight: 500,
    //           color: 'secondary',
    //           textDecoration: 'none',
    //         }}
    //       >
    //         Machine & Lecture Manage
    //       </Typography>

    //       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //         <Link to="/machine" className='btn btn-primary mr-10'>
    //           <Devices sx={{ mr: 1 }} />
    //           Machine
    //         </Link>
    //         <Link to="/lecture" className='btn btn-primary mr-10'>
    //           <LibraryBooks sx={{ mr: 1 }} />
    //           Lecture
    //         </Link>
    //         <Link to="/vocation" className='btn btn-primary mr-10'>
    //           <HolidayVillage sx={{ mr: 1 }} />
    //           Vocation
    //         </Link>

    //         {AuthServ.isAdmin() && (
    //           <Link to="/user" className='btn btn-primary mr-10'>
    //             <People sx={{ mr: 1 }} />
    //             Member
    //           </Link>
    //         )}
    //       </Box>

    //       {/* Profile and Logout Section */}
    //       <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
    //         <Tooltip title="My Information" className="flex">
    //           <Link to="/Myinfo" className='btn btn-success flex items-center'>
    //             <AccountCircle fontSize="large" sx={{ mr: 2 }} onClick={handleProfile} />
    //             {AuthServ.getUserInfo().userid}
    //           </Link>
    //         </Tooltip>
    //         <Tooltip title="Logout">
    //           <Logout fontSize="large" sx={{ mr: 5, ml: 5 }} onClick={handleLogout} />
    //         </Tooltip>
    //       </Box>

    //       {/* Mobile Menu Icon */}
    //       <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
    //         {/* You can add a mobile menu icon here */}
    //         {/* For example, a hamburger menu icon that opens a drawer */}
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
    <div>
      <div className="notifications-container w-50 h-50 mt-50">
        {notifications.map(({ id, message, type }) => (
          <Notification key={id} message={message} type={type} onClose={() => removeNotification(id)} />
        ))}
        {/* Example buttons to trigger notifications */}

        {/* <button className='btn btn-primary' onClick={() => addNotification('Error occurred!', 'error')}>Show Error</button> */}
      </div>

      <AppBar position="fixed" color="success">
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <Star fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, mr: 2 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: { xs: 2, md: 10 }, // Adjust margin for different screen sizes
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'sans-serif',
                fontWeight: 500,
                color: 'secondary',
                textDecoration: 'none',
              }}
            >
              Management System
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
              <IconButton onClick={toggleDrawer(true)} color="inherit">
                <Menu />
              </IconButton>
            </Box>
            <Box className="xs:space-x-1 md:space-x-4" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-center' }}>
              <Link to="/machine" className='btn btn-primary'>
                <Devices sx={{ mr: 1 }} />
                Machine
              </Link>
              <Link to="/lecture" className='btn btn-primary'>
                <LibraryBooks sx={{ mr: 1 }} />
                Lecture
              </Link>
              <Link to="/vocation" className='btn btn-primary'>
                <HolidayVillage sx={{ mr: 1 }} />
                Vocation
              </Link>

              {AuthServ.isAdmin() && (
                <Link to="/user" className='btn btn-primary'>
                  <People sx={{ mr: 1 }} />
                  Member
                </Link>
              )}

              <Link to="/task" className='btn btn-primary'>
                <Task sx={{ mr: 1 }} />
                Task
              </Link>
            </Box>

            {/* Profile and Logout Section */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="View Schedule">
                <Schedule fontSize="large" sx={{ mr: 2 }} onClick={() => addNotification('Schedule', 'info')}></Schedule>
              </Tooltip>
              <Tooltip title="Birthday List">
                <NotificationsActive fontSize="large" sx={{ mr: 4, ml: 1 }} onClick={() => addNotification('Success!', 'success')}></NotificationsActive>
              </Tooltip>

              <Tooltip title="My Information">
                <Link to="/Myinfo" className='btn btn-success flex items-center'>
                  <AccountCircle fontSize="large" sx={{ mr: 2 }} onClick={handleProfile} />
                  {AuthServ.getUserInfo().userid}
                </Link>
              </Tooltip>

              <Tooltip title="Logout">
                <Logout fontSize="large" sx={{ mr: 2, ml: 1 }} onClick={handleLogout} />
              </Tooltip>
            </Box>

            {/* Drawer for Mobile Menu */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {menuItems.map((item) => (
                    item.visible !== false && (
                      <ListItem button key={item.text} component={Link} to={item.path} onClick={item.onClick}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    )
                  ))}
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default NavBar;