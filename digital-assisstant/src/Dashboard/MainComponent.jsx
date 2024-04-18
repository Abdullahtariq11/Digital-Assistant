import React, { useState } from "react";
import Topbar from "./Topbar";
import ProjectOverview from "./ProjectOverview";
import "./MainComponent.css";
import Introductory from "./Introductory";
import ProjectCreate from "../Components/ProjectCreate";


function MainComponent() {
  
  return (
    <div className="main-component">
      <div className="main-content">
        <div className="intro">{<Introductory />}</div>
        <div className="overview">{<ProjectOverview />}</div>
        <div className="newProject">{<ProjectCreate/>}</div>
      </div>
    </div>
  );
}
export default MainComponent;
