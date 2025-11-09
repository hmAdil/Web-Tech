import React,{useState,useEffect} from "react";
import {useParams,Link} from "react-router-dom";
import api from "../api/api";

export default function LessonViewer(){
  const {language}=useParams();
  const [lessons,setLessons]=useState([]);
  const [index,setIndex]=useState(0);
  const [flipped,setFlipped]=useState(false);

  useEffect(()=>{
    const fetchLessons=async()=>{
      try{
        const res=await api.get(`/lessons/${language}`);
        setLessons(res.data);
      }catch(err){
        console.error(err);
      }
    };
    fetchLessons();
  },[language]);

  if(!lessons.length) return <div className="center">No lessons found. Add lessons from backend or try another language.</div>;

  const current=lessons[index];
  const next=()=>{setFlipped(false);setIndex(i=>(i+1)%lessons.length);};
  const prev=()=>{setFlipped(false);setIndex(i=>(i-1+lessons.length)%lessons.length);};

  return (
    <div className="lesson-viewer">
      <header className="lesson-header">
        <h2>{language} Flashcards</h2>
        <Link to="/dashboard" className="back-link">Back</Link>
      </header>

      <div className={`card ${flipped? "flipped":""}`} onClick={()=>setFlipped(f=>!f)}>
        <div className="card-inner">
          <div className="card-front">
            <h3>{current.word}</h3>
            {current.example && <p className="example">{current.example}</p>}
            <p className="hint">Tap to Flip</p>
          </div>
          <div className="card-back">
            <h3>{current.translation}</h3>
            <p className="example">Example: {current.example||"—"}</p>
            <p className="hint">Tap to Flip Back</p>
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
        <Link to={`/quiz/${language}`}><button>Start Quiz</button></Link>
      </div>
    </div>
  );
}