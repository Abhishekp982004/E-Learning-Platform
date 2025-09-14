CREATE DATABASE Learning_platform;
USE Learning_platform;

CREATE TABLE User (
    User_Id INT PRIMARY KEY AUTO_INCREMENT,
    Fname VARCHAR(50),
    Lname VARCHAR(50),
    Email VARCHAR(100) UNIQUE
);

CREATE TABLE Phone (
    Phone_Id INT PRIMARY KEY AUTO_INCREMENT,
    User_Id INT,
    Phone VARCHAR(15),
    FOREIGN KEY (User_Id) REFERENCES User(User_Id)
);

CREATE TABLE Instructor (
    Instructor_Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Experience INT,
    Specialization VARCHAR(100),
    Timestamp DATE
);

CREATE TABLE Course (
    Course_Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100),
    Description VARCHAR(200),
    Credit INT,
    Instructor_Id INT,
    FOREIGN KEY (Instructor_Id) REFERENCES Instructor(Instructor_Id)
);

CREATE TABLE Enrollment (
    Enrollment_Id INT PRIMARY KEY AUTO_INCREMENT,
    User_Id INT,
    Course_Id INT,
    Grade VARCHAR(2),
    FOREIGN KEY (User_Id) REFERENCES User(User_Id),
    FOREIGN KEY (Course_Id) REFERENCES Course(Course_Id)
);

CREATE TABLE Quiz (
    Quiz_Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100),
    Type VARCHAR(50),
    Total_Marks INT,
    Course_Id INT,
    FOREIGN KEY (Course_Id) REFERENCES Course(Course_Id)
);

CREATE TABLE Result (
    Result_Id INT PRIMARY KEY AUTO_INCREMENT,
    User_Id INT,
    Quiz_Id INT,
    Score INT,
    Feedback VARCHAR(200),
    FOREIGN KEY (User_Id) REFERENCES User(User_Id),
    FOREIGN KEY (Quiz_Id) REFERENCES Quiz(Quiz_Id)
);

CREATE TABLE Discussion (
    Discussion_Id INT PRIMARY KEY AUTO_INCREMENT,
    Topic VARCHAR(200),
    User_Id INT,
    Parent_Discussion_Id INT NULL,  
    FOREIGN KEY (User_Id) REFERENCES User(User_Id),
    FOREIGN KEY (Parent_Discussion_Id) REFERENCES Discussion(Discussion_Id)
);

CREATE TABLE Question (
    Question_Id INT PRIMARY KEY AUTO_INCREMENT,
    Quiz_Id INT,
    Question_Text VARCHAR(500),
    Marks INT,
    FOREIGN KEY (Quiz_Id) REFERENCES Quiz(Quiz_Id)
);

CREATE TABLE OptionTable (
    Option_Id INT PRIMARY KEY AUTO_INCREMENT,
    Question_Id INT,
    Option_Text VARCHAR(200),
    Is_Correct BOOLEAN,
    FOREIGN KEY (Question_Id) REFERENCES Question(Question_Id)
);

INSERT INTO User (Fname, Lname, Email) VALUES
('Rahul', 'Sharma', 'rahul@gmail.com'),
('Priya', 'Kumar', 'priya@gmail.com'),
('Arjun', 'Mehta', 'arjun@gmail.com'),
('Sneha', 'Patil', 'sneha@gmail.com');

INSERT INTO Phone (User_Id, Phone) VALUES
(1, '9876543210'),
(2, '9876501234'),
(3, '9123456789'),
(4, '9988776655'),
(1, '9123456000'),   
(4, '9112233445');  

INSERT INTO Instructor (Name, Experience, Specialization, Timestamp) VALUES
('Dr. Verma', 10, 'Machine Learning', '2022-01-10'),
('Dr. Singh', 7, 'Databases', '2022-02-15'),
('Dr. Rao', 12, 'Networking', '2022-03-20'),
('Dr. Kapoor', 5, 'Cyber Security', '2022-04-25');

INSERT INTO Course (Title, Description, Credit, Instructor_Id) VALUES
('ML Basics', 'Intro to Machine Learning', 4, 1),
('DBMS', 'Database Management System', 3, 2),
('Networking', 'Computer Networks course', 4, 3),
('CyberSec', 'Cyber Security Fundamentals', 3, 4);

INSERT INTO Enrollment (User_Id, Course_Id, Grade) VALUES
(1, 1, 'A'),
(2, 2, 'B'),
(3, 3, 'A'),
(4, 4, 'C');

INSERT INTO Quiz (Title, Type, Total_Marks, Course_Id) VALUES
('ML Quiz 1', 'MCQ', 50, 1),
('DBMS Quiz', 'Written', 40, 2),
('Networks Quiz', 'MCQ', 30, 3),
('CyberSec Quiz', 'MCQ', 50, 4);

INSERT INTO Result (User_Id, Quiz_Id, Score, Feedback) VALUES
(1, 1, 45, 'Excellent'),
(2, 2, 30, 'Good'),
(3, 3, 25, 'Average'),
(4, 4, 40, 'Very Good');

INSERT INTO Discussion (Topic, User_Id, Parent_Discussion_Id) VALUES
('ML doubts on regression', 1, NULL),
('Normalization in DBMS', 2, NULL),
('IP addressing issues', 3, NULL),
('Firewalls and Security', 4, NULL);

INSERT INTO Discussion (Topic, User_Id, Parent_Discussion_Id)
VALUES ('ML doubts on regression', 1, NULL);

INSERT INTO Discussion (Topic, User_Id, Parent_Discussion_Id)
VALUES ('Can you clarify which regression type?', 2, 1);

INSERT INTO Discussion (Topic, User_Id, Parent_Discussion_Id)
VALUES ('Linear regression specifically', 1, 2);

INSERT INTO Question (Quiz_Id, Question_Text, Marks) VALUES
(1, 'What is supervised learning?', 5),
(1, 'Which algorithm is used for classification?', 5);

INSERT INTO OptionTable (Question_Id, Option_Text, Is_Correct) VALUES
(1, 'Learning with labeled data', TRUE),
(1, 'Learning without labels', FALSE),
(1, 'Unsupervised clustering', FALSE);

INSERT INTO OptionTable (Question_Id, Option_Text, Is_Correct) VALUES
(2, 'K-means', FALSE),
(2, 'Naive Bayes', TRUE),
(2, 'Apriori', FALSE);
 



