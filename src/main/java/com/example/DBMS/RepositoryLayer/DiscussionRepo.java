package com.example.DBMS.RepositoryLayer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.DBMS.Chat;

@Repository
public interface DiscussionRepo extends JpaRepository<Chat, Integer> {
    List<Chat> findByQuizId(Integer quiz_id);
}
