package com.example.projectsb.service;

import com.example.projectsb.model.AdminDetails;
import com.example.projectsb.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminDetailsRepository;

    public List<AdminDetails> getAllAdmins() {
        return adminDetailsRepository.findAll();
    }

    public Optional<AdminDetails> getAdminById(Integer id) {
        return adminDetailsRepository.findById(id);
    }

    public AdminDetails saveAdmin(AdminDetails adminDetails) {
        return adminDetailsRepository.save(adminDetails);
    }

    public void deleteAdmin(Integer id) {
        adminDetailsRepository.deleteById(id);
    }
}
