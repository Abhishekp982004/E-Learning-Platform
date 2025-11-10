import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data && data.role) {
      setUser({
        id: data.user_id,
        role: data.role,
        name: data.email.split("@")[0],
        email: data.email
      });
      navigate("/home");
    } else {
      alert("User not found or wrong password");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, lname, email, password, role }),
    });
    if (res.ok) {
      alert("Signup successful! Please login.");
      setIsLogin(true);
    } else {
      alert("Signup failed");
    }
  };

  const renderButton = (text, index, primary, onClick) => (
    <button
      key={index}
      type="submit"
      className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform ${
        hoveredButton === index ? "scale-105 shadow-2xl" : "shadow-lg"
      } ${
        primary
          ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600"
          : "bg-white/10 text-white border-2 border-cyan-400/40 hover:bg-white/20 backdrop-blur-sm"
      }`}
      onMouseEnter={() => setHoveredButton(index)}
      onMouseLeave={() => setHoveredButton(null)}
      onClick={onClick}
    >
      {text}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-sans flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-cyan-400/20">
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-8 text-center">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h2>

          {isLogin ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                required
              />
              {renderButton("Login", 0, true, null)}
              <p className="text-center text-cyan-200 mt-2">
                Don't have an account?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="cursor-pointer font-semibold text-pink-300 hover:text-pink-200 transition-colors"
                >
                  Signup
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value.toUpperCase())}
                className="px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
              >
                <option value="STUDENT" className="bg-indigo-900">student</option>
                <option value="ADMIN" className="bg-indigo-900">admin</option>
                <option value="TEACHER" className="bg-indigo-900">teacher</option>
              </select>
              {renderButton("Signup", 1, true, null)}
              <p className="text-center text-cyan-200 mt-2">
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="cursor-pointer font-semibold text-pink-300 hover:text-pink-200 transition-colors"
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
