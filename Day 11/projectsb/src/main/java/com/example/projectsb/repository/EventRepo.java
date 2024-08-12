package com.example.projectsb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.projectsb.model.Events;

@Repository
public interface EventRepo extends JpaRepository<Events,Integer>{
    
}