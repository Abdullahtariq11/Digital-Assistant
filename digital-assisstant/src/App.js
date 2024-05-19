import React, { useState } from 'react';
import Dashboard from './Layouts/Dashboard';
import Home from './Layouts/Home';
import { BrowserRouter as Routes,Route,Router } from 'react-router-dom';


function App() {

  const[isLogin,setLogin]=useState(false);

  return (
    <div className="App">
      {
        !isLogin && (<Home setLogin={setLogin}/>)
      }
      {     
        isLogin && (<Dashboard setLogin={setLogin}/>)  
      } 
    </div>
  );
}

export default App;
