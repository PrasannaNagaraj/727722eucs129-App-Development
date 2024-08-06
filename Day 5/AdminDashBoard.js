import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import '../assets/AdminDashBoard.css';

const AdminDashboard = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const postNotice = async () => {
    if (!newNotice.trim()) return;

    setPosting(true);

    try {
      await axios.post('http://localhost:3001/notices', { message: newNotice });
      setNewNotice('');
      fetchNotices();
      handleCloseModal();
    } catch (error) {
      console.error('Error posting notice:', error);
    } finally {
      setPosting(false);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDeleteClick = (id) => {
    setSelectedNoticeId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const deleteNotice = async () => {
    try {
      await axios.delete(`http://localhost:3001/notices/${selectedNoticeId}`);
      setSelectedNoticeId(null);
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Box className="admindb-dashboard-container">
      <Box className="admindb-dashboard-notice-board">
        <Typography className="admindb-dashboard-notice-board-header">Notice Board</Typography>
        {notices.map((notice) => (
          <Box 
            key={notice.id} 
            className="admindb-dashboard-notice"
            onClick={() => handleDeleteClick(notice.id)}
          >
            <Typography variant="body1">{notice.message}</Typography>
          </Box>
        ))}
        <Button
          className="admindb-post-notice-button"
          onClick={handleOpenModal}
        >
          Post a Notice
        </Button>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="post-notice-modal-title"
        aria-describedby="post-notice-modal-description"
      >
        <Box className="admindb-modal-container">
          <Typography id="post-notice-modal-title" variant="h6" className="admindb-modal-header">
            Post a New Notice
          </Typography>
          <TextField
            id="post-notice-modal-description"
            variant="outlined"
            label="Notice"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            multiline
            rows={4}
            fullWidth
            className="admindb-modal-input"
          />
          <Box className="admindb-modal-actions">
            <Button
              onClick={postNotice}
              variant="contained"
              color="primary"
              disabled={posting}
              className="admindb-modal-button"
            >
              {posting ? 'Posting...' : 'Post Notice'}
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="secondary"
              className="admindb-modal-button"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-notice-dialog-title"
        aria-describedby="delete-notice-dialog-description"
      >
        <DialogTitle id="delete-notice-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-notice-dialog-description">
            Are you sure you want to delete this notice? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteNotice} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;