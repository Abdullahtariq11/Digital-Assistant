import React, { useEffect, useState } from "react";
import "./ProjectInfo.css";
import ProjectPage from "./ProjectPage";
import AlertModal from "../Components/AlertModal";
import Alert from 'react-bootstrap/Alert';

export default function ProjectInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage, setProjectPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [orderType, setOrderType] = useState(null);
  const [currentTab, setCurrentTab] = useState("project-list");
  const [viewId, setViewId] = useState(null);
  const [projectInfo, setProjectInfo] = useState([]);
  const [freshData, setFreshData] = useState(false);
  const [messageDelete, setDleleteMessage] = useState(null);
  const [message, setMessage] = useState({
    status: false,
    text: "",
  });

  const closeMessage = () => {
    setDleleteMessage(null);
  };

  const lastProjectIndex = currentPage * projectPerPage;
  const firstProjectIndex = lastProjectIndex - projectPerPage;
  const totalProjects = projectInfo.length;
  const totalPages = Math.ceil(totalProjects / projectPerPage);
  const Projects = projectInfo.slice(firstProjectIndex, lastProjectIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleChange = (e) => {
    setProjectPerPage(e.target.value);
    setCurrentPage(1);
  };

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5115/Project/GetAll");
      const responseData = await response.json();
      // Extract the array of projects from the response
      const data = responseData["$values"] || [];
      setProjectInfo(data); // Ensure that `data` is an array

      if (data.length <= 0) {
        setMessage({ status: true, text: "No project Found" });
      } else {
        setMessage({ status: false, text: "" });
      }
    } catch (error) {
      setMessage({ status: true, text: "Failed to fetch projects" });
    }
    setFreshData(false);
  }
  useEffect(() => {
    fetchData();
  }, [freshData]);

  const handleSort = (criteria) => {};

  const handleClick = (projectId) => {
    console.log(projectId);
    let datId = parseInt(projectId);
    setCurrentTab("project-details");
    setViewId(datId);
  };

  const handleDelete = async (idRecieved) => {
    try {
      const response = await fetch(
        `http://localhost:5115/Project/DeleteProjectbyId/${idRecieved}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any required headers here, such as authentication token
          },
        }
      );
      setFreshData(true);
      if (response.status === 200) {
        setDleleteMessage("success")
    }
    } catch (error) {
     setDleleteMessage("danger")
    }
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
              {!message.status &&
                Projects.map((dat, index) => (
                  <tr key={dat.id}>
                    <td>{index + 1}</td>
                    <td>{dat.name}</td>
                    <td>{dat.description}</td>
                    <td>{dat.startDate}</td>
                    <td>{dat.endDate}</td>
                    <td>{dat.status}</td>
                    <td>{dat.priority}</td>
                    <td>
                      <button onClick={() => handleClick(dat.id)}>View</button>
                      <button onClick={() => handleDelete(dat.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            {message.status && <AlertModal text={message.text} />}
          </table>
        </div>

        <div className="project-footer">
          <div className="project-buttons">
            <button
              className="prev"
              onClick={handlePrevPage}>
              Previous
            </button>
            <button
              className="next"
              onClick={handleNextPage}>
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
          <ProjectPage
            viewId={viewId}
            onClose={() => setViewId(null)}
            setFreshData={setFreshData}
          />
        </div>
      )}
      {messageDelete &&
      <div className="overlay">
        {
          <Alert
            key={messageDelete}
            variant={messageDelete}
            onClose={closeMessage}
            dismissible
          >
            {messageDelete === "success"
              ? "Project Deleted Successfully"
              : "Error were found, not able to delete project"}
          </Alert>
        }
      </div>}
    </>
  );
}
