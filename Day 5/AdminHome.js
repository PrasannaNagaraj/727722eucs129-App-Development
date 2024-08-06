import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Menu, User } from 'lucide-react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import '../assets/AdminHome.css';

const Admin = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [title, setTitle] = useState('Staff Schedule');
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const sidebarItems = [
    { text: 'Dashboard', icon: <AssignmentIcon />, link: '/admin' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, link: '/admin/calendar' },
    { text: 'Staff', icon: <PeopleIcon />, link: '/admin/staff' },
    // { text: 'Settings', icon: <SettingsIcon />, link: '/admin/settings' },
    { text: 'Requests', icon: <AssignmentIcon />, link: '/admin/requests' },
  ];

  useEffect(() => {
    switch (location.pathname) {
      case '/admin':
        setTitle('Dashboard');
        break;
      case '/admin/calendar':
        setTitle('Calendar');
        break;
      case '/admin/staff':
        setTitle('Staff');
        break;
      // case '/admin/settings':
      //   setTitle('Settings');
      //   break;
      case '/admin/requests':
        setTitle('Requests');
        break;
      default:
        setTitle('Staff Schedule');
        break;
    }
  }, [location.pathname]);

  const sideList = () => (
    <Box
      className="adminhome-sidebar-content"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {sidebarItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.link} className="adminhome-sidebar-item">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="adminhome-app-container">
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginRight: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {title}
          </Typography>
          <div className="adminhome-ProfileContainer">
            <Button
              sx={{
                backgroundColor: 'white',
                marginLeft: 'auto',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={toggleProfileDropdown}
            >
              <User />
            </Button>
            {profileDropdownOpen && (
              <div className="adminhome-ProfileDropdown">
                <Link to="/Profile" className="adminhome-ProfileDropdownItem">Profile</Link>
                <Link to="/" className="adminhome-ProfileDropdownItem">Log Out</Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>

      <Box className="adminhome-content">
        <Outlet />
      </Box>
    </div>
  );
};

export default Admin;