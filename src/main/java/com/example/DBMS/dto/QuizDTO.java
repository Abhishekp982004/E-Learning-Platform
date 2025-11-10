package com.example.DBMS.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizDTO {
    private int quiz_id;
    private String title;
    private int Total_Marks;
}
