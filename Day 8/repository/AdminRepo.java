package com.example.projectsb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.projectsb.model.AdminDetails;

@Repository
public interface AdminRepo extends JpaRepository<AdminDetails,Integer>{
    
}