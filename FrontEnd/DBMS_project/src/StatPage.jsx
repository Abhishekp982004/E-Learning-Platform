import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { useUser } from "./UserContext";
import axios from "axios";

const InstructorDashboard = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/instructor/${user.id}/dashboard`
        );

        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          console.error("Expected array from backend, got:", res.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [user.id]);

  if (!Array.isArray(courses)) {
    return <div>Loading...</div>;
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl font-semibold bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        No activity found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 px-8 py-12 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome {user.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex flex-col gap-4"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>Students Enrolled: {course.students}</p>
            <p>Quizzes: {course.quizzes}</p>
            <p>Avg Quiz Score: {course.avgScore}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Student Participation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={courses.map((c) => ({ course: c.title, students: c.students }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#43e97b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Quiz Avg Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={courses.map((c) => ({
                quizTitle: c.title,
                avgScore: c.avgScore,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quizTitle" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgScore" stroke="#f093fb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
