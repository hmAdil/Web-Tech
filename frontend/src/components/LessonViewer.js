import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import api from "../api/api";

export default function LessonViewer()
{
  const {language} = useParams();
  const [lessons, setLessons] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try
      {
        const res = await api.get(`/lessons/${language}`);
        setLessons(res.data);
      } catch(err) {
        console.error(err);
      }
    };
    fetchLessons();
  },[language]);

  if(!lessons.length) return <div className = "center">No lessons found. Add lessons from backend or try another language.</div>;

  const current = lessons[index];

  const next = () => {setFlipped(false); setIndex(i => (i+1)%lessons.length);};
  const prev = () => {setFlipped(false); setIndex(i => (i-1+lessons.length)%lessons.length);};

  return (
    <div className = "lesson-viewer">
      <header>
        <h2>{language} Flashcards</h2>
        <Link to="/dashboard">Back</Link>
      </header>

      <div className = {`card ${flipped? "flipped":""}`} onClick = {() => setFlipped(f => !f)}>
        {!flipped ? (
          <div className = "front">
            <h3>{current.word}</h3>
            {current.example && <p className = "example">{current.example}</p>}
          </div>
        ):(
          <div className = "back">
            <h3>{current.translation}</h3>
            <p className = "example">Answer: {current.answer || current.translation}</p>
          </div>
        )}
      </div>

      <div className = "controls">
        <button onClick = {prev}>Previous</button>
        <button onClick = {next}>Next</button>
        <Link to = {`/quiz/${language}`}><button>Start Quiz</button></Link>
      </div>
    </div>
  );
}