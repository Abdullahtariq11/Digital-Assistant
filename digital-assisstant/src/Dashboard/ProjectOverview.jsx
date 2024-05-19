import React, { useContext, useEffect, useState } from "react";
import "./ProjectOverview.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import AuthContext from "../AuthContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export default function ProjectOverview() {
  const{user,projectRefresh}=useContext(AuthContext);
  const [projectData, setProjectData] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    onHoldProjects: 0,
    notStartedProjects: 0,
  });

  useEffect(() => {
    fetchData();
  }, [projectRefresh]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5115/Project/GetbyId/${user.id}`);
      const responseData = await response.json();
      const data = responseData["$values"] || [];

      const totalProjects = data.length;
      const completedProjects = data.filter((dat) => dat.status === "Completed").length;
      const inProgressProjects = data.filter((dat) => dat.status === "In Progress").length;
      const onHoldProjects = data.filter((dat) => dat.status === "On Hold").length;
      const notStartedProjects = data.filter((dat) => dat.status === "Not started").length;

      setProjectData({
        totalProjects,
        completedProjects,
        inProgressProjects,
        onHoldProjects,
        notStartedProjects,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const barData = {
    labels: ["Completed", "In Progress", "On Hold", "Not Started"],
    datasets: [
      {
        label: "Projects",
        data: [
          projectData.completedProjects,
          projectData.inProgressProjects,
          projectData.onHoldProjects,
          projectData.notStartedProjects,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
        borderColor: ["#388e3c", "#f57c00", "#d32f2f", "#1976d2"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "In Progress", "On Hold", "Not Started"],
    datasets: [
      {
        label: "Projects",
        data: [
          projectData.completedProjects,
          projectData.inProgressProjects,
          projectData.onHoldProjects,
          projectData.notStartedProjects,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
        borderColor: ["#388e3c", "#f57c00", "#d32f2f", "#1976d2"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="project-overview">
      <div className="projects-holder">
        <h5>Project Overview</h5>
        <div className="progress-bar">
          <div className="completion-progress" style={{ width: `${(projectData.completedProjects / projectData.totalProjects) * 100}%` }}></div>
        </div>

        <div className="chart-container">
          <Bar 
            data={barData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { 
                legend: { display: false } 
              } 
            }} 
          />
        </div>

        <div className="chart-container">
          <Pie 
            data={pieData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { 
                legend: { position: "bottom" } 
              } 
            }} 
          />
        </div>

        <div className="projects-info">
          <ul>
            <li>
              <div className="projects">
                <p>Total Projects: <span>{projectData.totalProjects}</span></p>
                <p>Projects Completed: <span>{projectData.completedProjects}</span></p>
                <p>Projects In Progress: <span>{projectData.inProgressProjects}</span></p>
                <p>Projects On Hold: <span>{projectData.onHoldProjects}</span></p>
                <p>Projects Not Started: <span>{projectData.notStartedProjects}</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
