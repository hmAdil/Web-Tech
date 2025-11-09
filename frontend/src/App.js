import React from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import LessonViewer from "./components/LessonViewer";
import Quiz from "./components/Quiz";

function App()
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/lessons/:language" element={<LessonViewer/>}/>
        <Route path="/quiz/:language" element={<Quiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;