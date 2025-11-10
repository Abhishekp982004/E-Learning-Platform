import React, { useState, useEffect } from "react";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credit: "",
    instructor_id: ""
  });
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch("http://localhost:8080/instructor/all");
        const data = await res.json();
        setInstructors(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      credit: Number(formData.credit),
      instructor: { instructorId: Number(formData.instructor_id) }
    };

    try {
      const res = await fetch("http://localhost:8080/addcourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Course added successfully!");
        setFormData({ title: "", description: "", credit: "", instructor_id: "" });
      } else {
        const errData = await res.text();
        console.error(errData);
        alert("Failed to add course. Check console.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background shapes */}
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
        top: "-250px",
        right: "-100px",
        animation: "float 6s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.03)",
        bottom: "-150px",
        left: "-50px",
        animation: "float 8s ease-in-out infinite reverse"
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, textarea::placeholder, select {
          color: #94a3b8;
        }
      `}</style>

      <div style={{
        maxWidth: "520px",
        width: "100%",
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        boxShadow: "0 25px 80px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.5) inset",
        padding: "48px",
        position: "relative",
        animation: "slideIn 0.6s ease-out",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        {/* Header with icon */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 8px 24px rgba(102,126,234,0.4)"
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <h2 style={{
            color: "#1e293b",
            fontSize: "32px",
            fontWeight: "700",
            margin: "0",
            letterSpacing: "-0.5px"
          }}>
            Add New Course
          </h2>
          <p style={{
            color: "#64748b",
            fontSize: "15px",
            margin: "8px 0 0"
          }}>
            Fill in the details to create a course
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Course Title */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#334155",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Course Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Introduction to Data Science"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                backgroundColor: "#ffffff",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          {/* Description */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#334155",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide a detailed description of the course..."
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                backgroundColor: "#ffffff",
                resize: "vertical",
                minHeight: "120px",
                fontFamily: "inherit",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#334155",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Credit 
            </label>
            <input
              type="number"
              name="credit"
              placeholder="3"
              value={formData.credit}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                backgroundColor: "#ffffff",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          {/* Instructor */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{
              display: "block",
              color: "#334155",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Instructor
            </label>
            <div style={{ position: "relative" }}>
              <select
                name="instructor_id"
                value={formData.instructor_id}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  paddingRight: "40px",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="">Select an instructor</option>
                {instructors.map((inst) => (
                  <option key={inst.instructorId} value={inst.instructorId}>
                    {inst.fname} {inst.lname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 24px rgba(102,126,234,0.4)",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 32px rgba(102,126,234,0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 24px rgba(102,126,234,0.4)";
            }}
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;