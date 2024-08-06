// import MenuIcon from '@mui/icons-material/Menu';
import { Box, Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../assets/Request.css'; 

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoggedInUser(user);
    };

    const fetchRequests = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get('http://localhost:3001/requests');
        setRequests(response.data.filter(request => request.person === user.name));
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchLoggedInUser();
    fetchRequests();
  }, []);

  const handleCancelRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/requests/${id}`);
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error cancelling request:', error);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px" boxShadow="0px 1px 2px rgba(0, 0, 0, 0.1)">
        <Typography variant="h4" className="req-requests-title">Requests</Typography>
        <div style={{ width: 48 }} /> 
      </Box>
      <Box padding="16px" display="flex" flexDirection="row" flexWrap="wrap" gap="16px">
        {requests.length === 0 ? (
          <Typography variant="body1">No requests found.</Typography>
        ) : (
          requests.map((request) => {
            const approvalStatus = request.approval || 'Pending';
            return (
              <Card
                key={request.id}
                variant="outlined"
                sx={{
                  width: '300px',
                  border: approvalStatus === 'Approved' ? '2px solid green' : 
                          approvalStatus === 'Denied' ? '2px solid red' : '2px solid gray'
                }}
                className={`request-card ${approvalStatus.toLowerCase()}`}
              >
                <CardContent>
                  <Typography variant="h6">Request Details</Typography>
                  <Typography variant="body2">Start Time: {new Date(request.start).toLocaleString()}</Typography>
                  <Typography variant="body2">End Time: {new Date(request.end).toLocaleString()}</Typography>
                  <Typography variant="body2">Reason: {request.reason}</Typography>
                  <Typography variant="body2">Type: {request.type}</Typography>
                  <Typography variant="body2" className={`status ${approvalStatus.toLowerCase()}`}>
                    Status: {approvalStatus}
                  </Typography>
                </CardContent>
                <CardActions>
                  {approvalStatus !== 'Approved' && approvalStatus !== 'Denied' && (
                    <Button size="small" color="secondary" onClick={() => handleCancelRequest(request.id)}>
                      Cancel Request
                    </Button>
                  )}
                </CardActions>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default RequestsPage;