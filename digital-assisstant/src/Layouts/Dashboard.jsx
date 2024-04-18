import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import MainComponent from "../Dashboard/MainComponent";
import "./Dashboard.css";
import Topbar from "../Dashboard/Topbar";
import Projects from "../Projects/Projects";
import ProjectInfo from "../projectList/ProjectInfo";

function Dashboard() {
  const [tab,selectTab]=useState("main")
  return (
    <div className="Dashboard">
      <div className="top">
      <Topbar />
      </div>
      <div className="main">
        <Sidebar selectTab={selectTab}/>
        {
          tab=="main"?<MainComponent />:tab=="project"?<Projects/>:<ProjectInfo/>
        }
        
      </div>
    </div>
  );
}
export default Dashboard;
