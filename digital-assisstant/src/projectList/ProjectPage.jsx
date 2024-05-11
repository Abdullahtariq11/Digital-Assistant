import React, { useState, useEffect } from "react";
import "./ProjectPage.css";



export default function ProjectPage({ viewId, onClose,setFreshData }) {
  const [currentData, setCurrentData] = useState(null);
  const [editMode, setCurrentMode] = useState(false);
  
  

  const [projectInfo, setProjectInfo] = useState({
    name: "",
    description: "",
    status: "",
    priority:"",
    startDate:"",
    endDate: "",
    priority: ""
  });

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:5115/Project/getByProjectId/${viewId}`);
      const responseData = await response.json();
      // Extract the array of projects from the response
      const data = responseData;
      setCurrentData(data); 
      setProjectInfo(data)// Ensure that `data` is an array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function editData() {
    try {
      console.log(viewId);
      const response = await fetch(`http://localhost:5115/Project/editProject/${viewId}`,{
        method:"Put",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectInfo), 
      });
      const responseData = await response.json();
      // Extract the array of projects from the response
      const data = responseData;
      setCurrentData(data); 
      setProjectInfo(data)// Ensure that `data` is an array
    } catch (error) {
      console.error("Error editing data:", error);
    }
    setFreshData(true)
  }
  
  useEffect(() => {

    fetchData();
  }, [viewId]);

  const handleSave=()=>{
    editData();
    onClose();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo({ ...projectInfo, [name]: value });
  };

  if (!currentData) {
    return <div>No project found</div>;
  }


  return (
    <div className="ProjectPage-container">
      {!editMode && (
        <div className="Project-page-Container">
          <div className="project-page-heading">
            <h1>Project Information</h1>
          </div>

          <div className="container-projects">
            <p>
              <span className="text-heading">Project Name:</span>{" "}
              {currentData.name}
            </p>
            <p>
              <span className="text-heading">Description:</span>{" "}
              {currentData.description}
            </p>
            <p>
              <span className="text-heading">Start Date:</span>
              {currentData.startDate}
            </p>
            <p>
              <span className="text-heading">Deadline: </span>{" "}
              {currentData.endDate}
            </p>
            <p>
              <span className="text-heading">Status:</span> {currentData.status}
            </p>
            <p>
              <span className="text-heading">Priority:</span>{" "}
              {currentData.priority}
            </p>

            <div className="project-buttons-container">
              <button onClick={() => setCurrentMode("edit")}>edit</button>
              <button onClick={onClose}>close</button>
            </div>
          </div>
        </div>
      )}
      {editMode && (
        <div className="Project-page-Container">
          <div className="project-page-heading">
            <h1>Project Information</h1>
          </div>

          <div className="container-projects">
            <label className="text-heading" htmlFor="project_name">
              Project Name:
            </label>
            <input
              name="name"
              type="text"
              value={projectInfo.name}
              onChange={handleChange}
            />
            <label className="text-heading" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              value={projectInfo.description}
              onChange={handleChange}
            ></textarea>
            <label className="text-heading" htmlFor="startDate">
              Start Date:
            </label>
            <input
              name="startDate"
              type="text"
              value={currentData.startDate}
              readOnly
            />
            <label className="text-heading" htmlFor="endDate">
              Deadline:
            </label>
            <input
              name="endDate"
              type="text"
              value={projectInfo.endDate}
              onChange={handleChange}
            />
            <label className="text-heading" htmlFor="status">
              Status:
            </label>
            <input
              name="status"
              type="text"
              value={projectInfo.status}
              onChange={handleChange}
            />
            <label className="text-heading" htmlFor="priority">
              Priority:
            </label>
            <select
              name="priority"
              value={projectInfo.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="project-buttons-container">
              <button onClick={handleSave}>save</button>
              <button onClick={onClose}>close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
