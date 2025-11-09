import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";

export default function Dashboard()
{
  const navigate = useNavigate();
  const {username, setToken, setUsername} = useContext(AuthContext);

  const languages = ["French", "Spanish", "Japanese"];

  const handleLogout = () => {
    setToken("");
    setUsername("");
    navigate("/login");
  };

  return (
    <div className = "dashboard">
      <header>
        <h1>Welcome, {username || "Learner"}</h1>
        <button onClick = {handleLogout}>Logout</button>
      </header>

      <section>
        <h2>Choose a language</h2>
        <div className = "language-list">
          {languages.map(lang => (
            <div key = {lang} className = "language-card">
              <h3>{lang}</h3>
              <button onClick = {() => navigate(`/lessons/${lang}`)}>Study</button>
              <button onClick = {() => navigate(`/quiz/${lang}`)}>Take Quiz</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}