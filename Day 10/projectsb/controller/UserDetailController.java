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
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
@RestController
@RequestMapping("/api/users")
public class UserDetailController {

    @Autowired
    private UserService userDetailService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    PasswordEncoder passwordEncoder;
    // @PostMapping("/authenticate")
    // public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
    //     System.out.println("Received authentication request: " + authRequest);
    //     try {
    //         Authentication authentication = authenticationManager.authenticate(
    //             new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
    //             );
    //         System.out.println("Received authentication request: " + authRequest);
    //         if (authentication.isAuthenticated()) {
    //             String token = jwtService.generateToken(authRequest.getUsername());
    //             return ResponseEntity.ok(token);
    //         } else {
    //             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    //         }
    //     } catch (Exception e) {
    //         System.out.println("Authentication failed: " + e.getMessage());
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
    //     }
    // }
    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
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
    @PostMapping("/login")
    public ResponseEntity<String> getUser(@RequestBody UserDetail user) {
        UserDetail u2=userDetailService.findbymail(user.getEmail());
        if(u2!=null&& passwordEncoder.matches(user.getPassword(),u2.getPassword())) 
        {
            return ResponseEntity.ok("User Authorized");
        }
        return ResponseEntity.status(404).build();
    }
}
