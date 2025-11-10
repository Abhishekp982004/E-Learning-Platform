package com.example.DBMS.RepositoryLayer;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.DBMS.Instructor;

@Repository
public interface InstructorRepo extends JpaRepository<Instructor, Integer> {
    Optional<Instructor> findByEmail(String email);
}
