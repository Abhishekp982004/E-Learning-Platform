package com.example.DBMS;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name="question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionId;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;
    
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Option> options = new ArrayList<>();
    
    private String questionText;
    private int marks;
}
