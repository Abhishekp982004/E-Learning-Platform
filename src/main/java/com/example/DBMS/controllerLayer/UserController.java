//package com.example.DBMS.controllerLayer;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import com.example.DBMS.Quiz;
//import com.example.DBMS.ServiceLayer.UserService;
//import com.example.DBMS.dto.DiscussionDTO;
//import com.example.DBMS.dto.QuestionsDTO;
//import com.example.DBMS.dto.QuizDTO;
//import com.example.DBMS.dto.ResultDTO;
//
//@RestController
//public class UserController {
//
//    @Autowired 
//    private UserService userService;
//
//    
//    @PostMapping("/AddQuiz")
//    private void AddQuiz(@RequestBody Quiz quiz){
//        userService.addQuiz(quiz);
//    }
//
//    @PostMapping("/Enroll") 
//    public void enrollUser(@RequestBody Map<String, Object> request) {
//        String email = (String) request.get("email");
//        int courseId = (Integer) request.get("course_id");
//        System.out.println(email);
//        System.out.println(courseId);
//
//    userService.enroll(email, courseId);
//}
//
//    @GetMapping("/results")
//    public ResponseEntity<List<ResultDTO>> getQuizResultsByEmail(@RequestParam String email) {
//        try {
//            List<ResultDTO> results = userService.getQuizResultsByEmail(email);
//            return ResponseEntity.ok(results);
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//    
//
//    @GetMapping("/questions")
//    public ResponseEntity<List<QuestionsDTO>> getQuestionsByQuiz(@RequestParam int quizId) {
//    try {
//        List<QuestionsDTO> questions = userService.getQuestionsByQuizId(quizId);
//        return ResponseEntity.ok(questions);
//    } catch (RuntimeException e) {
//        return ResponseEntity.notFound().build();
//    }
//}
//   
//    @GetMapping("/quizes")
//    public List<QuizDTO> getAllQuizzes() {
//        return userService.getAllQuizzes();
//    }
//    
//    @PostMapping("/submitResult")
//    public ResponseEntity<String> submitResult(@RequestBody ResultDTO resultDTO) {
//        try {
//            userService.saveResult(resultDTO);
//            return ResponseEntity.ok("Result submitted successfully");
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body("Failed to submit result");
//        }
//    }
//
//    @PostMapping("/reply")
//    public void reply(@RequestBody DiscussionDTO discussionDTO){
//        userService.reply(discussionDTO);
//    }
//
//    @GetMapping("/discussion/{quizId}")
//    public List<DiscussionDTO> get_chat(@PathVariable Integer quizId) {
//        return userService.get_chat(quizId);
//    }
//
//    @DeleteMapping("/instructors/delete/{id}")
//    public ResponseEntity<String> deleteInstructor(@PathVariable Integer id) {
//        userService.deleteInstructor(id);
//        return ResponseEntity.ok("Instructor deleted successfully");
//    }
//
//}



package com.example.DBMS.controllerLayer;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DBMS.Quiz;
import com.example.DBMS.Users;
import com.example.DBMS.RepositoryLayer.UserRepo;
import com.example.DBMS.ServiceLayer.UserService;
import com.example.DBMS.dto.DiscussionDTO;
import com.example.DBMS.dto.QuestionsDTO;
import com.example.DBMS.dto.QuizDTO;
import com.example.DBMS.dto.ResultDTO;

@RestController
public class UserController {

    @Autowired 
    private UserService userService;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/AddQuiz")
    private void AddQuiz(@RequestBody Quiz quiz){
        userService.addQuiz(quiz);
    }

    @PostMapping("/Enroll") 
    public void enrollUser(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        int courseId = (Integer) request.get("course_id");
        System.out.println(email);
        System.out.println(courseId);

        userService.enroll(email, courseId);
    }

    //@GetMapping("/results")
    //public ResponseEntity<List<ResultDTO>> getQuizResultsByEmail(@RequestParam String email) {
    //    try {
    //        List<ResultDTO> results = userService.getQuizResultsByEmail(email);
    //        return ResponseEntity.ok(results);
    //    } catch (RuntimeException e) {
    //        return ResponseEntity.notFound().build();
    //    }
    //}
 @GetMapping("/results")
public ResponseEntity<List<Map<String, Object>>> getQuizResultsByEmail(@RequestParam String email) {
    try {
        // Get user ID from email
        Integer userId = jdbcTemplate.queryForObject(
            "SELECT User_Id FROM user WHERE Email = ?",
            new Object[]{email},
            Integer.class
        );

        // Call stored procedure
        List<Map<String, Object>> results = jdbcTemplate.queryForList(
            "CALL GetUserQuizScores(?)",
            userId
        );

        return ResponseEntity.ok(results);
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}



    @GetMapping("/questions")
    public ResponseEntity<List<QuestionsDTO>> getQuestionsByQuiz(@RequestParam int quizId) {
        try {
            List<QuestionsDTO> questions = userService.getQuestionsByQuizId(quizId);
            return ResponseEntity.ok(questions);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/quizes")
    public List<QuizDTO> getAllQuizzes() {
        return userService.getAllQuizzes();
    }

    @PostMapping("/submitResult")
    public ResponseEntity<String> submitResult(@RequestBody ResultDTO resultDTO) {
        try {
            userService.saveResult(resultDTO);
            return ResponseEntity.ok("Result submitted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to submit result");
        }
    }

    @PostMapping("/reply")
    public void reply(@RequestBody DiscussionDTO discussionDTO){
        userService.reply(discussionDTO);
    }

    @GetMapping("/discussion/{quizId}")
    public List<DiscussionDTO> get_chat(@PathVariable Integer quizId) {
        return userService.get_chat(quizId);
    }

    @DeleteMapping("/instructors/delete/{id}")
    public ResponseEntity<String> deleteInstructor(@PathVariable Integer id) {
        userService.deleteInstructor(id);
        return ResponseEntity.ok("Instructor deleted successfully");
    }

    // ===== NEW ENDPOINT FOR MYSQL FUNCTIONS =====
   @GetMapping("/student/stats/{userId}/{courseId}")
public ResponseEntity<Map<String, Object>> getStudentStats(
        @PathVariable int userId,
        @PathVariable int courseId) {

    Map<String, Object> response = new HashMap<>();

    // Call get_avg_score
    BigDecimal avgScore = jdbcTemplate.queryForObject(
            "SELECT get_avg_score(?, ?)", 
            new Object[]{userId, courseId}, 
            BigDecimal.class
    );

    // Call get_user_course_count
    Integer courseCount = jdbcTemplate.queryForObject(
            "SELECT get_user_course_count(?)", 
            new Object[]{userId}, 
            Integer.class
    );

    // Calculate grade
    String grade;
    if (avgScore == null) {
        grade = "N/A";
    } else if (avgScore.doubleValue() >= 50) {
        grade = "A";
    } else if (avgScore.doubleValue() >= 40) {
        grade = "B";
    }
    else{
        grade="C";
    }

    response.put("avgScore", avgScore);
    response.put("courseCount", courseCount);
    response.put("grade", grade);

    return ResponseEntity.ok(response);
}

}
