import React, { useEffect, useState } from "react";
import "./ProjectInfo.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import data from "../assets/MOCK_DATA.json";
import ProjectPage from "./ProjectPage";

export default function ProjectInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage, setProjectPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [orderType, setOrderType] = useState(null);
  const [currentTab, setCurrentTab] = useState("project-list");
  const [viewId, setViewId] = useState(null);

  const lastProjectIndex = currentPage * projectPerPage;
  const firstProjectIndex = lastProjectIndex - projectPerPage;
  const Projects = data.slice(firstProjectIndex, lastProjectIndex);

  const handleChange = (e) => {
    setProjectPerPage(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (orderType) {
      data.sort((a, b) => {
        const valueA = a[orderType];
        const valueB = b[orderType];
        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
  }, [orderType, sortOrder]);

  const handleSort = (criteria) => {
    if (criteria === orderType) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setOrderType(criteria);
      setSortOrder("asc");
    }
  };

  const handleClick = (projectId) => {
    setCurrentTab("project-details");
    setViewId(projectId);
  };

  return (
    <>
      <div className="Project-table">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("project_id")}>
                  Serial Number{" "}
                  {orderType === "project_id" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  onClick={() => {
                    handleSort("project_name");
                  }}
                >
                  Project Name{" "}
                  {orderType === "project_name" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  onClick={() => {
                    handleSort("Description");
                  }}
                >
                  Description{" "}
                  {orderType === "Description" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  onClick={() => {
                    handleSort("tasks_assigned");
                  }}
                >
                  Tasks Left{" "}
                  {orderType === "tasks_assigned" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  onClick={() => {
                    handleSort("start_date");
                  }}
                >
                  Project Created{" "}
                  {orderType === "start_date" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  onClick={() => {
                    handleSort("Deadline");
                  }}
                >
                  Deadline{" "}
                  {orderType === "Deadline" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Projects.map((dat) => (
                <tr key={dat.project_id}>
                  <td>{dat.project_id}</td>
                  <td>{dat.project_name}</td>
                  <td>{dat.Description}</td>
                  <td>{dat.tasks_assigned}</td>
                  <td>{dat.start_date}</td>
                  <td>{dat.Deadline}</td>
                  <td>{dat.status}</td>
                  <td>{dat.priority}</td>
                  <td>
                    <button onClick={() => handleClick(dat.project_id)}>
                      View
                    </button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="project-footer">
          <div className="project-buttons">
            <button
              className="prev"
              onClick={() =>
                setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
              }
            >
              Previous
            </button>
            <button
              className="next"
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage < Math.ceil(data.length / projectPerPage)
                    ? prevPage + 1
                    : prevPage
                )
              }
            >
              Next
            </button>
            <div className="page_num">
              <p>{`${currentPage}`}</p>
            </div>
          </div>
          <div className="projectPer-page">
            <p>Projects </p>
            <select
              value={projectPerPage}
              onChange={handleChange}
              name="projectNumbers"
              id="projectNumbers"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      {viewId && (
        <div className="ProjectPage-overlay ">
          <ProjectPage viewId={viewId} onClose={() => setViewId(null)} />
        </div>
      )}
    </>
  );
}
