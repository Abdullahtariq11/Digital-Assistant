import React, { useEffect, useState } from "react";
import "./ProjectCreate.css";
import Alert from 'react-bootstrap/Alert';

export default function ProjectCreate() {
    const [taskComponents, setTaskComponents] = useState([]);
    const [message, setMessage] = useState(null);
    const [projectInfo, setProjectInfo] = useState({
        name: "",
        description: "",
        status: "Not started",
        priority: "",
        startDate: "",
        endDate: "",
        priority: "",
        userId: 1,
        tasks: [{
            name:"",
            status: "Not started",
          }]
    });
    const closeMessage = () => {
        setMessage(null);
      };

    const handleClick = (e) => {
      e.preventDefault();
      const newTaskComponent = (
          <div className="project-fields" key={taskComponents.length}>
            <label htmlFor={`taskTitle${taskComponents.length}`}>
                {`Task: ${taskComponents.length + 1}`}
            </label>
              <input value={projectInfo.tasks[taskComponents.length]?.name || ""} id={`taskTitle${taskComponents.length}`} name={`taskTitle${taskComponents.length}`} type="text" onChange={(e) => handleTaskChange(e, taskComponents.length)} />
          </div>
      );
      setTaskComponents([...taskComponents, newTaskComponent]);
  };
  
  const handleTaskChange = (e, index) => {
    const newTasks = [...projectInfo.tasks];
    newTasks[index] = { ...newTasks[index], name: e.target.value }; // Update only the name property
    setProjectInfo({ ...projectInfo, tasks: newTasks });
};

  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectInfo({ ...projectInfo, [name]: value });
    };

    async function createData(e) {
      e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5115/Project/Create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectInfo),
            });
            const responseData = await response.json();
            // Handle the response data as needed

        } catch (error) {
            console.error("Error creating data:", error);
            setMessage("danger");
        }
        setProjectInfo({...projectInfo,
          name: "",
          description: "",
          priority: "",
          startDate: "",
          endDate: "",
          priority: "",
          tasks: [{
            name:"",
            status: "Not started",
          }]
      })


    }

    return (
        <div className="ProjectCreate-container">
            <form className="projectform-container" >
                <div className="projectfield-container">
                    <h5>Create Project</h5>
                    <div className="project-fields">
                        <label htmlFor="name">Project Title:</label>
                        <input value={projectInfo.name} onChange={handleChange} id="name" name="name" type="text" />
                    </div>
                    <div className="project-fields">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" onChange={handleChange} value={projectInfo.description} name="description" rows={6} cols={20}></textarea>
                    </div>
                    <div className="project-fields">
                        <label htmlFor="priority">Priority:</label>
                        <select onChange={handleChange} name="priority" id="priority">
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="project-fields">
                        <label htmlFor="startDate">Start Date</label>
                        <input onChange={handleChange} value={projectInfo.startDate} id="startDate" name="startDate" type="text" />
                    </div>
                    <div className="project-fields">
                        <label htmlFor="endDate">Deadline</label>
                        <input onChange={handleChange} value={projectInfo.endDate} id="endDate" name="endDate" type="text" />
                    </div>
                    <h6>Tasks:</h6>
                    {taskComponents.map((task, index) => (
                        <div key={index}>
                            {task}
                        </div>
                    ))}
                </div>

                <div className="project-fields project-button">
                    <button onClick={handleClick}>Add Task</button>
                    <button onClick={() => setTaskComponents([])}>Clear</button>
                </div>
                <button className="project-button" onClick={createData}>Submit</button>
            </form>
            {
                message &&
                <div className='overlay'>
                {(
                  <Alert key={message} variant={message} onClose={closeMessage} dismissible>
                    {message === "success" ? ("Project Created Successfully") : ("Error were found, not able to create project")}
                  </Alert>
                )}
              </div>
            }
        </div>
    );
}
