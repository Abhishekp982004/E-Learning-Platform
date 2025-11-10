import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Brain, HelpCircle } from "lucide-react";
import { useUser } from "./UserContext";

const AddQuiz = () => {
  const { user } = useUser();

  const [quizTitle, setQuizTitle] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch courses for this instructor
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:8080/instructor/${user.id}`)
        .then((res) => res.json())
        .then((data) => setCourses(data))
        .catch(() => setCourses([]));
    }
  }, [user?.id]);

  const handleQuizTitleChange = (e) => setQuizTitle(e.target.value);
  const handleCourseChange = (e) => setSelectedCourse(e.target.value);

  const handleQuestionChange = (qIndex, e) => {
    const updated = [...questions];
    updated[qIndex].questionText = e.target.value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = e.target.value;
    setQuestions(updated);
  };

  const handleCorrectChange = (qIndex, e) => {
    const updated = [...questions];
    updated[qIndex].correctIndex = parseInt(e.target.value);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  const removeQuestion = (qIndex) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== qIndex));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !quizTitle) {
      alert("Please select a course and enter a quiz title.");
      return;
    }

    const quizData = {
      title: quizTitle,
      // eslint-disable-next-line no-unused-vars
      total_marks: questions.reduce((sum, q) => sum + 20, 0),
      course: { course_id: parseInt(selectedCourse) },
      questions: questions.map((q) => ({
        questionText: q.questionText,
        marks: 20,
        options: q.options.map((opt, index) => ({
          optionText: opt,
          correct: index === q.correctIndex,
        })),
      })),
    };

    try {
      const response = await fetch("http://localhost:8080/AddQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setQuizTitle("");
          setSelectedCourse("");
          setQuestions([{ questionText: "", options: ["", "", "", ""], correctIndex: 0 }]);
        }, 2000);
      } else {
        alert("Failed to create quiz");
      }
    } catch {
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 flex justify-center items-start py-16 px-6 font-sans">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-4 shadow-lg">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-3">
            Create New Quiz
          </h1>
          <p className="text-lg text-indigo-700">
            Build engaging quizzes to test your students' knowledge
          </p>
        </div>

        <div className="p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-2xl border border-indigo-100">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-16">
              <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                Quiz Created Successfully!
              </h3>
              <p className="text-gray-600">Your quiz has been saved</p>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="group">
                <label className="flex items-center gap-2 text-indigo-900 font-semibold mb-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  Select Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white text-lg cursor-pointer"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-indigo-900 font-semibold mb-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  Quiz Title
                </label>
                <input
                  type="text"
                  placeholder="Enter quiz title"
                  value={quizTitle}
                  onChange={handleQuizTitleChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white text-lg"
                  required
                />
              </div>

              <div className="flex flex-col gap-6 mt-4">
                {questions.map((question, qIndex) => (
                  <div
                    key={`q-${qIndex}`}
                    className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-100 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-xl text-indigo-900">
                        Question {qIndex + 1}
                      </h3>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Enter your question"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(qIndex, e)}
                      className="w-full p-4 mb-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white"
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {question.options.map((opt, oIndex) => (
                        <input
                          key={`q-${qIndex}-opt-${oIndex}`}
                          type="text"
                          placeholder={`Option ${oIndex + 1}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                          className="w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300 bg-white"
                          required
                        />
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="block text-indigo-900 font-semibold mb-2">
                        Correct Answer:
                      </label>
                      <select
                        value={question.correctIndex}
                        onChange={(e) => handleCorrectChange(qIndex, e)}
                        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300 bg-white cursor-pointer"
                      >
                        {question.options.map((_, oIndex) => (
                          <option key={`q-${qIndex}-opt-select-${oIndex}`} value={oIndex}>
                            Option {oIndex + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="w-full sm:w-auto bg-white text-indigo-600 border-2 border-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Question
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Save Quiz
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
