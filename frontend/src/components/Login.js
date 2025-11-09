import React, {useState, useContext} from "react";
import {useNavigate, Link} from "react-router-dom";
import api from "../api/api";
import {AuthContext} from "../contexts/AuthContext";

export default function Login()
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setToken, setUsername: setCtxUsername} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try
    {
      const res = await api.post("/auth/login", {username, password});
      setToken(res.data.token);
      setCtxUsername(res.data.username);
      navigate("/dashboard");
    } catch(err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className = "auth-container">
      <h2>Login</h2>
      <form onSubmit = {handleSubmit}>
        <input placeholder = "Username" value = {username} onChange = {e => setUsername(e.target.value)} required/>
        <input placeholder = "Password" type = "password" value = {password} onChange = {e => setPassword(e.target.value)} required/>
        <button type = "submit">Login</button>
      </form>
      {error && <p className = "error">{error}</p>}
      <p>Don't have an account? <Link to = "/register">Register</Link></p>
    </div>
  );
}