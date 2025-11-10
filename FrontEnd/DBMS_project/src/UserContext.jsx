
import React, { createContext, useState, useContext, useEffect } from "react";
const UserContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    role: null,
    name: null,
    email: null
  });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user && user.id !== null) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, selectedCourse, setSelectedCourse, selectedInstructor, setSelectedInstructor }}>
      {children}
    </UserContext.Provider>
  );
};
