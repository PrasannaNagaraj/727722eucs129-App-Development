import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Modal, Backdrop, Fade, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import '../assets/Calendar.css';
import EventComponent from './EventComponent';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: moment().toDate(),
    end: moment().toDate(),
    person: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setShowAddEventModal(true);
  };

  const handleEventChange = (key, value) => {
    setNewEvent({ ...newEvent, [key]: value });
  };

  const handleSaveEvent = async () => {
    try {
      const response = await axios.post('http://localhost:3001/events', newEvent);
      setEvents([...events, {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      }]);
      setShowAddEventModal(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:3001/events/${selectedEvent.id}`);
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowEventDetailsModal(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="cal-calendar-page">
      <Box className="cal-calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="week"
          views={['week', 'day']}
          step={150}
          timeslots={1}
          selectable
          onSelectSlot={handleSelectSlot}
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

      <Modal
        open={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showAddEventModal}>
          <Box className="cal-modal-content">
            <Typography variant="h6" component="h2" className="cal-modal-title">
              Add New Event
            </Typography>
            <TextField
              label="Event Title"
              fullWidth
              margin="normal"
              value={newEvent.title}
              onChange={(e) => handleEventChange('title', e.target.value)}
              className="cal-modal-input"
            />
            <TextField
              label="Start Time"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => handleEventChange('start', moment(e.target.value).toDate())}
              className="cal-modal-input"
            />
            <TextField
              label="End Time"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => handleEventChange('end', moment(e.target.value).toDate())}
              className="cal-modal-input"
            />
            <FormControl fullWidth margin="normal" className="cal-modal-input">
              <InputLabel>Person Assigned</InputLabel>
              <Select
                value={newEvent.person}
                onChange={(e) => handleEventChange('person', e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="secondary" onClick={() => setShowAddEventModal(false)} className="cal-modal-button">
                Close
              </Button>
              <Button variant="contained" color="primary" onClick={handleSaveEvent} className="cal-modal-button">
                Save Event
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

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
            <Box className="cal-modal-content">
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
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="secondary" onClick={handleDeleteEvent} className="cal-modal-button">
                  Delete Event
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setShowEventDetailsModal(false)} className="cal-modal-button">
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;