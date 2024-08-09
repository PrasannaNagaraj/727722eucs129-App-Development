package com.example.projectsb.service;

import com.example.projectsb.model.Events;
import com.example.projectsb.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventsService {

    @Autowired
    private EventRepo eventsRepository;

    public List<Events> getAllEvents() {
        return eventsRepository.findAll();
    }

    public Optional<Events> getEventById(Integer id) {
        return eventsRepository.findById(id);
    }

    public Events saveEvent(Events events) {
        return eventsRepository.save(events);
    }

    public void deleteEvent(Integer id) {
        eventsRepository.deleteById(id);
    }
}
