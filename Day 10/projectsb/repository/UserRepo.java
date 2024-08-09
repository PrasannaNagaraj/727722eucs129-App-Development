package com.example.projectsb.repository;

import com.example.projectsb.model.UserDetail;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserDetail, Integer> {
    UserDetail findByEmail(String email);
    Optional<UserDetail> findByName(String username);
}
