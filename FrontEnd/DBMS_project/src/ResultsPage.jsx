import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!email) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:8080/results?email=${email}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 w-full">
        <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent mb-12 text-center">
          Your Quiz Results
        </h1>

        <div className="w-full max-w-3xl mx-auto">
          {results.length > 0 ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-cyan-400/20 overflow-hidden shadow-2xl">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600/50 to-cyan-600/50 border-b border-cyan-400/20">
                    <th className="text-left px-6 py-4 text-cyan-100 font-bold text-sm uppercase tracking-wider">Quiz</th>
                    <th className="text-right px-6 py-4 text-cyan-100 font-bold text-sm uppercase tracking-wider">Score</th>
                    <th className="text-left px-6 py-4 text-cyan-100 font-bold text-sm uppercase tracking-wider">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, index) => (
                    <tr key={index} className="border-b border-cyan-400/10 hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 text-indigo-100 font-medium group-hover:text-cyan-200 transition-colors">
                        Quiz {r.Quiz_Id}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-white font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          {r.Score}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-indigo-100">{r.Feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-cyan-200 text-xl font-semibold mb-2">No results yet.</p>
              <p className="text-indigo-300 text-sm">Complete a quiz to see your scores!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;