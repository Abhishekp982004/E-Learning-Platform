# E-Learning Platform

##  Project Overview

This project is a mini-project report for a Database Management System (DBMS) course at PES University, focusing on the design and development of a **web-based Learning Management System (LMS)**. The platform aims to provide a seamless, interactive, and structured environment for both students and instructors, supporting course delivery, user engagement, and progress tracking.

The system features user authentication, course management, student enrollment, interactive discussion forums, and quiz-based assessments, ensuring **role-based access** and **real-time data updates**.

##  Key Features

### Frontend Functionalities
* [cite_start]**User Authentication Page:** Allows secure registration and login for Students, Instructors, and Admins[cite: 648].
* [cite_start]**Dashboard Page:** Displays available courses, quizzes, and user-specific options post-login[cite: 650].
* **Course Viewing/Management:** Students can enroll and view course details; [cite_start]Instructors can create, view, and manage their courses[cite: 652].
* [cite_start]**Discussion Forum:** Users can post messages and reply to academic discussion threads[cite: 654].
* [cite_start]**Quiz System:** Students can attempt quizzes, and their scores and feedback are displayed instantly on the **Quiz Result Page**[cite: 656, 658].
* [cite_start]**Instructor Panel:** Instructors can create new courses and upload associated quizzes, questions, and options[cite: 660].

### Backend & Database Features
* [cite_start]**Efficient Data Storage:** Uses a relational MySQL database model to ensure secure authentication, efficient data storage, and reliable performance[cite: 27, 60].
* **Stored Procedures:** Includes procedures like `GetStudentsInCourse` and `GetUserQuizScores` for efficient data retrieval (See SQL section for details).
* **Database Functions:** Includes functions like `get_avg_score` and `get_user_course_count` for calculating metrics (See SQL section for details).
* **Database Triggers:** Implements triggers like `prevent_duplicate_enrollment`, `delete_options_with_question`, and `update_quiz_score_if_higher` to maintain data integrity and complex business logic (See SQL section for details).

##  Technology Stack

The platform utilizes a modern, layered architecture:

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React (with Vite)** | [cite_start]Building the client-side user interface with reusable components and fast rendering[cite: 27, 51]. |
| **Backend** | **Java (Spring Boot)** | [cite_start]Handling business logic, REST APIs, services, and data persistence[cite: 27, 49, 51]. |
| **Database** | **MySQL** | [cite_start]Storing structured relational data (users, courses, quizzes, etc.)[cite: 57, 59]. |
| **ORM** | **Hibernate / JPA** | [cite_start]Used for Object Relational Mapping to interact with MySQL via Java entities[cite: 51, 52]. |
| **Tools** | **Visual Studio Code, MySQL Workbench, Postman, GitHub, Maven** | [cite_start]Development environment, database management, API testing, version control, and dependency management[cite: 55]. |

## ER to Relational Mapping (Schema)

The database consists of the following key tables:

| Table Name | Primary Key | Key Attributes | Foreign Keys |
| :--- | :--- | :--- | :--- |
| `User` | `User_Id` | `fname`, `lname`, `email` (UNIQUE), `role`, `password` | None |
| `Instructor` | `Instructor_Id` | `Experience`, `Specialization` | None |
| `Course` | `Course_Id` | `title`, `description`, `Credit` | [cite_start]`Instructor_Id` (References `Instructor`) [cite: 183] |
| `Enrollment` | `Enrollment_Id` | `Grade` | [cite_start]`User_Id` (References `User`), `Course_Id` (References `Course`) [cite: 192, 193] |
| `Quizz` | `Quiz_Id` | `title`, `type`, `TotalMarks` | [cite_start]`Course_Id` (References `Course`) [cite: 212] |
| `Question` | `Question_Id` | `Question_Text`, `Marks` | [cite_start]`Quiz_Id` (References `Quizz`) [cite: 220] |
| `Options` | `Option_Id` | `option_text`, `IsCorrect` | [cite_start]`Question_Id` (References `Question`) [cite: 229] |
| `Result` | `Result_Id` | `Score`, `Feedback` | [cite_start]`User_Id` (References `User`), `Quiz_Id` (References `Quizz`) [cite: 238, 239] |
| `Discussion` | `Discussion_Id` | `Topic`, `Timestamp` | [cite_start]`User_Id` (References `User`), `Parent_Discussion_Id` (References `Discussion`), `Quiz_Id` (References `Quizz`) [cite: 202, 203, 201] |

## Getting Started

### Prerequisites

* Java Development Kit (JDK)
* Node.js and npm (or yarn)
* MySQL Server and MySQL Workbench
* Maven

### Database Setup

1.  **Create Database:** Execute the following commands in your MySQL environment:
    ```sql
    CREATE DATABASE Learning_platform;
    USE Learning_platform;
    ```
2.  **Run Schema and Data Script:** Execute the full content of the `DBMS_SQL_002_042.sql` file to create all tables and insert sample data. This script includes all DDL (Create) statements, DML (Insert) statements, Stored Procedures, Functions, and Triggers.

### Backend Setup (Spring Boot)

1.  Navigate to the backend project folder.
2.  Ensure your `application.properties` or `application.yml` file is correctly configured to connect to your `Learning_platform` MySQL database.
3.  Build and run the application using Maven:
    ```bash
    # To clean and package the application
    mvn clean package 
    # To run the application
    mvn spring-boot:run
    ```

### Frontend Setup (React/Vite)

1.  Navigate to the frontend project folder.
2.  Install dependencies:
    ```bash
    npm install
    # OR
    yarn install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    # OR
    yarn dev
    ```

The application should now be running on the configured ports (typically Frontend on `http://localhost:5173` and Backend on `http://localhost:8080`).

## Contributors

* [cite_start]**Abhishek P** (PES2UG23AM002) [cite: 11]
* [cite_start]**Harsha** (PES2UG23AM042) [cite: 11]

## Repository Link

* [cite_start]**GitHub Repository:** https://github.com/Abhishekp982004/E-Learning-Platform [cite: 679]
