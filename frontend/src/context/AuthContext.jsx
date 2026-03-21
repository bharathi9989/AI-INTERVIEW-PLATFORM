import { Children } from "react";
import { createContext, useState } from "react"; 
import { data } from "react-router-dom";

export const AuthContext = createContext();
export const AuthProvider = ({ Children }) => {

    const [user, setUser] = useState(null)
    
    const login = (data) => { 
        localStorage.setItem("token",data.token)
        setUser(data.user)
    }

    const logout = () => { 
        localStorage.setItem("token")
        setUser(null)
    }

    return (
      <AuthContext.Provider
        value={{ user, login, logout }}
      ></AuthContext.Provider>
    );

}