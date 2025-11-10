package com.example.DBMS.controllerLayer;
import org.springframework.jdbc.core.JdbcTemplate;
import com.example.DBMS.Course;
import com.example.DBMS.Enrollment;
import com.example.DBMS.Users;
import com.example.DBMS.RepositoryLayer.CourseRepository;
import com.example.DBMS.RepositoryLayer.EnrollmentRepo;
import com.example.DBMS.RepositoryLayer.UserRepo;
import com.example.DBMS.dto.InstructorDashboardDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class StatsController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepo enrollmentRepository;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StatsController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/stats")
    public Map<String, Integer> getStats() {
        int totalStudents = userRepo.countByRole("STUDENT");
        int totalInstructors = userRepo.countByRole("INSTRUCTOR");
        int totalCourses = (int) courseRepository.count();
        int totalEnrollments = (int) enrollmentRepository.count();

        Map<String, Integer> stats = new HashMap<>();
        stats.put("totalStudents", totalStudents);
        stats.put("totalInstructors", totalInstructors);
        stats.put("totalCourses", totalCourses);
        stats.put("totalEnrollments", totalEnrollments);

        return stats;
    }

//    @GetMapping("/students-per-course")
//    public List<Map<String, Object>> getStudentsPerCourse() {
//        List<Course> courses = courseRepository.findAll();
//        List<Map<String, Object>> result = new ArrayList<>();
//        String[] colors = {"#667eea", "#764ba2", "#f093fb", "#4facfe", "#43e97b"};
//        int colorIndex = 0;
//
//        for (Course course : courses) {
//            int studentCount = enrollmentRepository.countByCourseId(course.getCourse_id());
//            Map<String, Object> map = new HashMap<>();
//            map.put("name", course.getTitle());
//            map.put("students", studentCount);
//            map.put("color", colors[colorIndex % colors.length]);
//            colorIndex++;
//            result.add(map);
//        }
//
//        return result;
//    }

@GetMapping("/students-per-course")
public List<Map<String, Object>> getStudentsPerCourse() {
    List<Course> courses = courseRepository.findAll();
    List<Map<String, Object>> result = new ArrayList<>();
    String[] colors = {"#667eea", "#764ba2", "#f093fb", "#4facfe", "#43e97b"};
    int colorIndex = 0;

    for (Course course : courses) {
        // Call the stored procedure to get students for this course
        List<Map<String, Object>> students = jdbcTemplate.queryForList(
            "CALL GetStudentsInCourse(?)",
            course.getCourse_id()
        );

        Map<String, Object> map = new HashMap<>();
        map.put("name", course.getTitle());
        map.put("students", students.size());  // Count of students returned by procedure
        map.put("color", colors[colorIndex % colors.length]);
        colorIndex++;
        result.add(map);
    }

    return result;
}



    @GetMapping("/enrollment-trend")
    public List<Map<String, Object>> getEnrollmentTrend() {
        List<Map<String, Object>> trend = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (int i = 5; i >= 0; i--) {
            cal = Calendar.getInstance();
            cal.add(Calendar.MONTH, -i);
            int month = cal.get(Calendar.MONTH);
            int year = cal.get(Calendar.YEAR);

            int count = enrollmentRepository.countByMonthAndYear(month + 1, year);
            Map<String, Object> map = new HashMap<>();
            map.put("month", cal.getDisplayName(Calendar.MONTH, Calendar.SHORT, Locale.ENGLISH));
            map.put("enrollments", count);
            trend.add(map);
        }

        return trend;
    }

    @GetMapping("/recent-activities")
    public List<Map<String, Object>> getRecentActivities() {
        List<Enrollment> recentEnrollments = enrollmentRepository.findTop6RecentEnrollments();
        List<Users> recentUsers = userRepo.findTopUsers(PageRequest.of(0, 6));

        List<Map<String, Object>> activities = new ArrayList<>();
        int idCounter = 1;

        for (Enrollment e : recentEnrollments) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", idCounter++);
            map.put("type", "enrollment");
            map.put("student", e.getUser().getFname() + " " + e.getUser().getLname());
            map.put("course", e.getCourse().getTitle());
            map.put("time", "Just now");
            activities.add(map);
        }

        for (Users u : recentUsers) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", idCounter++);
            if (u.getRole().equalsIgnoreCase("STUDENT")) {
                map.put("type", "new_student");
                map.put("student", u.getFname() + " " + u.getLname());
            } else if (u.getRole().equalsIgnoreCase("INSTRUCTOR")) {
                map.put("type", "new_instructor");
                map.put("instructor", u.getFname() + " " + u.getLname());
            } else if (u.getRole().equalsIgnoreCase("ADMIN")) {
                map.put("type", "new_admin");
                map.put("admin", u.getFname() + " " + u.getLname());
            }
            map.put("time", "Just now");
            activities.add(map);
        }

        activities.sort((a, b) -> Integer.compare((Integer)b.get("id"), (Integer)a.get("id")));
        return activities;
    }

    @GetMapping("/api/instructor/{id}/dashboard")
    public List<InstructorDashboardDTO> getDashboard(@PathVariable("id") Integer instructorId) {
        return courseRepository.getInstructorDashboard(instructorId);
    }


}
