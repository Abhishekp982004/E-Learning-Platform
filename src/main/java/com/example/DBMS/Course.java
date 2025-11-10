package com.example.DBMS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Course_Id")
    private int course_id;

    private String title;
    private String description;

    @Column(name = "Credit")
    private int credit;

    @ManyToOne
    @JoinColumn(name = "Instructor_Id")
    private Instructor instructor;
}
