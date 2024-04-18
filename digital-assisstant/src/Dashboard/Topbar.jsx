import React, { useState } from "react";
import "./Topbar.css";
import Button from "react-bootstrap/Button";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import data from "../assets/MOCK_DATA.json";

export default function Topbar() {
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    setSearchResult([]);
    setSearchVal(e.target.value);

    const filteredData = data.filter((item) =>
      item.project_name.toLowerCase().includes(searchVal.toLowerCase())
    )
    
      setSearchResult(filteredData);

  };
  const searchProj = () => {};

  return (
    <div className="top-bar">
      <div className="sideHeading">
        <h1 className="pacifico-regular side-heading">FocusCraft</h1>
      </div>
      <div className="message">
        <h2>Welcome, Abdullah!</h2>
        <p>Here is your Agenda For Today</p>
      </div>
      <div className="search-container">
        <TextField
          value={searchVal}
          onChange={handleSearch}
          className="search-button"
          variant="outlined"
          placeholder="Search Project"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={searchProj} style={{ color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            style: { color: "white", border: "1px solid #ccc" },
          }}
        />
        <ul>
          {searchVal && searchResult.length > 0 && (
            <div className="search-dropdown">
              {searchResult.map((item) => (
                <div key={item.id} className="search-result">
                  {item.project_name}
                </div>
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
