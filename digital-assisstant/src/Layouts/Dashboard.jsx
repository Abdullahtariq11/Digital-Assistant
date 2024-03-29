import React from 'react'
import Sidebar from '../Dashboard/Sidebar';
import MainComponent from '../Dashboard/MainComponent';
import "./Dashboard.css";


 function Dashboard() {
  return (
    <div className='Dashboard'>
        <Sidebar/>
        <MainComponent/>
    </div>
  )
};
export default Dashboard;
