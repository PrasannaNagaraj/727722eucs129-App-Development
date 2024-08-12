package com.example.projectsb.controller;

import com.example.projectsb.dto.AuthRequest;
import com.example.projectsb.model.UserDetail;
import com.example.projectsb.service.JwtService;
import com.example.projectsb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserDetailController {

    @Autowired
    private UserService userDetailService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getEmail());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
    @GetMapping("/getall/get")
    public List<UserDetail> getAllUsers() {
        return userDetailService.getAllUsers();
    }

    @GetMapping("/getuserbyid/{id}")
    public ResponseEntity<UserDetail> getUserById(@PathVariable Integer id) {
        Optional<UserDetail> userDetail = userDetailService.getUserById(id);
        return userDetail.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/save")
    public ResponseEntity<UserDetail> createUser(@RequestBody UserDetail userDetail) {
        UserDetail savedUser = userDetailService.saveUser(userDetail);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }


    @PutMapping("/UpdateUser/{id}")
    public ResponseEntity<UserDetail> updateUser(@PathVariable Integer id, @RequestBody UserDetail userDetail) {
        if (userDetailService.getUserById(id).isPresent()) {
            userDetail.setId(id);
            UserDetail updatedUser = userDetailService.saveUser(userDetail);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        if (userDetailService.getUserById(id).isPresent()) {
            userDetailService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<UserDetail> getUserByEmail(@PathVariable String email) {
        UserDetail user = userDetailService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/getByAdmin/{adminId}")
    public ResponseEntity<List<UserDetail>> getUsersByAdminId(@PathVariable Integer adminId) {
        List<UserDetail> users = userDetailService.findUsersByAdminId(adminId);
        if (users != null && !users.isEmpty()) {
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
