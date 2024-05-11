import React, { useEffect, useState } from "react";
import "./Introductory.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "./Reminders.css";

export default function Introductory() {
  const [calval, setCalval] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [selectedDateProjects, setSelectedDateProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, [calval]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5115/Project/GetAll");
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

  return (
    <div className="dates-container">
      <h5>Select date to check project due:</h5>
      <div className="Introductory-container">
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(calval)}
              onChange={(date) => handleChange1(date.toDate())}
            />
          </LocalizationProvider>
        </div>
      </div>
      
        <div className="reminder-holder">
          <h5>Project Due on: {calval.toDateString()} </h5>
          <ul>
            {selectedDateProjects.map((dat, index) => (
              <li key={index}>
                <p>
                <span >{index+1}: </span> 
                  <span >Project Name: </span> 
                  {dat.name},
                  <span> Status: </span>
                 {dat.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
     
    </div>
  );
}
