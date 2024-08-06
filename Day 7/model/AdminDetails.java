package com.example.projectsb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDetails{
    @Id
    private Integer  Id;
    private String email;
    private String name;
    private String password;
    private String Role;
}
