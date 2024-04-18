import React, { useState } from "react";
import "./ProjectCreate.css";

export default function ProjectCreate() {
    const[taskComponents,setTaskComponents]=useState([]);
    const handleClick=(e)=>{
       e.preventDefault();
        let taskComp=(<div className="project-fields" key={taskComponents.length}> 
            <label htmlFor={`taskTitle${taskComponents.length}`}>{`Task: ${taskComponents.length+1}`}</label>
            <input id={`taskTitle${taskComponents.length}`} name={`taskTitle${taskComponents.length}`} type="text" />
          </div>)
        setTaskComponents([...taskComponents,taskComp])
        }

  return (
    <div className="ProjectCreate-container">
      <form className="projectform-container">
       <div className="projectfield-container">
       <h5>Create Project</h5>
        <div className="project-fields">
          <label htmlFor="title">Project Title:</label>
          <input id="title" name="title" type="text" />
        </div>
        <div className="project-fields">
          <label htmlFor="Description">Description:</label>
          <textarea id="Description" name="Description" rows={4} cols={30}></textarea>
        </div>
        <div className="project-fields">
            <label htmlFor="priority">Priority:</label>
            <select name="priority" id="priority"> 
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div >
        <div className="project-fields">
          <label htmlFor="deadline">Deadline</label>
          <input id="deadline" name="deadline" type="date" />
        </div>
          <h6>Tasks:</h6>
          {taskComponents.map((tasks,index)=>(
            <div key={index}>
              {tasks}
            </div>
          ))}
       </div>
        
        <div className="project-fields project-button">
          <button  onClick={(e)=>handleClick(e)}>Add Tasks</button>
          <button  onClick={()=>{setTaskComponents([])}}>clear</button>
        </div>
        <button className="project-button" onSubmit={""}>Submit</button>
      </form>
    </div>
  );
}
