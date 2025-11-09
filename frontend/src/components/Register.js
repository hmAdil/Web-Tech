import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import api from "../api/api";

export default function Register()
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try
    {
      await api.post("/auth/register", {username,password});
      setMessage("User created. Redirecting to login...");
      setTimeout(() => navigate("/login"),800);
    } catch(err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className = "auth-container">
      <h2>Register</h2>
      <form onSubmit = {handleSubmit}>
        <input placeholder = "Username" value = {username} onChange = {e => setUsername(e.target.value)} required/>
        <input placeholder = "Password" type = "password" value = {password} onChange = {e => setPassword(e.target.value)} required/>
        <button type = "submit">Register</button>
      </form>
      {message && <p className = "info">{message}</p>}
      <p>Already have an account? <Link to = "/login">Login</Link></p>
    </div>
  );
}