import React, { useState, useEffect } from "react";
import "./ProjectPage.css";
import data from "../assets/MOCK_DATA.json";

export default function ProjectPage({ viewId, setCurrentTab }) {
  const [currentData, setCurrentData] = useState(null);
  const [editMode, setCurrentMode] = useState(false);

  useEffect(() => {
    const filteredData = data.filter((dat) => dat.project_id == viewId);
    console.log(filteredData);
    if (filteredData.length > 0) {
      setCurrentData(filteredData[0]); // Assuming project_id is unique
    } else {
      setCurrentData(null); // No matching project found
    }
  }, [viewId]);

  if (!currentData) {
    return <div>No project found</div>;
  }

  return (
    <div className="page-Container">
      {!editMode && (
        <div className="Project-page-Container">
          <div className="project-page-heading">
            <h1>Project Information</h1>
          </div>

          <div className="container-projects">
            <p>
              <span className="text-heading">Project Name:</span>{" "}
              {currentData.project_name}
            </p>
            <p>
              <span className="text-heading">Description:</span>{" "}
              {currentData.Description}
            </p>
            <p>
              <span className="text-heading">Start Date:</span>
              {currentData.start_date}
            </p>
            <p>
              <span className="text-heading">Deadline: </span>{" "}
              {currentData.Deadline}
            </p>
            <p>
              <span className="text-heading">Status:</span> {currentData.status}
            </p>
            <p>
              <span className="text-heading">Priority:</span>{" "}
              {currentData.priority}
            </p>
            <div>
              <p>
                <span className="text-heading">Tasks:</span>
              </p>
              {currentData.tasks.map((task) => (
                <div className="tasks-container">
                  <p>
                    <span className="text-heading">Title:</span> {task.title}
                  </p>
                  <p>
                    <span className="text-heading">Status</span> {task.status}
                  </p>
                </div>
              ))}
            </div>

            <div className="project-buttons-container">
              <button onClick={() => setCurrentTab("project-list")}>
                close
              </button>
              <button onClick={() => setCurrentMode("edit")}>edit</button>
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
              name="project_name"
              type="text"
              value={currentData.project_name}
            />
            <label className="text-heading" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              value={currentData.Description}
            ></textarea>
            <label className="text-heading" htmlFor="startDate">
              Start Date:
            </label>
            <input
              name="startDate"
              type="date"
              value={currentData.start_date}
            />
            <label className="text-heading" htmlFor="Deadline">
              Deadline:
            </label>
            <input name="Deadline" type="date" value={currentData.Deadline} />
            <label className="text-heading" htmlFor="status">
              Status:
            </label>
            <input name="status" type="text" value={currentData.status} />
            <label className="text-heading" htmlFor="priority">
              Priority:
            </label>
            <select name="priority" value={currentData.priority} id="priority">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="project-buttons-container">
              <button onClick={() => setCurrentTab("project-list")}>
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
