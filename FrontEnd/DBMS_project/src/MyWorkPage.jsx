import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const MyWorkPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/quizes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAttendQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleDiscussion = (quizId) => {
    navigate(`/discussion/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
          Available Quizzes
        </h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.quiz_id}
              className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div onClick={() => handleAttendQuiz(quiz.quiz_id)} className="cursor-pointer">
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  {quiz.title}
                </h3>
                <p className="text-indigo-600 font-medium">
                  Total Marks: {quiz.total_Marks}
                </p>
              </div>

              <button
                onClick={() => handleDiscussion(quiz.quiz_id)}
                className="absolute bottom-3 right-3 text-indigo-600 hover:text-indigo-800"
              >
                <MessageCircle size={22} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWorkPage;
