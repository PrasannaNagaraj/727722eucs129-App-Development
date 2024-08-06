import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import '../assets/AdminReq.css'; 

const AdminRequestPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3001/requests/${id}`, { approval: status });
      setRequests(requests.map(request => 
        request.id === id ? { ...request, approval: status } : request
      ));
    } catch (error) {
      console.error('Error updating request approval:', error);
    }
  };

  return (
    <Box className="requests-page" padding="16px">
      <Typography variant="h4" className="requests-title">Requests Page</Typography>
      <Box display="flex" flexDirection="column" gap="16px">
        {requests.map((request) => (
          <Paper 
            key={request.id}
            elevation={3}
            sx={{
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: request.approval === 'Approved' ? '#e0f7e0' : 
                                request.approval === 'Denied' ? '#fbe0e0' : '#ffffff',
              border: request.approval === 'Approved' ? '2px solid green' :
                      request.approval === 'Denied' ? '2px solid red' : '2px solid gray'
            }}
          >
            <Typography variant="h6">Request Details</Typography>
            <Typography variant="body2"><strong>Start Time:</strong> {new Date(request.start).toLocaleString()}</Typography>
            <Typography variant="body2"><strong>End Time:</strong> {new Date(request.end).toLocaleString()}</Typography>
            <Typography variant="body2"><strong>Person:</strong> {request.person}</Typography>
            <Typography variant="body2"><strong>Reason:</strong> {request.reason}</Typography>
            <Typography variant="body2"><strong>Type:</strong> {request.type}</Typography>
            <Box display="flex" gap="8px" marginTop="8px">
              {request.approval === 'Approved' ? (
                <Typography color="green"><strong>Status:</strong> Approved</Typography>
              ) : request.approval === 'Denied' ? (
                <Typography color="red"><strong>Status:</strong> Denied</Typography>
              ) : (
                <>
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => handleApproval(request.id, 'Approved')}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleApproval(request.id, 'Denied')}
                  >
                    Deny
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default AdminRequestPage;
