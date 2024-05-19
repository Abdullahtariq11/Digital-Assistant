import { layouts } from 'chart.js';
import React, { Children, useState } from 'react'
import { createContext } from 'react'

//create context
const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null)
    const[projectRefresh,setProjectReffresh]=useState(false)
    const login=(userData)=>{
        setUser(userData);
    }
    const logout=()=>{
        setUser(null);
    }
    const refresh=()=>{
        setProjectReffresh((prev)=>!prev);
    }
    return (
        <AuthContext.Provider
        value={{user,login,logout,refresh,projectRefresh}}>
            {children}
        </AuthContext.Provider>
      )
};

export default  AuthContext;
    

