import React, { useState,useEffect, useContext } from "react";
import "./Topbar.css";
import Button from "react-bootstrap/Button";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProjectPage from "../projectList/ProjectPage";
import AuthContext from "../AuthContext";

export default function Topbar() {
  const{user}=useContext(AuthContext);
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);
  const [freshData, setFreshData] = useState(false);
  const [viewId,setViewId]=useState();

  const handleSearch = (e) => {
    
    setSearchResult([]);
    setSearchVal(e.target.value);

    const filteredData = projectInfo.filter((item) =>
      item.name.toLowerCase().includes(searchVal.toLowerCase())
    );

    setSearchResult(filteredData);
  };
  const searchProj = (idSend,projectId) => {
    setSearchResult([]);
    setSearchVal("");
    setViewId(projectId);
  };

  

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:5115/Project/GetbyId/${user.$id}`);
      const responseData = await response.json();
      // Extract the array of projects from the response
      const data = responseData["$values"] || [];
      setProjectInfo(data); // Ensure that `data` is an array

  
    } catch (error) {
      
    }
    setFreshData(false);
  }
  useEffect(() => {
    fetchData();
  }, [freshData]);

  return (
    <div className="top-bar">
      <div className="sideHeading">
        <h1 className="pacifico-regular side-heading">FocusCraft</h1>
      </div>
      <div className="message">
        <h2>Welcome, {user.name}!</h2>
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
  
              </InputAdornment>
            ),
            style: { color: "white", border: "1px solid #ccc" },
          }}
        />
        <ul>
          {searchVal && searchResult.length > 0 && (
            <div className="search-dropdown">
              {searchResult.map((item,index) => (
                <div key={index}  onClick={()=>searchProj(item.$id,item.id)} className="search-result">
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </ul>
      </div>
      {viewId && 
    <div className="ProjectPage-overlay ">
      <ProjectPage viewId={viewId}  onClose={() => setViewId(null)} setFreshData={setFreshData}/>
      
    </div>}
    </div>
  );
}
