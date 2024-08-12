import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import '../assets/Calendar.css';
import EventComponent from './EventComponent'; 
const localizer = momentLocalizer(moment);
const CalendarPage1 = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [requestType, setRequestType] = useState('');
  const [reason, setReason] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user')); 
  const userName = loggedInUser ? loggedInUser.name : '';

  const navigate = useNavigate(); 

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/events');
      const events = response.data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const handleRaiseRequest = (type) => {
    setRequestType(type);
    setShowEventDetailsModal(false);
    setShowReasonModal(true);
  };

  const handleSubmitRequest = async () => {
    try {
      const requestData = {
        title: selectedEvent.title,
        start: selectedEvent.start,
        end: selectedEvent.end,
        person: userName,
        type: requestType,
        reason,
      };
      await axios.post('http://localhost:3001/requests', requestData);
      setShowReasonModal(false);
      setReason('');
      navigate('/user/requests'); 
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const filteredEvents = events.filter(event => event.person === userName);

  return (
    <div className="cal-calendar-page">
      <Box className="cal-calendar-container">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          defaultView="week"
          views={['week', 'day']}
          step={150}
          timeslots={1}
          onSelectEvent={handleSelectEvent} 
          className="cal-calendar"
          components={{
            event: EventComponent,
          }}
          eventPropGetter={(event) => ({
            className: 'cal-calendar-event',
          })}
        />
      </Box>

      {selectedEvent && (
        <Modal
          open={showEventDetailsModal}
          onClose={() => setShowEventDetailsModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showEventDetailsModal}>
            <Box className="cal-modal-content" sx={{ width: '500px' }}> 
              <Typography variant="h6" component="h2" className="cal-modal-title">
                Event Details
              </Typography>
              <Typography variant="body1" className="cal-modal-text">
                <strong>Title:</strong> {selectedEvent.title}
              </Typography>
              <Typography variant="body1" className="cal-modal-text">
                <strong>Start:</strong> {moment(selectedEvent.start).format('YYYY-MM-DD HH:mm')}
              </Typography>
              <Typography variant="body1" className="cal-modal-text">
                <strong>End:</strong> {moment(selectedEvent.end).format('YYYY-MM-DD HH:mm')}
              </Typography>
              <Typography variant="body1" className="cal-modal-text">
                <strong>Person:</strong> {selectedEvent.person}
              </Typography>
              <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
                <Button variant="contained" color="primary" onClick={() => handleRaiseRequest('Time Off')} className="cal-modal-button">
                  Request Time Off
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleRaiseRequest('Shift Change')} className="cal-modal-button">
                  Request Shift Change
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setShowEventDetailsModal(false)} className="cal-modal-button">
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}

      <Modal
        open={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showReasonModal}>
          <Box className="cal-modal-content" sx={{ width: '500px' }}>
            <Typography variant="h6" component="h2" className="cal-modal-title">
              Provide Reason
            </Typography>
            <TextField
              label="Reason"
              fullWidth
              margin="normal"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              multiline
              rows={4}
              className="cal-modal-input"
            />
            <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
              <Button variant="contained" color="secondary" onClick={() => setShowReasonModal(false)} className="cal-modal-button">
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmitRequest} className="cal-modal-button">
                Submit Request
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CalendarPage1;