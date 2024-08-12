import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Menu, User } from 'lucide-react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import '../assets/AdminHome.css';

const Admin = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [title, setTitle] = useState('Staff Schedule');
  const [userName, setUserName] = useState(''); // Added state for user name
  const location = useLocation();

  useEffect(() => {
    // Extract user information from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name); // Set user name
    }
  }, []);

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
    { text: 'Add User', icon: <PeopleIcon />, link: '/admin/add-user' },
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
      case '/admin/add-user':
        setTitle('Add Users');
        break;
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
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {userName} {/* Display the user's name */}
            </Typography>
            <Button
              sx={{
                backgroundColor: 'white',
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
