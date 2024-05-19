import React, { useState, useEffect } from "react";
import "./ProjectPage.css";

export default function ProjectPage({ viewId, onClose, setFreshData }) {
  const [currentData, setCurrentData] = useState(null);
  const [editMode, setCurrentMode] = useState(false);
  const [projectInfo, setProjectInfo] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    startDate: "",
    endDate: "",
  });

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:5115/Project/getByProjectId/${viewId}`);
      const data = await response.json();
      setCurrentData(data);
      setProjectInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function editData() {
    try {
      const response = await fetch(`http://localhost:5115/Project/editProject/${viewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectInfo),
      });
      const data = await response.json();
      setCurrentData(data);
      setProjectInfo(data);
      setFreshData(true);
    } catch (error) {
      console.error("Error editing data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [viewId]);

  const handleSave = () => {
    editData();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo({ ...projectInfo, [name]: value });
  };

  if (!currentData) {
    return <div>No project found</div>;
  }

  return (
    <div className="ProjectPage-overlay">
      <div className="ProjectPage-container">
        <div className="ProjectPage-header">
          <h1>Project Information</h1>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {!editMode ? (
          <div className="project-details">
            <p><span className="text-heading">Project Name:</span> {currentData.name}</p>
            <p><span className="text-heading">Description:</span> {currentData.description}</p>
            <p><span className="text-heading">Start Date:</span> {currentData.startDate}</p>
            <p><span className="text-heading">Deadline:</span> {currentData.endDate}</p>
            <p><span className="text-heading">Status:</span> {currentData.status}</p>
            <p><span className="text-heading">Priority:</span> {currentData.priority}</p>
            <div className="project-buttons">
              <button className="edit-button" onClick={() => setCurrentMode(true)}>Edit</button>
              <button className="close-button" onClick={onClose}>Close</button>
            </div>
          </div>
        ) : (
          <div className="project-edit">
            <label className="text-heading" htmlFor="name">Project Name:</label>
            <input name="name" type="text" value={projectInfo.name} onChange={handleChange} />
            <label className="text-heading" htmlFor="description">Description:</label>
            <textarea name="description" cols="30" rows="5" value={projectInfo.description} onChange={handleChange}></textarea>
            <label className="text-heading" htmlFor="startDate">Start Date:</label>
            <input name="startDate" type="date" value={projectInfo.startDate} onChange={handleChange} />
            <label className="text-heading" htmlFor="endDate">Deadline:</label>
            <input name="endDate" type="date" value={projectInfo.endDate} onChange={handleChange} />
            <label className="text-heading" htmlFor="status">Status:</label>
            <select name="status" value={projectInfo.status} onChange={handleChange}>
              <option value="Not started">Not started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
            <label className="text-heading" htmlFor="priority">Priority:</label>
            <select name="priority" value={projectInfo.priority} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="project-buttons">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="close-button" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
