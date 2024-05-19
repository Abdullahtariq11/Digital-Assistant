import React, { useContext, useState } from "react";
import "./ProjectCreate.css";
import Alert from 'react-bootstrap/Alert';
import AuthContext from "../AuthContext";

export default function ProjectCreate() {
    const{user,refresh}=useContext(AuthContext);
    
    const [taskComponents, setTaskComponents] = useState([{ name: "", status: "Not started" }]);
    const [message, setMessage] = useState(null);
    const [projectInfo, setProjectInfo] = useState({
        name: "",
        description: "",
        status: "Not started",
        priority: "",
        startDate: "",
        endDate: "",
        userId: user.id,
        tasks: [{ name: "", status: "Not started" }]
    });

    const closeMessage = () => {
        setMessage(null);
    };

    const handleClick = (e) => {
        e.preventDefault();
        setTaskComponents([...taskComponents, { name: "", status: "Not started" }]);
        setProjectInfo({
            ...projectInfo,
            tasks: [...projectInfo.tasks, { name: "", status: "Not started" }]
        });
    };

    const handleTaskChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTasks = [...taskComponents];
        updatedTasks[index] = { ...updatedTasks[index], [name]: value };
        setTaskComponents(updatedTasks);

        const newTasks = [...projectInfo.tasks];
        newTasks[index] = { ...newTasks[index], [name]: value };
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
            console.log(responseData);
            setMessage("success");
            refresh();
        } catch (error) {
            console.error("Error creating data:", error);
            setMessage("danger");
        }
        setProjectInfo({
            name: "",
            description: "",
            priority: "",
            startDate: "",
            endDate: "",
            userId: 1,
            tasks: [{ name: "", status: "Not started" }]
        });
        setTaskComponents([{ name: "", status: "Not started" }]);
    }

    return (
        <div className="ProjectCreate-container">
            <form className="projectform-container">
                <div className="projectfield-container">
                    <h5>Create Project</h5>
                    <div className="project-fields">
                        <label htmlFor="name">Project Title:</label>
                        <input
                            value={projectInfo.name}
                            onChange={handleChange}
                            id="name"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className="project-fields">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            onChange={handleChange}
                            value={projectInfo.description}
                            name="description"
                            rows={6}
                            cols={20}
                        ></textarea>
                    </div>
                    <div className="project-fields">
                        <label htmlFor="priority">Priority:</label>
                        <select
                            onChange={handleChange}
                            name="priority"
                            id="priority"
                            value={projectInfo.priority}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="project-fields">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            onChange={handleChange}
                            value={projectInfo.startDate}
                            id="startDate"
                            name="startDate"
                            type="date"
                        />
                    </div>
                    <div className="project-fields">
                        <label htmlFor="endDate">Deadline</label>
                        <input
                            onChange={handleChange}
                            value={projectInfo.endDate}
                            id="endDate"
                            name="endDate"
                            type="date"
                        />
                    </div>
                    <h6>Tasks:</h6>
                    {taskComponents.map((task, index) => (
                        <div className="project-fields" key={index}>
                            <label htmlFor={`taskTitle${index}`}>{`Task: ${index + 1}`}</label>
                            <input
                                id={`taskTitle${index}`}
                                name="name"
                                type="text"
                                value={taskComponents[index].name}
                                onChange={(e) => handleTaskChange(e, index)}
                            />
                        </div>
                    ))}
                </div>
                <div className="project-fields project-button">
                    <button onClick={handleClick}>Add Task</button>
                    <button
                        onClick={() => {
                            setProjectInfo({
                                ...projectInfo,
                                tasks: [{ name: "", status: "Not started" }]
                            });
                            setTaskComponents([{ name: "", status: "Not started" }]);
                        }}
                    >Clear</button>
                </div>
                <button className="project-button" onClick={createData}>Submit</button>
            </form>
            {
                message &&
                <div className='overlay'>
                    <Alert key={message} variant={message} onClose={closeMessage} dismissible>
                        {message === "success" ? "Project Created Successfully" : "Error creating project"}
                    </Alert>
                </div>
            }
        </div>
    );
}
