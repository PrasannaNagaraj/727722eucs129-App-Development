import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../assets/AdminSP.css';

const StaffPage = () => {
  const [users, setUsers] = useState([]);
  const adminId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/getByAdmin/${adminId}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [adminId]);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/deleteUser/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box className="staff-container">
      <TableContainer component={Paper}>
        <Table className="staff-table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    className="delete-button" 
                    onClick={() => deleteUser(user.id)}
                  >
                    DELETE USER
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffPage;
