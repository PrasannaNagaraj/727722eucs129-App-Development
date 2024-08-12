package com.example.projectsb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.projectsb.model.Notice;

@Repository
public interface NoticeRepo extends JpaRepository<Notice,Integer>{
    
}