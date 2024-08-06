package com.example.projectsb.model;
import com.google.appengine.repackaged.org.joda.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Request{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer  Id;
    private String Title;
    private LocalDateTime StartTime;
    private LocalDateTime endTime;
    private String Type;
    private String Reason;
    private String Approval;
    @OneToOne
    private UserDetail person;
    
}