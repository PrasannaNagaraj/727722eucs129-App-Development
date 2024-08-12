import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/UserSignUp.css';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('User'); // Default role for new users
  const adminId = JSON.parse(localStorage.getItem('user'))?.id; // Retrieve admin ID from local storage

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const endpoint = 'http://localhost:8080/api/users/save';

    axios.post(endpoint, {
      email,
      name,
      password,
      role,
      admin: { id: adminId }, // Include admin ID in the payload
    })
    .then(response => {
      toast.success('User added successfully!');
    })
    .catch(error => {
      console.error('Error adding user:', error);
      toast.error('Failed to add user!');
    });
  };

  return (
    <Box className="user-signup-container">
      <Paper className="user-signup-form">
        <Typography variant="h4" component="h2" gutterBottom>
          Add New User
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create User
          </Button>
        </form>
      </Paper>
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};

export default UserSignUp;
