package com.example.projectsb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.projectsb.model.Request;

@Repository
public interface RequestRepo extends JpaRepository<Request,Integer>{
    
}