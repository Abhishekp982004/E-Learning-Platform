package com.example.DBMS.RepositoryLayer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.DBMS.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
    
}
