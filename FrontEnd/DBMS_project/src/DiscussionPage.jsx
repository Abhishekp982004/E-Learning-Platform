import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "./UserContext";
import { MessageSquare, Reply, Send, X, Sparkles } from "lucide-react";

const DiscussionPage = () => {
  const { quizId } = useParams();
  const { user } = useUser();
  const userId = user.id;

  const [discussions, setDiscussions] = useState([]);
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null); // null = top-level, number = reply
  const [expandedReplies, setExpandedReplies] = useState(new Set());

  useEffect(() => {
    fetch(`http://localhost:8080/discussion/${quizId}`)
      .then((res) => res.json())
      .then((data) => {
        setDiscussions(data);
        const allIds = new Set(data.map((d) => d.Discussion_id));
        setExpandedReplies(allIds);
      })
      .catch((err) => console.log(err));
  }, [quizId]);

  const handleSend = () => {
    if (!message.trim()) return;

    fetch("http://localhost:8080/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Topic: message,
        User_id: userId,
        Parent_Discussion_Id: replyTo || null,
        Quiz_id: parseInt(quizId),
      }),
    })
      .then(() => {
        setMessage("");
        const parentId = replyTo;
        setReplyTo(null);
        return fetch(`http://localhost:8080/discussion/${quizId}`)
          .then((res) => res.json())
          .then((data) => {
            setDiscussions(data);
            if (parentId) {
              setExpandedReplies((prev) => new Set([...prev, parentId]));
            }
          });
      })
      .catch((err) => console.log(err));
  };

  const buildHierarchy = (data, parentId = null) =>
    data
      .filter((item) => item.Parent_Discussion_Id === parentId)
      .map((item) => ({
        ...item,
        replies: buildHierarchy(data, item.Discussion_id),
      }));

  const toggleReplies = (id) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderDiscussions = (items, level = 0) =>
    items.map((item) => {
      const isExpanded = expandedReplies.has(item.Discussion_id);
      const hasReplies = item.replies.length > 0;
      return (
        <div key={item.Discussion_id} className="mb-4">
          <div
            className={`rounded-xl border transition-all duration-300 hover:shadow-xl ${
              level === 0
                ? "bg-white/90 backdrop-blur-sm border-purple-200/50 shadow-lg hover:border-purple-300"
                : "bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-200/30"
            }`}
          >
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  U{item.User_id}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    User {item.User_id}
                  </span>
                  {level > 0 && <span className="text-xs text-gray-400 ml-2">• Reply</span>}
                </div>
              </div>
              <div className="ml-13">
                <p className="text-gray-800 leading-relaxed mb-4">{item.Topic}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setReplyTo(item.Discussion_id);
                      setMessage("");
                    }}
                    className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-pink-600 transition-colors"
                  >
                    <Reply size={14} />
                    Reply
                  </button>
                  {hasReplies && (
                    <button
                      onClick={() => toggleReplies(item.Discussion_id)}
                      className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-pink-600 transition-colors"
                    >
                      <MessageSquare size={14} />
                      {isExpanded ? "Hide" : "Show"} {item.replies.length}{" "}
                      {item.replies.length === 1 ? "reply" : "replies"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {hasReplies && isExpanded && (
            <div className="ml-8 mt-3 pl-4 border-l-2 border-gradient-to-b from-purple-300 to-pink-300">
              {renderDiscussions(item.replies, level + 1)}
            </div>
          )}
        </div>
      );
    });

  const tree = buildHierarchy(discussions);
  const replyMessage = replyTo ? discussions.find((d) => d.Discussion_id === replyTo) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 py-8 px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-cyan-400/30 p-6 mb-6">
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent flex items-center gap-3">
              <MessageSquare size={36} />
              Discussion
            </h1>
            <p className="text-cyan-200 text-sm mt-2 font-light">Share your thoughts and engage with the community</p>
          </div>

          <div className="space-y-4">
            {tree.length > 0 ? (
              <>
                <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-400/20 w-fit">
                  <Sparkles size={16} className="text-cyan-300" />
                  <span className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    {tree.length} {tree.length === 1 ? "Comment" : "Comments"}
                  </span>
                </div>
                {renderDiscussions(tree)}
              </>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-cyan-400/30 p-12 text-center">
                <MessageSquare size={56} className="mx-auto text-cyan-300/50 mb-4" />
                <p className="text-cyan-200 text-xl font-bold mb-2">No discussions yet</p>
                <p className="text-indigo-200 text-sm">Be the first to start a conversation!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SINGLE INPUT BOX */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-50">
        <div className="bg-white/95 backdrop-blur-xl border-2 border-purple-300/50 shadow-2xl rounded-2xl p-4">
          {/* Reply Preview */}
          {replyTo && replyMessage && (
            <div className="mb-3 p-3 bg-gradient-to-r from-purple-100/80 to-pink-100/80 border-l-4 border-purple-500 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                    Replying to User {replyMessage.User_id}:
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">{replyMessage.Topic}</p>
                </div>
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setMessage("");
                  }}
                  className="ml-3 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={replyTo ? "Write your reply..." : "Start a new discussion or share your thoughts..."}
            className="w-full border-2 border-purple-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all bg-white"
            rows={2}
            style={{ direction: "ltr", textAlign: "left" }}
            autoFocus={!!replyTo}
          />

          <div className="flex justify-end mt-2 gap-2">
            {replyTo && (
              <button
                onClick={() => {
                  setReplyTo(null);
                  setMessage("");
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white px-6 py-2.5 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send size={16} />
              {replyTo ? "Post Reply" : "Post Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;