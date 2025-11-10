package com.example.DBMS.RepositoryLayer;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.DBMS.Users;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    int countByRole(String role);
    static List<Users> findTop6ByOrderByCreatedAtDesc() {
        throw new UnsupportedOperationException("Unimplemented method 'findTop6ByOrderByCreatedAtDesc'");
    }
    Optional<Users> findByEmail(String email);
     @Query("SELECT u FROM Users u ORDER BY u.user_id DESC")
    List<Users> findTopUsers(PageRequest pageable);
}
