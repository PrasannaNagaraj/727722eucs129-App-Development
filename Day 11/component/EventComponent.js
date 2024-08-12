import React from 'react';
const EventComponent = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    {event.person && ` - ${event.person}`}
  </span>
);

export default EventComponent;