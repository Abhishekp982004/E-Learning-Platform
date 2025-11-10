import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "./UserContext";

const Quiz_Page = () => {
  const { quizId } = useParams();
  const { user } = useUser();
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/questions?quizId=${quizId}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log(err));
  }, [quizId]);

  const handleOptionSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    setScore(correct);

    const percentage = (correct / questions.length) * 100;
    if (percentage >= 90) setFeedback("Excellent work!");
    else if (percentage >= 70) setFeedback("Good job!");
    else if (percentage >= 50) setFeedback("You can do better.");
    else setFeedback("Needs improvement.");

    fetch("http://localhost:8080/submitResult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        quizId: parseInt(quizId),
        score: correct,
        feedback:
          percentage >= 90
            ? "Excellent work!"
            : percentage >= 70
            ? "Good job!"
            : percentage >= 50
            ? "You can do better."
            : "Needs improvement."
      }),
    }).catch((err) => console.log(err));
  };

  if (!questions) return <div>Loading...</div>;

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
        <h2 className="text-2xl font-semibold text-indigo-700 bg-white p-6 rounded-xl shadow-lg">
          No questions uploaded for this quiz yet.
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
          Quiz
        </h2>

        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-indigo-800 mb-3">
              {index + 1}. {q.question}
            </h3>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`block p-3 rounded-lg cursor-pointer border ${
                    answers[index] === opt
                      ? "bg-indigo-100 border-indigo-500"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={() => handleOptionSelect(index, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Submit Quiz
          </button>
        </div>

        {score !== null && (
          <div className="text-center mt-6 text-xl font-semibold text-indigo-800">
            Your Score: {score} / {questions.length} <br />
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz_Page;
