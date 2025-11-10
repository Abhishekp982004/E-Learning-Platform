package com.example.DBMS;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Data
@Table(name="Quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quiz_id;
    private String title;
    private String type;
    private int total_marks;

    @ManyToOne
    @JoinColumn(name="course_id",nullable = false)
    private Course course;

    @OneToMany(mappedBy = "quiz",cascade = CascadeType.ALL)
    private List<Question> questions=new ArrayList<>();
}
