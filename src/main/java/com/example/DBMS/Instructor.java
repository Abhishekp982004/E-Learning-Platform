package com.example.DBMS;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "instructor")
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Instructor_Id")
    private int instructorId;

    @Column(name = "Fname")
    private String fname;

    @Column(name = "Lname")
    private String lname;

    @Column(name = "Email")
    private String email;

    @Column(name = "Password")
    private String password;
}
