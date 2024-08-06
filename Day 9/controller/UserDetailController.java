package com.example.projectsb.controller;

import com.example.projectsb.model.UserDetail;
import com.example.projectsb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserDetailController {

    @Autowired
    private UserService userDetailService;

    @GetMapping
    public List<UserDetail> getAllUsers() {
        return userDetailService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetail> getUserById(@PathVariable Integer id) {
        Optional<UserDetail> userDetail = userDetailService.getUserById(id);
        return userDetail.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<UserDetail> createUser(@RequestBody UserDetail userDetail) {
        UserDetail savedUser = userDetailService.saveUser(userDetail);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDetail> updateUser(@PathVariable Integer id, @RequestBody UserDetail userDetail) {
        if (userDetailService.getUserById(id).isPresent()) {
            userDetail.setId(id);
            UserDetail updatedUser = userDetailService.saveUser(userDetail);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        if (userDetailService.getUserById(id).isPresent()) {
            userDetailService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
