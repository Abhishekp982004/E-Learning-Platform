import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [studentsPerCourse, setStudentsPerCourse] = useState([]);
  const [enrollmentTrend, setEnrollmentTrend] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [studentsRes, instructorsRes, coursesRes, trendRes, activitiesRes] = await Promise.all([
        fetch("http://localhost:8080/students-per-course"),
        fetch("http://localhost:8080/instructor/all"),
        fetch("http://localhost:8080/courses"),
        fetch("http://localhost:8080/enrollment-trend"),
        fetch("http://localhost:8080/recent-activities")
      ]);

      const instructorsData = await instructorsRes.json();
      const studentsData = await studentsRes.json();
      const trendData = await trendRes.json();
      const activitiesData = await activitiesRes.json();
      const coursesData = await coursesRes.json();

      const totalEnrollments = trendData.reduce((sum, item) => sum + item.enrollments, 0);

      setStats({
        totalStudents: studentsData.reduce((acc, item) => acc + item.students, 0),
        totalInstructors: instructorsData.length,
        totalCourses: coursesData.length,
        totalEnrollments
      });
      setStudentsPerCourse(studentsData);
      setEnrollmentTrend(trendData);
      setRecentActivities(activitiesData);
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, gradient }) => (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        background: gradient,
        borderRadius: '50%',
        opacity: '0.1'
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>{title}</p>
          <h2 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '700', margin: '0' }}>{value || 0}</h2>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          background: gradient,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    let title, subtitle;
    if (activity.type === 'enrollment') {
      title = `Enrollment: ${activity.student} → ${activity.course}`;
      subtitle = activity.time;
    } else if (activity.type === 'new_student') {
      title = `New Student: ${activity.student}`;
      subtitle = activity.time;
    } else if (activity.type === 'new_instructor') {
      title = `New Instructor: ${activity.instructor}`;
      subtitle = activity.time;
    } else if (activity.type === 'new_admin') {
      title = `New Admin: ${activity.admin}`;
      subtitle = activity.time;
    }
    return (
      <div style={{
        padding: '12px 16px',
        borderRadius: '12px',
        background: 'white',
        marginBottom: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        borderLeft: '4px solid #4facfe'
      }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#1e293b' }}>{title}</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{subtitle}</p>
      </div>
    );
  };

  const truncate = (str, max = 10) => str.length > max ? str.slice(0, max) + '…' : str;

  const Charts = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
        <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Students per Course</h3>
        {studentsPerCourse.length === 0 ? <p style={{ color: '#64748b' }}>No activity found</p> : 
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentsPerCourse}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={truncate} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>}
      </div>
      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
        <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Enrollment Trend</h3>
        {enrollmentTrend.length === 0 ? <p style={{ color: '#64748b' }}>No activity found</p> :
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enrollmentTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="enrollments" stroke="#43e97b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '32px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#1e293b', fontSize: '36px', fontWeight: '700', margin: '0 0 8px 0' }}>Admin Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '16px', margin: '0' }}>Monitor and manage your platform's users and activities</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <StatCard title="Total Students" value={stats.totalStudents} icon="👨‍🎓" gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
        <StatCard title="Total Instructors" value={stats.totalInstructors} icon="👨‍🏫" gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" />
        <StatCard title="Total Courses" value={stats.totalCourses} icon="📚" gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" />
        <StatCard title="Total Enrollments" value={stats.totalEnrollments} icon="✅" gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" />
      </div>
      <Charts />
      <div>
        <h2 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Recent Activities</h2>
        {recentActivities.length === 0 ? <p style={{ color: '#64748b' }}>No activity found</p> : recentActivities.slice(0, 5).map(act => <ActivityItem key={act.id} activity={act} />)}
      </div>
    </div>
  );
};

export default AdminDashboard;
