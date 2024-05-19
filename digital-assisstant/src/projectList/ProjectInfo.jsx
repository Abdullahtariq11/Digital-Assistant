import React, { useEffect, useState, useCallback, useContext } from "react";
import "./ProjectInfo.css";
import ProjectPage from "./ProjectPage";
import AlertModal from "../Components/AlertModal";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { FaCheckCircle, FaHourglassHalf, FaPauseCircle, FaTimesCircle } from "react-icons/fa";
import AuthContext from "../AuthContext";

export default function ProjectInfo() {
  const{user}=useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage, setProjectPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [orderType, setOrderType] = useState(null);
  const [currentTab, setCurrentTab] = useState("project-list");
  const [viewId, setViewId] = useState(null);
  const [projectInfo, setProjectInfo] = useState([]);
  const [freshData, setFreshData] = useState(false);
  const [messageDelete, setDeleteMessage] = useState(null);
  const [message, setMessage] = useState({
    status: false,
    text: "",
  });
  const [loading, setLoading] = useState(true);

  const closeMessage = useCallback(() => {
    setDeleteMessage(null);
  }, []);

  const lastProjectIndex = currentPage * projectPerPage;
  const firstProjectIndex = lastProjectIndex - projectPerPage;
  const totalProjects = projectInfo.length;
  const totalPages = Math.ceil(totalProjects / projectPerPage);
  const Projects = projectInfo.slice(firstProjectIndex, lastProjectIndex);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  }, [totalPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  }, []);

  const handleChange = useCallback((e) => {
    setProjectPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5115/Project/GetbyId/${user.id}`);
      const responseData = await response.json();
      const data = responseData["$values"] || [];
      setProjectInfo(data);
      console.log(data)

      if (data.length <= 0) {
        setMessage({ status: true, text: "No project Found" });
      } else {
        setMessage({ status: false, text: "" });
      }
    } catch (error) {
      setMessage({ status: true, text: "Failed to fetch projects" });
    }
    setLoading(false);
    setFreshData(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, freshData]);

  const handleSort = (criteria) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setOrderType(criteria);

    const sortedData = [...projectInfo].sort((a, b) => {
      if (a[criteria] < b[criteria]) return newOrder === "asc" ? -1 : 1;
      if (a[criteria] > b[criteria]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setProjectInfo(sortedData);
  };

  const handleClick = (projectId) => {
    setCurrentTab("project-details");
    setViewId(parseInt(projectId, 10));
  };

  const handleDelete = useCallback(async (idReceived) => {
    try {
      const response = await fetch(
        `http://localhost:5115/Project/DeleteProjectbyId/${idReceived}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFreshData(true);
      setDeleteMessage(response.status === 200 ? "success" : "danger");
    } catch (error) {
      setDeleteMessage("danger");
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle color="green" />;
      case "In Progress":
        return <FaHourglassHalf color="orange" />;
      case "On Hold":
        return <FaPauseCircle color="blue" />;
      case "Not started":
        return <FaTimesCircle color="red" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="Project-table">
        <div className="table-container">
          {loading ? (
            <div className="spinner-container">
              <Spinner animation="border" role="status"></Spinner>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("project_id")}>
                    Serial Number{" "}
                    {orderType === "project_id" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("project_name")}>
                    Project Name{" "}
                    {orderType === "project_name" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("description")}>
                    Description{" "}
                    {orderType === "description" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("start_date")}>
                    Project Created{" "}
                    {orderType === "start_date" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("deadline")}>
                    Deadline{" "}
                    {orderType === "deadline" && (
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
                      <td>
                        {getStatusIcon(dat.status)} {dat.status}
                      </td>
                      <td>{dat.priority}</td>
                      <td>
                        <button onClick={() => handleClick(dat.id)}>
                          View
                        </button>
                        <button onClick={() => handleDelete(dat.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="project-footer">
          <div className="project-buttons">
            <button className="prev" onClick={handlePrevPage}>
              Previous
            </button>
            <button className="next" onClick={handleNextPage}>
              Next
            </button>
            <div className="page_num">
              <p>{`${currentPage}`}</p>
            </div>
          </div>
          <div className="projectPer-page">
            <p>Projects</p>
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
        <div className="ProjectPage-overlay">
          <ProjectPage
            viewId={viewId}
            onClose={() => setViewId(null)}
            setFreshData={setFreshData}
          />
        </div>
      )}
      {messageDelete && (
        <div className="overlay">
          <Alert
            key={messageDelete}
            variant={messageDelete}
            onClose={closeMessage}
            dismissible
          >
            {messageDelete === "success"
              ? "Project Deleted Successfully"
              : "Error occurred, not able to delete project"}
          </Alert>
        </div>
      )}
      {message.status && (
        <div className="overlaid">
          <AlertModal text={message.text} />
        </div>
      )}
    </>
  );
}
