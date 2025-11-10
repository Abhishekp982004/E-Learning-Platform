package com.example.DBMS;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "result")
@Data
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Result_Id;

    @ManyToOne
    @JoinColumn(name = "User_Id", referencedColumnName = "User_Id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "Quiz_Id")
    private Quiz quiz;

    private Integer Score;

    private String Feedback;
}
