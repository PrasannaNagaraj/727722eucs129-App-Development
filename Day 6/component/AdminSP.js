import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Divider } from '@mui/material';
import '../assets/AdminSP.css';

const StaffPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box className="staff-container">
      {users.map((user) => (
        <Paper key={user.id} className="staff-card">
          <Typography variant="h6" component="div" gutterBottom>
            {user.name}
          </Typography>
          <Divider />
          <Typography variant="body2">
            ID: {user.id}
          </Typography>
          <Typography variant="body2">
            Email: {user.email}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default StaffPage;