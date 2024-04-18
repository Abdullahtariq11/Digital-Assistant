import React, { useEffect, useState } from "react";
import "./Introductory.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "./Reminders.css";
import data from "../assets/MOCK_DATA.json";

export default function Introductory() {
  const [calval, setCalval] = useState(new Date());

  const dateString = calval.toString();

  // Split the date string into its components
  const parts = dateString.split(" ");

  // Extract the relevant date components
  const day = parts[2];
  const month = parts[1];
  const year = parts[3];

  // Format the date into "MM/DD/YYYY" format
  const compareDate = `${monthToNumber(month)}/${day}/${year}`;

  // Helper function to convert month abbreviation to number
  function monthToNumber(month) {
    const monthsMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return monthsMap[month];
  }

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    filterData();
  }, [calval]);

  const filterData = () => {
    setProjects(data.filter((dat) => dat.Deadline == compareDate));
  };

  const handleChange = (e) => {
    const selectedFilter = e.target.value;

    filterData(selectedFilter);
  };
  const handleChange1 = (date) => {
    setCalval(date); // Update calval with the selected date object
  };

  return (
    <div className="dates-container">
      <h5>Select date to check project due:</h5>
      <div className="Introductory-container">
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(calval)} // Convert calval to a dayjs object before passing it to DateCalendar
              onChange={(date) => {
                handleChange1(date.toDate());
              }} // Convert the selected date back to a Date object
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="reminder-container">
        <div className="reminder-holder">
          <h5>Project Due on: {calval.toDateString()} </h5>
          <ul>
            {projects.map((dat) => (
              <li>
                <p>
                  Project Name: {dat.project_name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
