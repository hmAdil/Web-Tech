import React,{useState,useEffect,useContext} from "react";
import {useParams,Link} from "react-router-dom";
import api from "../api/api";
import {AuthContext} from "../contexts/AuthContext";

export default function Quiz(){
  const {language} = useParams();
  const [questions,setQuestions] = useState([]);
  const [qIndex,setQIndex] = useState(0);
  const [score,setScore] = useState(0);
  const [done,setDone] = useState(false);
  const {username} = useContext(AuthContext);

  useEffect(()=>{
    const fetchQuestions = async ()=>{
      try{
        const res = await api.get(`/lessons/${language}`);
        const qs = res.data.filter(x=>x.options && x.options.length).sort(()=>Math.random()-0.5);
        setQuestions(qs);
      }catch(err){
        console.error(err);
      }
    };
    fetchQuestions();
  },[language]);

  const handleAnswer = (choice)=>{
    const q = questions[qIndex];
    if(choice === q.answer) setScore(s=>s+1);
    if(qIndex+1 < questions.length) setQIndex(i=>i+1);
    else {
      setDone(true);
      const pct = Math.round(( (score + (choice===questions[qIndex].answer?1:0) ) / questions.length )*100);
      if(username){
        api.post("/lessons/progress",{username,language,score:pct}).catch(e=>console.error(e));
      }
    }
  };

  if(!questions.length) return <div className="center">No quiz questions available for {language}.</div>;
  if(done) return (
    <div className="center">
      <h2>Quiz complete</h2>
      <p>Your score: {score}/{questions.length}</p>
      <Link to={`/lessons/${language}`}><button>Back to Lessons</button></Link>
      <Link to="/dashboard"><button>Dashboard</button></Link>
    </div>
  );

  const q = questions[qIndex];

  return (
    <div className="quiz">
      <header>
        <h2>{language} Quiz</h2>
        <Link to="/dashboard">Back</Link>
      </header>

      <div className="question-card">
        <p>Question {qIndex+1} of {questions.length}</p>
        <h3>What is the meaning of: <em>{q.word}</em> ?</h3>
        <div className="options">
          {q.options.map(opt=>(
            <button key={opt} onClick={()=>handleAnswer(opt)}>{opt}</button>
          ))}
        </div>
      </div>
    </div>
  );
}