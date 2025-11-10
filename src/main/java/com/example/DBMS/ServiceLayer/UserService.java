package com.example.DBMS.ServiceLayer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.DBMS.Chat;
import com.example.DBMS.Course;
import com.example.DBMS.Enrollment;
import com.example.DBMS.Instructor;
import com.example.DBMS.Option;
import com.example.DBMS.Question;
import com.example.DBMS.Quiz;
import com.example.DBMS.Result;
import com.example.DBMS.Users;
import com.example.DBMS.RepositoryLayer.CourseRepository;
import com.example.DBMS.RepositoryLayer.DiscussionRepo;
import com.example.DBMS.RepositoryLayer.EnrollmentRepo;
import com.example.DBMS.RepositoryLayer.InstructorRepo;
import com.example.DBMS.RepositoryLayer.Operation_Repo;
import com.example.DBMS.RepositoryLayer.QuestionsRepo;
import com.example.DBMS.RepositoryLayer.QuizRepository;
import com.example.DBMS.RepositoryLayer.Resurtlepository;
import com.example.DBMS.RepositoryLayer.UserRepo;
import com.example.DBMS.dto.AuthDTO;
import com.example.DBMS.dto.DiscussionDTO;
import com.example.DBMS.dto.QuestionsDTO;
import com.example.DBMS.dto.QuizDTO;
import com.example.DBMS.dto.ResultDTO;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    @Autowired
    private Resurtlepository resurtlepository;
    @Autowired
    private CourseRepository courseRepository;
    private final UserRepo userRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final QuizRepository quizRepository;
    private final Operation_Repo operRepo;
    private final QuestionsRepo questionsRepo;
    
@Autowired
private InstructorRepo instructorRepo;

    public UserService(UserRepo userRepo,
                       EnrollmentRepo enrollmentRepo,
                       QuizRepository quizRepository,
                       Operation_Repo operRepo,
                       Resurtlepository resurtlepository,
                       QuestionsRepo questionsRepo) {
        this.userRepo = userRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.quizRepository = quizRepository;
        this.operRepo = operRepo;
        this.resurtlepository = resurtlepository;
        this.questionsRepo = questionsRepo;
    }

//

//public AuthDTO userLogin(Users users) throws Exception {
//    Optional<Users> existingUser = userRepo.findByEmail(users.getEmail());
//    Optional<Instructor> instructorOpt = instructorRepo.findByEmail(users.getEmail());
//
//    if (existingUser.isEmpty() && instructorOpt.isEmpty()) {
//        throw new Exception("User not found");
//    }
//
//    AuthDTO authDTO = new AuthDTO();
//
//    if (instructorOpt.isPresent()) {
//        Instructor instr = instructorOpt.get();
//        if (!instr.getPassword().equals(users.getPassword())) {
//            throw new Exception("Invalid password");
//        }
//
//        authDTO.setUser_id(instr.getInstructorId());
//        authDTO.setEmail(instr.getEmail());
//        authDTO.setRole("instructor");
//    } else {
//        Users dbUser = existingUser.get();
//        if (!dbUser.getPassword().equals(users.getPassword())) {
//            throw new Exception("Invalid password");
//        }
//
//        authDTO.setUser_id(dbUser.getUser_id());
//        authDTO.setEmail(dbUser.getEmail());
//        authDTO.setRole(dbUser.getRole());
//    }
//
//    return authDTO;
//}
public AuthDTO userLogin(Users users) throws Exception {
    Optional<Users> existingUser = userRepo.findByEmail(users.getEmail());
    Optional<Instructor> instructorOpt = instructorRepo.findByEmail(users.getEmail());

    if (existingUser.isEmpty() && instructorOpt.isEmpty()) {
        throw new Exception("User not found");
    }

    AuthDTO authDTO = new AuthDTO();

    if (instructorOpt.isPresent()) {
        Instructor instr = instructorOpt.get();
        if (!instr.getPassword().equals(users.getPassword())) {
            throw new Exception("Invalid password");
        }
        authDTO.setUser_id(instr.getInstructorId());
        authDTO.setEmail(instr.getEmail());
        authDTO.setRole("instructor");
    } else {
        Users dbUser = existingUser.get();
        if (!dbUser.getPassword().equals(users.getPassword())) {
            throw new Exception("Invalid password");
        }
        authDTO.setUser_id(dbUser.getUser_id());
        authDTO.setEmail(dbUser.getEmail());
        authDTO.setRole(dbUser.getRole());
    }

    try (Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/learning_platform", "root", "harsha@123")) {
        PreparedStatement stmt = conn.prepareStatement(
            "SELECT User FROM mysql.user WHERE User = ?");
        stmt.setString(1, authDTO.getRole() + "_user");
        ResultSet rs = stmt.executeQuery();
        if (!rs.next()) {
            throw new Exception("Database user for role not found");
        }
    } catch (SQLException e) {
        throw new Exception("Error verifying DB user privileges: " + e.getMessage());
    }

    return authDTO;
}


    @Transactional
    public void registerUser(Users users) {
    if ("admin".equals(users.getRole()) || "student".equals(users.getRole())) {
        userRepo.save(users);
    } else {
        Instructor instr = new Instructor();
        instr.setFname(users.getFname()); 
        instr.setLname(users.getLname()); 
        instr.setEmail(users.getEmail());
        instr.setPassword(users.getPassword());
        instructorRepo.save(instr);
    }
}


    public void addCourse(Course course) {
        operRepo.save(course);
    }

 @Transactional
public Quiz addQuiz(Quiz quiz) {
    Course course = courseRepository.findById(quiz.getCourse().getCourse_id())
            .orElseThrow(() -> new RuntimeException("Course not found"));
    quiz.setCourse(course);

    for (Question question : quiz.getQuestions()) {
        question.setQuiz(quiz);

        for (Option option : question.getOptions()) {
            option.setQuestion(question);
            // manually convert incoming 0/1 or true/false from frontend
            option.setCorrect(Boolean.TRUE.equals(option.isCorrect()));
        }
    }

    return quizRepository.save(quiz);
}


    @Transactional
    public void enroll(String email, int courseId) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = operRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        enrollmentRepo.save(enrollment);
    }

    public List<ResultDTO> getQuizResultsByEmail(String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return resurtlepository.findQuizResultsByUserId(user.getUser_id());
    }

    public List<QuestionsDTO> getQuestionsByQuizId(int quizId) {
        List<Question> questions = questionsRepo.findByQuizIdWithOptions(quizId);

        return questions.stream().map(q -> {
            List<String> optionTexts = q.getOptions().stream()
                                        .map(Option::getOptionText)
                                        .collect(Collectors.toList());

            String correct = q.getOptions().stream()
                              .filter(Option::isCorrect)
                              .map(Option::getOptionText)
                              .findFirst()
                              .orElse("");

            return new QuestionsDTO(q.getQuestionText(), optionTexts, correct);
        }).collect(Collectors.toList());
    }


    public List<QuizDTO> getAllQuizzes() {
    return quizRepository.findAll()
            .stream()
            .map(q -> new QuizDTO(q.getQuiz_id(), q.getTitle(), q.getTotal_marks()))
            .collect(Collectors.toList());
    }


    public void saveResult(ResultDTO resultDTO) {
        Users user = userRepo.findById(resultDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = quizRepository.findById(resultDTO.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(resultDTO.getScore());
        result.setFeedback(resultDTO.getFeedback());

        resurtlepository.save(result);
    }


    @Autowired
    private DiscussionRepo discussionRepo;

public List<DiscussionDTO> get_chat(Integer quiz_id) {
    List<Chat> chats = discussionRepo.findByQuizId(quiz_id);
    return chats.stream()
        .map(c -> new DiscussionDTO(
            c.getId(),
            c.getTopic(),
            c.getUser().getUser_id(),
            c.getParentDiscussion() != null ? c.getParentDiscussion().getId() : null,
            c.getQuizId()
        )
        )
        .collect(Collectors.toList());
}
public void reply(@RequestBody DiscussionDTO discussionDTO) {
    Chat chat = new Chat();
    chat.setTopic(discussionDTO.getTopic());

    Users user = userRepo.findById(discussionDTO.getUser_id())
            .orElseThrow(() -> {
                return new RuntimeException("User not found");
            });

    Chat parent = null;
    if (discussionDTO.getParent_Discussion_Id() != null) {
        parent = discussionRepo.findById(discussionDTO.getParent_Discussion_Id())
                .orElseThrow(() -> {
                    return new RuntimeException("Parent discussion not found");
                });
    }

    chat.setUser(user);
    chat.setParentDiscussion(parent);
    chat.setQuizId(discussionDTO.getQuiz_id());

    discussionRepo.save(chat);
}

public void deleteCourse(Integer id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course not found");
        }
        courseRepository.deleteById(id);
    }


    public  void deleteInstructor(Integer id) {
        if (!instructorRepo.existsById(id)) {
            throw new RuntimeException("Instructor not found");
        }
        instructorRepo.deleteById(id);
    }

    public String calculateGrade(double avgScore) {
        if (avgScore >= 90) return "A";
        if (avgScore >= 80) return "B";
        if (avgScore >= 70) return "C";
        if (avgScore >= 60) return "D";
        return "F";
    }

}
