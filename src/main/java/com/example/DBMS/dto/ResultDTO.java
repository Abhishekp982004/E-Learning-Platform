package com.example.DBMS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultDTO {
    private Integer userId;
    private Integer quizId;
    private Integer score;
    private String feedback;
}
