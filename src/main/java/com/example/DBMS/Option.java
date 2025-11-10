package com.example.DBMS;
import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name="`options`")
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int optionId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private String optionText;
    private boolean isCorrect;
}
