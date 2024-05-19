import React, { useContext, useEffect, useState } from "react";
import "./Introductory.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { FaCheckCircle, FaHourglassHalf, FaPauseCircle, FaTimesCircle } from "react-icons/fa";
import AuthContext from "../AuthContext";

export default function Introductory() {
  const{user}=useContext(AuthContext);
  const [calval, setCalval] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [selectedDateProjects, setSelectedDateProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, [calval]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5115/Project/GetbyId/${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      const datares = responseData["$values"] || [];
      setProjects(datares);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    filterData();
  }, [projects, calval]);

  const filterData = () => {
    const dateString = calval.toISOString().split("T")[0];
    const filteredProjects = projects.filter((dat) => dat.endDate === dateString);
    setSelectedDateProjects(filteredProjects);
  };

  const handleChange1 = (date) => {
    setCalval(date);
  };

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
    <div className="dates-container">
      <h2>Keep Track of Dates</h2>
      <p>Select a date to check project due dates:</p>
      <div className="Introductory-container">
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(calval)}
              onChange={(date) => handleChange1(date.toDate())}
            />
          </LocalizationProvider>
        </div>
        <div className="reminder-holder">
          <h5>Projects Due on: {calval.toDateString()} </h5>
          <ul>
            {selectedDateProjects.map((dat, index) => (
              <li key={index}>
                <p>
                  {getStatusIcon(dat.status)} <span className="project-name">{dat.name}</span> - <span className="project-status">{dat.status}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
