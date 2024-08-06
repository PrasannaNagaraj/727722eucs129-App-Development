import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import '../assets/UserDashBoard.css'; 

const UserDashboard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/notices');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  return (
    <Box className="userdb-dashboard-container">
      <Box className="userdb-dashboard-notice-board">
        {notices.map((notice) => (
          <Box key={notice.id} className="userdb-dashboard-notice">
            <Typography variant="body1">{notice.message}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserDashboard;