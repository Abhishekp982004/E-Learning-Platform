package com.example.DBMS.RepositoryLayer;

import com.example.DBMS.dto.ResultDTO;
import com.example.DBMS.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface Resurtlepository extends JpaRepository<Result, Integer> {

    @Query("SELECT new com.example.DBMS.dto.ResultDTO(" +
       "r.user.id, " +
       "r.quiz.quiz_id, " +
       "r.Score, " +
       "r.Feedback) " +
       "FROM Result r " +
       "WHERE r.user.id = :userId")
List<ResultDTO> findQuizResultsByUserId(@Param("userId") Integer userId);

}
