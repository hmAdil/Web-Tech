import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import api from "../api/api";

export default function Dashboard()
{
  const navigate = useNavigate();
  const {username, setToken, setUsername} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const languages = ["French", "Spanish", "Japanese"];

  const handleLogout = () => {
    setToken("");
    setUsername("");
    navigate("/login");
  };

  const generateLessons = async(lang) => {
    try
    {
      setLoading(true);
      setMessage(`Generating ${lang} lessons...`);
      const res = await api.post("/ai/generate", {language:lang, level:"Beginner"});
      setMessage(`${res.data.message}`);
    } catch(err) {
      setMessage(`${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className = "dashboard">
      <header>
        <h1>Welcome, {username || "Learner"}</h1>
        <button onClick = {handleLogout}>Logout</button>
      </header>

      <section>
        <h2>Choose a Language</h2>
        <div className = "language-list">
          {languages.map(lang => (
            <div key = {lang} className = "language-card">
              <h3>{lang}</h3>
              <button onClick = {() => navigate(`/lessons/${lang}`)}>Study</button>
              <button onClick = {() => navigate(`/quiz/${lang}`)}>Take Quiz</button>
              <button onClick = {() => generateLessons(lang)} disabled = {loading}>
                {loading? "Generating..." : "AI Generate"}
              </button>
            </div>
          ))}
        </div>
      </section>
      {message && <p style = {{marginTop: "20px", textAlign: "center"}}>{message}</p>}
    </div>
  );
}