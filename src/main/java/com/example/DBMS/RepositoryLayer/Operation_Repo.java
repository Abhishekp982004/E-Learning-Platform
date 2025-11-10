package com.example.DBMS.RepositoryLayer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.DBMS.Course;

@Repository
public interface Operation_Repo extends JpaRepository<Course, Integer> {

}
