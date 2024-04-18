import React from "react";
import "./ProjectOverview.css";
import data from "../assets/MOCK_DATA.json";

export default function ProjectOverview() {
  return (
    <div className="project-overview">
      <div className="projects-holder">
        <h5>Project Overview</h5>
        <div className="progress-bar">
          <div className="completion-progress"></div>
        </div>

        <div className="">
          <ul>
            <li>
              <div className="projects">
                <p>Total Projects: <span>{data.length}</span></p>
                <p>Projects Completed: <span>{data.filter((dat)=>(dat.status==="Completed")).length}</span></p>
                <p>Projects Inprogress: <span>{data.filter((dat)=>(dat.status==="In Progress")).length}</span></p>
                <p>Projects on hold: <span>{data.filter((dat)=>(dat.status==="On Hold")).length}</span></p>
                <p>Projects Not started: <span>{data.filter((dat)=>(dat.status==="Not started")).length}</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
