package com.example.DBMS.RepositoryLayer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.DBMS.Course;
import com.example.DBMS.dto.InstructorDashboardDTO;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Query("SELECT new com.example.DBMS.dto.InstructorDashboardDTO(" +
           "c.course_id, c.title, COUNT(DISTINCT e.user), COUNT(DISTINCT q), COALESCE(AVG(r.Score), 0)) " +
           "FROM Course c " +
           "LEFT JOIN Enrollment e ON e.course = c " +
           "LEFT JOIN Quiz q ON q.course = c " +
           "LEFT JOIN Result r ON r.quiz = q " +
           "WHERE c.instructor.id = :instructorId " +
           "GROUP BY c.course_id, c.title")
    List<InstructorDashboardDTO> getInstructorDashboard(@Param("instructorId") Integer instructorId);

    @Query("SELECT c FROM Course c WHERE c.instructor.instructorId = :instructorId")
List<Course> findByInstructorId(@Param("instructorId") Integer instructorId);
}
