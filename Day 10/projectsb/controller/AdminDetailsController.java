package com.example.projectsb.controller;

import com.example.projectsb.model.AdminDetails;
import com.example.projectsb.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admins")
public class AdminDetailsController {

    @Autowired
    private AdminService adminDetailsService;

    @GetMapping
    public List<AdminDetails> getAllAdmins() {
        return adminDetailsService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminDetails> getAdminById(@PathVariable Integer id) {
        Optional<AdminDetails> adminDetails = adminDetailsService.getAdminById(id);
        return adminDetails.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<AdminDetails> createAdmin(@RequestBody AdminDetails adminDetails) {
        AdminDetails savedAdmin = adminDetailsService.saveAdmin(adminDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminDetails> updateAdmin(@PathVariable Integer id, @RequestBody AdminDetails adminDetails) {
        if (adminDetailsService.getAdminById(id).isPresent()) {
            adminDetails.setId(id);
            AdminDetails updatedAdmin = adminDetailsService.saveAdmin(adminDetails);
            return ResponseEntity.ok(updatedAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        if (adminDetailsService.getAdminById(id).isPresent()) {
            adminDetailsService.deleteAdmin(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
