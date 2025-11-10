package com.example.DBMS.dto;

public class InstructorDashboardDTO {
    private Integer courseId;
    private String title;
    private Long students;
    private Long quizzes;
    private Double avgScore;

    public InstructorDashboardDTO(Integer courseId, String title, Long students, Long quizzes, Double avgScore) {
        this.courseId = courseId;
        this.title = title;
        this.students = students;
        this.quizzes = quizzes;
        this.avgScore = avgScore;
    }

    // getters and setters
    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Long getStudents() { return students; }
    public void setStudents(Long students) { this.students = students; }
    public Long getQuizzes() { return quizzes; }
    public void setQuizzes(Long quizzes) { this.quizzes = quizzes; }
    public Double getAvgScore() { return avgScore; }
    public void setAvgScore(Double avgScore) { this.avgScore = avgScore; }
}
