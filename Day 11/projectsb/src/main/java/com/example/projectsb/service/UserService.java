package com.example.projectsb.service;

import com.example.projectsb.model.UserDetail;
import com.example.projectsb.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userDetailRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<UserDetail> getAllUsers() {
        return userDetailRepository.findAll();
    }

    public Optional<UserDetail> getUserById(Integer id) {
        return userDetailRepository.findById(id);
    }

    public UserDetail saveUser(UserDetail userDetail) {
        userDetail.setPassword(passwordEncoder.encode(userDetail.getPassword()));
        return userDetailRepository.save(userDetail);
    }

    public void deleteUser(Integer id) {
        userDetailRepository.deleteById(id);
    }
    public UserDetail findByEmail(String email)
    {
        return userDetailRepository.findByEmail(email);
    }

    public List<UserDetail> findUsersByAdminId(@PathVariable Integer adminId) {
        return userDetailRepository.findUsersByAdminId(adminId);
    }
}
