import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./HomePage";
import AddCourse from "./AddCourse";
import Quiz_Page from "./Quiz_Page";
import QuizAdd from "./AddQuiz";
import EnrollmentPage from "./EnrollmentPage";
import LoginSignup from "./LoginSignup";
import ResultsPage from "./ResultsPage";
import MyWorkPage from "./MyWorkPage"
import DiscussionPage from "./DiscussionPage";
import AdminDashboard from "./Dashboard";
import InstructorDashboard from "./StatPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup/>} />
        <Route path="/MyWorkPage" element={<MyWorkPage/>} />
        <Route path="/results" element={<ResultsPage/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/AddCourse" element={<AddCourse/>} />
        <Route path="/AddQuiz" element={<QuizAdd/>} />
        <Route path="/quiz/:quizId" element={<Quiz_Page/>} />
        <Route path="/Enroll" element={<EnrollmentPage/>} />
        <Route path="/discussion/:quizId" element={<DiscussionPage />} />
        <Route path="/teach-dash/:id" element={<InstructorDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
