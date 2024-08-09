package com.example.projectsb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private String email;
    private String name;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role roles;

    @ManyToOne
    private AdminDetails admin;
}
