import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const EnrollmentPage = () => {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (location.state) {
      setUser(location.state);
      console.log("User object from location:", location.state);
    }
    fetchAllCourses();
  }, [location.state]);

  const fetchAllCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!user.id) {
      alert("Please log in to enroll in courses");
      return;
    }

    if (!courseId) {
      alert("Invalid course ID");
      return;
    }

    console.log("Sending enrollment:", { studentId: user.id, courseId });

    setLoading(prev => ({ ...prev, [courseId]: true }));

    try {
      const response = await fetch("http://localhost:8080/Enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      email: user.email,
      course_id: courseId
    }),
});


      if (response.ok) {
        alert("Successfully enrolled in course!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to enroll in course");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Error enrolling in course");
    } finally {
      setLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
          Available Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course.course_id || course.id} 
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div>
                <h2 className="text-xl font-semibold text-purple-800 mb-2">
                  {course.title || "Untitled Course"}
                </h2>
                <p className="text-gray-600 mb-4">{course.description || "No description available"}</p>
              </div>

              <button
                onClick={() => handleEnroll(course.course_id || course.id)}
                disabled={loading[course.course_id || course.id]}
                className="bg-purple-600 text-white py-3 rounded-lg w-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading[course.course_id || course.id] ? "Enrolling..." : "Enroll"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
