//import { BookOpen, Brain, Clock, Users, TrendingUp, ChevronDown } from "lucide-react";
//import { useNavigate } from "react-router-dom";
//import { useUser } from "./UserContext";
//import { useState, useEffect } from "react";
//
//const HomePage = () => {
//  const navigate = useNavigate();
//  const { user, selectedCourse, setSelectedCourse, selectedInstructor, setSelectedInstructor } = useUser();
//  const [hoveredButton, setHoveredButton] = useState(null);
//  const [courses, setCourses] = useState([]);
//  const [instructors, setInstructors] = useState([]);
//  const [showRemoveCourse, setShowRemoveCourse] = useState(false);
//  const [showRemoveInstructor, setShowRemoveInstructor] = useState(false);
//
//  useEffect(() => {
//    const fetchData = async () => {
//      const coursesRes = await fetch("http://localhost:8080/courses");
//      const instructorsRes = await fetch("http://localhost:8080/instructor/all");
//      setCourses(await coursesRes.json());
//      setInstructors(await instructorsRes.json());
//    };
//    fetchData();
//  }, []);
//
//  const handleNavigation = (button) => {
//    navigate(button.route, { state: 
//      user
//     });
//  };
//
//  const handleRemoveCourse = async () => {
//    if (!selectedCourse) return;
//    await fetch(`http://localhost:8080/courses/delete/${parseInt(selectedCourse)}`, { method: "DELETE" });
//    setCourses(courses.filter(c => c.course_id !== parseInt(selectedCourse)));
//    setSelectedCourse("");
//    setShowRemoveCourse(false);
//  };
//
//  const handleRemoveInstructor = async () => {
//    if (!selectedInstructor) return;
//    await fetch(`http://localhost:8080/instructors/delete/${parseInt(selectedInstructor)}`, { method: "DELETE" });
//    setInstructors(instructors.filter(i => i.instructorId !== parseInt(selectedInstructor)));
//    setSelectedInstructor("");
//    setShowRemoveInstructor(false);
//  };
//
//  const adminButtons = [
//    { text: "Add Course", primary: true, route: "/AddCourse" },
//    { text: "Manage Users", primary: false, route: "/dashboard" }
//  ];
//
//  const teacherButtons = [
//    { text: "DashBoard", primary: true, route: `/teach-dash/${user.id}` },
//    { text: "AddQuiz", primary: false, route: "/AddQuiz" }
//  ];
//
//  const studentButtons = [
//    { text: "Enroll", primary: true, route: "/Enroll" },
//    { text: "Attend Quiz", primary: false, route: "/MyWorkPage" },
//    { text: "Results", primary: false, route: "/results" }
//  ];
//
//  const renderButtons = (buttonsArray) => (
//    <div className="flex flex-wrap gap-4 justify-center mb-8">
//      {buttonsArray.map((button, index) => (
//        <button
//          key={index}
//          className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform ${
//            hoveredButton === index ? "scale-105 shadow-2xl" : "shadow-lg"
//          } ${
//            button.primary
//              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600"
//              : "bg-white/10 text-white border-2 border-cyan-400/40 hover:bg-white/20 backdrop-blur-sm"
//          }`}
//          onMouseEnter={() => setHoveredButton(index)}
//          onMouseLeave={() => setHoveredButton(null)}
//          onClick={() => handleNavigation(button)}
//        >
//          {button.text}
//        </button>
//      ))}
//    </div>
//  );
//
//  return (
//    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-sans relative overflow-x-hidden overflow-y-auto scrollbar-hide">
//      {/* Remove the style jsx tag and use regular CSS classes */}
//      <style>{`
//        .scrollbar-hide::-webkit-scrollbar {
//          display: none;
//        }
//        .scrollbar-hide {
//          -ms-overflow-style: none;
//          scrollbar-width: none;
//        }
//      `}</style>
//      
//      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
//      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
//      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
//
//      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-20 text-center">
//        <div className="max-w-4xl w-full">
//          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
//            Welcome {user.name}!
//          </h1>
//          <p className="text-xl md:text-2xl text-cyan-200 mb-12 font-light">
//            Learn, Quiz, and Enroll in courses to boost your skills!
//          </p>
//          
//          {user.role === "admin" && (
//            <>
//              {renderButtons(adminButtons)}
//              <div className="flex flex-wrap gap-4 justify-center pb-8">
//                <div className="relative">
//                  <button
//                    className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform shadow-lg bg-white/10 text-white border-2 border-cyan-400/40 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2 ${
//                      showRemoveCourse ? "scale-105 shadow-2xl" : ""
//                    }`}
//                    onClick={() => {
//                      setShowRemoveCourse(!showRemoveCourse);
//                      setShowRemoveInstructor(false);
//                    }}
//                  >
//                    Remove Course
//                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showRemoveCourse ? "rotate-180" : ""}`} />
//                  </button>
//                  {showRemoveCourse && (
//                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl border-2 border-cyan-400/40 z-20 w-80">
//                      <select
//                        className="w-full px-4 py-2 rounded-lg text-black bg-white border border-gray-300 mb-3"
//                        value={selectedCourse}
//                        onChange={(e) => setSelectedCourse(e.target.value)}
//                      >
//                        <option value="">Select Course</option>
//                        {courses.map(c => (
//                          <option key={c.course_id} value={c.course_id}>{c.title}</option>
//                        ))}
//                      </select>
//                      <button
//                        className="w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                        onClick={handleRemoveCourse}
//                        disabled={!selectedCourse}
//                      >
//                        Confirm Remove
//                      </button>
//                    </div>
//                  )}
//                </div>
//
//                <div className="relative">
//                  <button
//                    className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform shadow-lg bg-white/10 text-white border-2 border-cyan-400/40 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2 ${
//                      showRemoveInstructor ? "scale-105 shadow-2xl" : ""
//                    }`}
//                    onClick={() => {
//                      setShowRemoveInstructor(!showRemoveInstructor);
//                      setShowRemoveCourse(false);
//                    }}
//                  >
//                    Remove Instructor
//                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showRemoveInstructor ? "rotate-180" : ""}`} />
//                  </button>
//                  {showRemoveInstructor && (
//                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl border-2 border-cyan-400/40 z-20 w-80">
//                      <select
//                        className="w-full px-4 py-2 rounded-lg text-black bg-white border border-gray-300 mb-3"
//                        value={selectedInstructor}
//                        onChange={(e) => setSelectedInstructor(e.target.value)}
//                      >
//                        <option value="">Select Instructor</option>
//                        {instructors.map(i => (
//                          <option key={i.instructorId} value={i.instructorId}>{i.fname + " " + i.lname}</option>
//                        ))}
//                      </select>
//                      <button
//                        className="w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                        onClick={handleRemoveInstructor}
//                        disabled={!selectedInstructor}
//                      >
//                        Confirm Remove
//                      </button>
//                    </div>
//                  )}
//                </div>
//              </div>
//            </>
//          )}
//          
//          {user.role === "instructor" && renderButtons(teacherButtons)}
//          {user.role === "student" && renderButtons(studentButtons)}
//        </div>
//      </div>
//    </div>
//  );
//};
//
//export default HomePage;

import { BookOpen, Brain, Clock, Users, TrendingUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { useState, useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, selectedCourse, setSelectedCourse, selectedInstructor, setSelectedInstructor } = useUser();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [showRemoveCourse, setShowRemoveCourse] = useState(false);
  const [showRemoveInstructor, setShowRemoveInstructor] = useState(false);
  const [studentStats, setStudentStats] = useState({ courseCount: 0, grade: "N/A" });

  useEffect(() => {
    const fetchData = async () => {
      const coursesRes = await fetch("http://localhost:8080/courses");
      const instructorsRes = await fetch("http://localhost:8080/instructor/all");
      setCourses(await coursesRes.json());
      setInstructors(await instructorsRes.json());

      if (user.role === "student") {
        try {
          const statsRes = await fetch(`http://localhost:8080/student/stats/${user.id}/16`);
          if (statsRes.ok) {
            const data = await statsRes.json();
            setStudentStats({
              courseCount: data.courseCount ?? 0,
              grade: data.grade ?? "N/A"
            });
          }
        } catch (err) {
          console.error("Error fetching student stats:", err);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleNavigation = (button) => {
    navigate(button.route, { state: user });
  };

  const handleRemoveCourse = async () => {
    if (!selectedCourse) return;
    await fetch(`http://localhost:8080/courses/delete/${parseInt(selectedCourse)}`, { method: "DELETE" });
    setCourses(courses.filter(c => c.course_id !== parseInt(selectedCourse)));
    setSelectedCourse("");
    setShowRemoveCourse(false);
  };

  const handleRemoveInstructor = async () => {
    if (!selectedInstructor) return;
    await fetch(`http://localhost:8080/instructors/delete/${parseInt(selectedInstructor)}`, { method: "DELETE" });
    setInstructors(instructors.filter(i => i.instructorId !== parseInt(selectedInstructor)));
    setSelectedInstructor("");
    setShowRemoveInstructor(false);
  };

  const adminButtons = [
    { text: "Add Course", primary: true, route: "/AddCourse" },
    { text: "Manage Users", primary: false, route: "/dashboard" }
  ];

  const teacherButtons = [
    { text: "DashBoard", primary: true, route: `/teach-dash/${user.id}` },
    { text: "AddQuiz", primary: false, route: "/AddQuiz" }
  ];

  const studentButtons = [
    { text: "Enroll", primary: true, route: "/Enroll" },
    { text: "Attend Quiz", primary: false, route: "/MyWorkPage" },
    { text: "Results", primary: false, route: "/results" }
  ];

  const renderButtons = (buttonsArray) => (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {buttonsArray.map((button, index) => (
        <button
          key={index}
          className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform ${
            hoveredButton === index ? "scale-105 shadow-2xl" : "shadow-lg"
          } ${
            button.primary
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600"
              : "bg-white/10 text-white border-2 border-cyan-400/40 hover:bg-white/20 backdrop-blur-sm"
          }`}
          onMouseEnter={() => setHoveredButton(index)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => handleNavigation(button)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-sans relative overflow-x-hidden overflow-y-auto scrollbar-hide">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-20 text-center">
        <div className="max-w-4xl w-full">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
            Welcome {user.name}!
          </h1>
          <p className="text-xl md:text-2xl text-cyan-200 mb-12 font-light">
            Learn, Quiz, and Enroll in courses to boost your skills!
          </p>

          {/* Student Stats */}
          {user.role === "student" && (
            <div className="flex gap-8 justify-center mb-12">
              <div className="flex flex-col items-center bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-sm w-40">
                <BookOpen className="w-12 h-12 text-cyan-400 mb-2" />
                <span className="text-white font-semibold text-xl">{studentStats.courseCount}</span>
                <span className="text-cyan-200 text-sm">Total Courses</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-sm w-40">
                <Brain className="w-12 h-12 text-pink-400 mb-2" />
                <span className="text-white font-semibold text-xl">{studentStats.grade}</span>
                <span className="text-cyan-200 text-sm">Grade</span>
              </div>
            </div>
          )}

          {user.role === "admin" && renderButtons(adminButtons)}
          {user.role === "instructor" && renderButtons(teacherButtons)}
          {user.role === "student" && renderButtons(studentButtons)}

          {/* Remove course/instructor (admin) */}
          {user.role === "admin" && (
            <div className="flex flex-wrap gap-4 justify-center pb-8">
              {/* Remove Course */}
              <div className="relative">
                <button
                  className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform shadow-lg bg-white/10 text-white border-2 border-cyan-400/40 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2 ${
                    showRemoveCourse ? "scale-105 shadow-2xl" : ""
                  }`}
                  onClick={() => {
                    setShowRemoveCourse(!showRemoveCourse);
                    setShowRemoveInstructor(false);
                  }}
                >
                  Remove Course
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showRemoveCourse ? "rotate-180" : ""}`} />
                </button>
                {showRemoveCourse && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl border-2 border-cyan-400/40 z-20 w-80">
                    <select
                      className="w-full px-4 py-2 rounded-lg text-black bg-white border border-gray-300 mb-3"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {courses.map(c => (
                        <option key={c.course_id} value={c.course_id}>{c.title}</option>
                      ))}
                    </select>
                    <button
                      className="w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleRemoveCourse}
                      disabled={!selectedCourse}
                    >
                      Confirm Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Remove Instructor */}
              <div className="relative">
                <button
                  className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform shadow-lg bg-white/10 text-white border-2 border-cyan-400/40 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2 ${
                    showRemoveInstructor ? "scale-105 shadow-2xl" : ""
                  }`}
                  onClick={() => {
                    setShowRemoveInstructor(!showRemoveInstructor);
                    setShowRemoveCourse(false);
                  }}
                >
                  Remove Instructor
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showRemoveInstructor ? "rotate-180" : ""}`} />
                </button>
                {showRemoveInstructor && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl border-2 border-cyan-400/40 z-20 w-80">
                    <select
                      className="w-full px-4 py-2 rounded-lg text-black bg-white border border-gray-300 mb-3"
                      value={selectedInstructor}
                      onChange={(e) => setSelectedInstructor(e.target.value)}
                    >
                      <option value="">Select Instructor</option>
                      {instructors.map(i => (
                        <option key={i.instructorId} value={i.instructorId}>{i.fname + " " + i.lname}</option>
                      ))}
                    </select>
                    <button
                      className="w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedInstructor}
                      onClick={handleRemoveInstructor}
                    >
                      Confirm Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
