package com.example.DBMS.RepositoryLayer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.DBMS.Enrollment;

@Repository
public interface EnrollmentRepo extends JpaRepository<Enrollment, Integer> {

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.course_id = :courseId")
    int countByCourseId(int courseId);

    @Query(value = "SELECT * FROM enrollment ORDER BY enrollment_id DESC LIMIT 6", nativeQuery = true)
    List<Enrollment> findTop6RecentEnrollments();

    @Query(value = "SELECT COUNT(*) FROM enrollment e WHERE MONTH(e.created_at) = :month AND YEAR(e.created_at) = :year", nativeQuery = true)
    int countByMonthAndYear(@Param("month") int month, @Param("year") int year);
    
    
}
