import React, { useEffect, useState } from "react";
import "./ProjectInfo.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import data from "../assets/MOCK_DATA.json";
import ProjectPage from "./ProjectPage";

export default function () {
  const [currentPage, setcurrentpage] = useState(1);
  const [projectPerPage, setProjectPerPage] = useState(5);
  const [sortOrder, setsortOrder] = useState("asc");
  const [orderType, setorderType] = useState(null);
  const [currentTab,setCurrentTab]=useState("project-list")
  const [viewId,setViewId]=useState()
  

  let lastProjectIndex = projectPerPage * currentPage;
  let firstprojectIndex = lastProjectIndex - projectPerPage;
  let Projects = data.slice(firstprojectIndex, lastProjectIndex);
  const handleChange = (e) => {
    setProjectPerPage(e.target.value);
    setcurrentpage(1);
  };



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

  const handleSort = (criteria) => {
    if (criteria == orderType) {
      return setsortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setorderType(criteria);
      return setsortOrder("asc");
    }
  };

  const handleClick=(e)=>{
    setCurrentTab("df");
    setViewId(e.target.value);
  }

  return (
<> 
{
  currentTab === "project-list" ? 
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
              <th>
                Status
              </th>
              <th>priority</th>
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
                  <button value={dat.project_id} onClick={(e)=>handleClick(e)}>View</button>
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
            onClick={() => {
              currentPage > 1
                ? setcurrentpage(currentPage - 1)
                : setcurrentpage(currentPage);
            }}
          >
            previous
          </button>
          <button
            className="next"
            onClick={() => {
              currentPage < Math.abs(data.length / projectPerPage)
                ? setcurrentpage(currentPage + 1)
                : setcurrentpage(currentPage);
            }}
          >
            next
          </button>
          <div className="page_num">
            <p>{`${currentPage}`}</p>
          </div>
        </div>
        <div className="projectPer-page">
          <p>projects </p>
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
    :
    <div>

      <ProjectPage viewId={viewId} setCurrentTab={setCurrentTab}/>
    </div>
} 
</>

    
  );
}
