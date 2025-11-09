import React,{createContext,useState,useEffect} from "react";
import {setAuthToken} from "../api/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [token,setToken] = useState(localStorage.getItem("token") || "");
  const [username,setUsername] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    if(token)
    {
      localStorage.setItem("token",token);
      setAuthToken(token);
    } else {
      localStorage.removeItem("token");
      setAuthToken(null);
    }
  },[token]);

  useEffect(() => {
    if(username) localStorage.setItem("username",username);
    else localStorage.removeItem("username");
  },[username]);

  return (
    <AuthContext.Provider value = {{token,setToken,username,setUsername}}>
      {children}
    </AuthContext.Provider>
  );
};